import { google } from "googleapis";
import axios, { AxiosRequestConfig } from "axios";
import {
  ToxicityAnalyzerError,
  LanguageNotSupportedError,
  MissingParameterError,
  PerspectiveAnalyzerError,
  LowConfidenceError,
  LanguageNotSupportedForAttributesError,
} from "../errors";

interface PerspectiveResponse {
  languages: string[];
  attributes: {
    [key: string]: {
      score: number;
      threshold: number;
      isToxic: boolean;
    };
  };
}

interface PerspectiveAttributeThresholds {
  TOXICITY?: number;
  SEVERE_TOXICITY?: number;
  IDENTITY_ATTACK?: number;
  INSULT?: number;
  PROFANITY?: number;
  THREAT?: number;
  SEXUALLY_EXPLICIT?: number;
  FLIRTATION?: number;
  SPAM?: number;
  ATTACK_ON_AUTHOR?: number;
  ATTACK_ON_COMMENTER?: number;
  INCOHERENT?: number;
  INFLAMMATORY?: number;
  OBSCENE?: number;
  UNSUBSTANTIAL?: number;
}

interface PerspectiveOptions {
  apiKey: string;
  text: string;
  attributeThresholds: PerspectiveAttributeThresholds;
  autoLanguage?: boolean;
  languages?: (
    | "ar"
    | "zh"
    | "cs"
    | "nl"
    | "en"
    | "fr"
    | "de"
    | "hi"
    | "hi-Latn"
    | "id"
    | "it"
    | "ja"
    | "ko"
    | "pl"
    | "pt"
    | "ru"
    | "es"
    | "sv"
  )[];
}

const DISCOVERY_URL =
  "https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1";

async function detectLanguage(text: string): Promise<string> {
  const options: AxiosRequestConfig = {
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

  const response = await axios.request(options);
  const errors = response.data?.errors;
  if (errors && errors.length > 0) {
    const error = errors[0].error;
    throw new LanguageNotSupportedError(`${error.code}: ${error.message}`);
  }

  const doc = response.data.documents[0];
  let detectedLang = doc.detectedLanguage.iso6391Name;
  const confidence = doc.detectedLanguage.confidenceScore;

  if (confidence < 0.51) {
    throw new LowConfidenceError(
      "[TOXICITY ANALYZER WARNING] Language detection confidence score is below the threshold."
    );
  }

  return detectedLang;
}

async function analyzeText(
  analyzeOptions: PerspectiveOptions
): Promise<PerspectiveResponse> {
  const { apiKey, text, attributeThresholds, autoLanguage } = analyzeOptions;
  const languages = analyzeOptions.languages || ["en"];

  if (!apiKey) {
    throw new MissingParameterError("API Key");
  }

  if (!text) {
    throw new MissingParameterError("Text");
  }

  if (!attributeThresholds) {
    throw new MissingParameterError("Attribute Thresholds");
  }

  if (autoLanguage) {
    console.warn("[TOXICITY ANALYZER WARNING] This feature is experimental!");
  }

  let detectedLang: string | null = null;

  if (!autoLanguage) {
    // If autoLanguage is false, use the first language in the list as the detected language
    detectedLang = languages[0];
  } else {
    try {
      detectedLang = await detectLanguage(text);
    } catch (error) {
      console.error(
        "[TOXICITY ANALYZER ERROR] Language detection failed:",
        error
      );
      console.warn("[TOXICITY ANALYZER WARNING] Defaulting to English.");
      detectedLang = "en";
    }
  }

  if (
    detectedLang &&
    !(languages as (typeof languages)[number][]).includes(
      detectedLang as (typeof languages)[number]
    )
  ) {
    languages.push(detectedLang as (typeof languages)[number]);
  }

  const availableLanguages: readonly string[] = [
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

  const unsupportedLanguages = languages.filter(
    (lang) => !availableLanguages.includes(lang)
  );
  if (unsupportedLanguages.length > 0) {
    throw new LanguageNotSupportedError(unsupportedLanguages.join(", "));
  }

  const hasRestrictedAttributes = Object.keys(attributeThresholds).some(
    (attribute) =>
      [
        "SEXUALLY_EXPLICIT",
        "FLIRTATION",
        "SPAM",
        "ATTACK_ON_AUTHOR",
        "ATTACK_ON_COMMENTER",
        "INCOHERENT",
        "INFLAMMATORY",
        "OBSCENE",
        "UNSUBSTANTIAL",
      ].includes(attribute as string)
  );

  if (hasRestrictedAttributes && !languages.every((lang) => lang === "en")) {
    throw new LanguageNotSupportedForAttributesError(
      'When using attributes such as "SEXUALLY_EXPLICIT", "FLIRTATION", "SPAM", "ATTACK_ON_AUTHOR", "ATTACK_ON_COMMENTER", "INCOHERENT", "INFLAMMATORY", "OBSCENE", or "UNSUBSTANTIAL", the language must be "en" (English).'
    );
  }

  const client = google.discoverAPI(DISCOVERY_URL);

  const requestedAttributes: Record<string, {}> = {};
  for (const key in attributeThresholds) {
    requestedAttributes[key] = {};
  }

  const analyzeRequest = {
    comment: { text },
    languages,
    requestedAttributes,
  };

  try {
    const res: any = await google.comments.analyze({
      key: apiKey,
      resource: analyzeRequest,
    });

    const data: PerspectiveResponse = {
      languages: languages,
      attributes: {} as any,
    };
    for (const [key, attribute] of Object.entries(
      res.data.attributeScores as Record<
        string,
        { summaryScore: { value: number } }
      >
    )) {
      const score = attribute.summaryScore?.value ?? 0;
      const threshold =
        attributeThresholds[key as keyof typeof attributeThresholds] ?? 0;
      const isToxic = score > threshold;

      (
        data.attributes as Record<
          string,
          { score: number; threshold: number; isToxic: boolean } | undefined
        >
      )[key] = {
        score,
        threshold,
        isToxic,
      };
    }

    return data;
  } catch (error) {
    throw new PerspectiveAnalyzerError(
      "[TOXICITY ANALYZER ERROR] An error occurred while analyzing the text."
    );
  }
}

export { analyzeText };
