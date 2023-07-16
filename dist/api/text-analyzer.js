"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeText = void 0;
const googleapis_1 = require("googleapis");
const axios_1 = require("axios");
const errors_1 = require("../errors");
const DISCOVERY_URL = "https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1";
async function detectLanguage(text) {
    const options = {
        method: "POST",
        url: "https://microsoft-text-analytics1.p.rapidapi.com/languages",
        headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key": "5838242b02msh0816449f0b97f40p180163jsn43e54151ddb5",
            "X-RapidAPI-Host": "microsoft-text-analytics1.p.rapidapi.com",
        },
        data: {
            documents: [
                {
                    id: "1",
                    text: text,
                },
            ],
        },
    };
    const response = await axios_1.default.request(options);
    const errors = response.data?.errors;
    if (errors && errors.length > 0) {
        const error = errors[0].error;
        throw new errors_1.LanguageNotSupportedError(`${error.code}: ${error.message}`);
    }
    const doc = response.data.documents[0];
    let detectedLang = doc.detectedLanguage.iso6391Name;
    const confidence = doc.detectedLanguage.confidenceScore;
    if (confidence < 0.51) {
        throw new errors_1.LowConfidenceError("[TOXICITY ANALYZER WARNING] Language detection confidence score is below the threshold.");
    }
    return detectedLang;
}
async function analyzeText(analyzeOptions) {
    const { apiKey, text, attributeThresholds, autoLanguage } = analyzeOptions;
    const languages = analyzeOptions.languages || ["en"];
    if (!apiKey) {
        throw new errors_1.MissingParameterError("API Key");
    }
    if (!text) {
        throw new errors_1.MissingParameterError("Text");
    }
    if (!attributeThresholds) {
        throw new errors_1.MissingParameterError("Attribute Thresholds");
    }
    if (autoLanguage) {
        console.warn("[TOXICITY ANALYZER WARNING] This feature is experimental!");
    }
    let detectedLang = null;
    if (!autoLanguage) {
        // If autoLanguage is false, use the first language in the list as the detected language
        detectedLang = languages[0];
    }
    else {
        try {
            detectedLang = await detectLanguage(text);
        }
        catch (error) {
            console.error("[TOXICITY ANALYZER ERROR] Language detection failed:", error);
            console.warn("[TOXICITY ANALYZER WARNING] Defaulting to English.");
            detectedLang = "en";
        }
    }
    if (detectedLang &&
        !languages.includes(detectedLang)) {
        languages.push(detectedLang);
    }
    const availableLanguages = [
        "ar",
        "zh",
        "cs",
        "nl",
        "en",
        "fr",
        "de",
        "hi",
        "hi-Latn",
        "id",
        "it",
        "ja",
        "ko",
        "pl",
        "pt",
        "ru",
        "es",
        "sv",
    ];
    const unsupportedLanguages = languages.filter((lang) => !availableLanguages.includes(lang));
    if (unsupportedLanguages.length > 0) {
        throw new errors_1.LanguageNotSupportedError(unsupportedLanguages.join(", "));
    }
    const hasRestrictedAttributes = Object.keys(attributeThresholds).some((attribute) => [
        "SEXUALLY_EXPLICIT",
        "FLIRTATION",
        "SPAM",
        "ATTACK_ON_AUTHOR",
        "ATTACK_ON_COMMENTER",
        "INCOHERENT",
        "INFLAMMATORY",
        "OBSCENE",
        "UNSUBSTANTIAL",
    ].includes(attribute));
    if (hasRestrictedAttributes && !languages.every((lang) => lang === "en")) {
        throw new errors_1.LanguageNotSupportedForAttributesError('When using attributes such as "SEXUALLY_EXPLICIT", "FLIRTATION", "SPAM", "ATTACK_ON_AUTHOR", "ATTACK_ON_COMMENTER", "INCOHERENT", "INFLAMMATORY", "OBSCENE", or "UNSUBSTANTIAL", the language must be "en" (English).');
    }
    const client = googleapis_1.google.discoverAPI(DISCOVERY_URL);
    const requestedAttributes = {};
    for (const key in attributeThresholds) {
        requestedAttributes[key] = {};
    }
    const analyzeRequest = {
        comment: { text },
        languages,
        requestedAttributes,
    };
    try {
        const res = await googleapis_1.google.comments.analyze({
            key: apiKey,
            resource: analyzeRequest,
        });
        const data = {
            languages: languages,
            attributes: {},
        };
        for (const [key, attribute] of Object.entries(res.data.attributeScores)) {
            const score = attribute.summaryScore?.value ?? 0;
            const threshold = attributeThresholds[key] ?? 0;
            const isToxic = score > threshold;
            data.attributes[key] = {
                score,
                threshold,
                isToxic,
            };
        }
        return data;
    }
    catch (error) {
        throw new errors_1.PerspectiveAnalyzerError("[TOXICITY ANALYZER ERROR] An error occurred while analyzing the text.");
    }
}
exports.analyzeText = analyzeText;
