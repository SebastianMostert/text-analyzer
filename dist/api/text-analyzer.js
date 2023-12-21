"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerspectiveClient = exports.SupportedLanguage = void 0;
const errors_1 = require("../errors");
var SupportedLanguage;
(function (SupportedLanguage) {
    SupportedLanguage["Arabic"] = "ar";
    SupportedLanguage["Chinese"] = "zh";
    SupportedLanguage["Czech"] = "cs";
    SupportedLanguage["Dutch"] = "nl";
    SupportedLanguage["English"] = "en";
    SupportedLanguage["French"] = "fr";
    SupportedLanguage["German"] = "de";
    SupportedLanguage["Hindi"] = "hi";
    SupportedLanguage["HindiLatin"] = "hi-Latn";
    SupportedLanguage["Indonesian"] = "id";
    SupportedLanguage["Italian"] = "it";
    SupportedLanguage["Japanese"] = "ja";
    SupportedLanguage["Korean"] = "ko";
    SupportedLanguage["Polish"] = "pl";
    SupportedLanguage["Portuguese"] = "pt";
    SupportedLanguage["Russian"] = "ru";
    SupportedLanguage["Spanish"] = "es";
    SupportedLanguage["Swedish"] = "sv";
})(SupportedLanguage || (exports.SupportedLanguage = SupportedLanguage = {}));
class PerspectiveClient {
    constructor(perspectiveApiKey, rapidApiKey) {
        this.perspectiveKey = perspectiveApiKey;
        this.rapidApiKey = rapidApiKey || null;
        if (!this.perspectiveKey)
            throw new errors_1.MissingParameterError("Perspective API Key");
        if (!this.rapidApiKey)
            console.warn('[Perspective Client] Warning, not providing a rapid API key will prevent you from using the detect language command.');
        this.apiUrl = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${this.perspectiveKey}`;
    }
    async fetchAPI(url, requestBody) {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        });
        const data = await response.json();
        if (data.error) {
            throw new Error(`[${data.error.status}] ${data.error.message}`);
        }
        return data;
    }
    createRequestBody(options) {
        const { comment, language } = options;
        return {
            comment: { text: comment },
            requestedAttributes: {
                TOXICITY: {},
                SEVERE_TOXICITY: {},
                IDENTITY_ATTACK: {},
                INSULT: {},
                PROFANITY: {},
                THREAT: {},
            },
            languages: [language]
        };
    }
    async analyzeComment(options) {
        const { comment, language, autoLanguage } = options;
        if (!comment)
            throw new errors_1.MissingParameterError('Comment');
        if (!language)
            throw new errors_1.MissingParameterError('Language');
        let lang = language;
        // TODO: We need to allow the user to specify what attributes to receive
        // We need to validate if the attributes support the language
        // if (autoLanguage) lang = (await this.detectLanguage(comment)).name
        if (autoLanguage)
            console.log('[Auto Language] This is still being developed, keep a look out for the next beta version');
        const requestBody = this.createRequestBody({ autoLanguage, comment, language: lang, });
        const data = await this.fetchAPI(this.apiUrl, requestBody);
        return data;
    }
    async detectLanguage(comment) {
        if (!this.rapidApiKey)
            throw new errors_1.MissingParameterError("Rapid API Key");
        const url = "https://microsoft-text-analytics1.p.rapidapi.com/languages";
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-RapidAPI-Key": this.rapidApiKey,
                "X-RapidAPI-Host": "microsoft-text-analytics1.p.rapidapi.com",
            },
            body: JSON.stringify({
                documents: [
                    {
                        id: "1",
                        text: comment,
                    },
                ],
            }),
        };
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        const errors = responseData.errors;
        if (errors && errors.length > 0) {
            const error = errors[0].error;
            throw new errors_1.LanguageNotSupportedError(`${error.code}: ${error.message}`);
        }
        const doc = responseData.documents[0];
        let iso6391Name = doc.detectedLanguage.iso6391Name;
        const confidenceScore = doc.detectedLanguage.confidenceScore;
        const name = doc.detectedLanguage.name;
        if (confidenceScore < 0.51) {
            throw new errors_1.LowConfidenceError("[TOXICITY ANALYZER WARNING] Language detection confidence score is below the threshold.");
        }
        return {
            name,
            iso6391Name,
            confidenceScore
        };
    }
}
exports.PerspectiveClient = PerspectiveClient;
