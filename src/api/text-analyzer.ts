import {
  MissingParameterError,
  LanguageNotSupportedError,
  LowConfidenceError,
  LanguageNotSupportedForAttributesError,
  PerspectiveAnalyzerError,
  ToxicityAnalyzerError
} from "../errors";

export interface AnalyzeCommentRequestBody {
  comment: { text: string };
  requestedAttributes: {
    [attribute: string]: {};
  };
  languages: string[]
}

export interface SpanScore {
  begin: number;
  end: number;
  score: {
    value: number;
    type: string;
  };
}

export interface AttributeScore {
  spanScores: SpanScore[];
  summaryScore: {
    value: number;
    type: string;
  };
}

export interface AnalyzeCommentResponse {
  attributeScores: {
    TOXICITY?: AttributeScore;
    IDENTITY_ATTACK?: AttributeScore;
    PROFANITY?: AttributeScore;
    INSULT?: AttributeScore;
    SEVERE_TOXICITY?: AttributeScore;
    THREAT?: AttributeScore;
  };
  languages: string[];
  detectedLanguages: string[];
}

export enum SupportedLanguage {
  Arabic = 'ar',
  Chinese = 'zh',
  Czech = 'cs',
  Dutch = 'nl',
  English = 'en',
  French = 'fr',
  German = 'de',
  Hindi = 'hi',
  HindiLatin = 'hi-Latn',
  Indonesian = 'id',
  Italian = 'it',
  Japanese = 'ja',
  Korean = 'ko',
  Polish = 'pl',
  Portuguese = 'pt',
  Russian = 'ru',
  Spanish = 'es',
  Swedish = 'sv',
}

export interface DetectLanguageResponse {
  name: string;
  iso6391Name: string;
  confidenceScore: number;
}

export interface AnalyzeCommentOptions {
  comment: string;
  language: SupportedLanguage | string;
  autoLanguage?: boolean;
}

export class PerspectiveClient {
  private readonly perspectiveKey: string;
  private readonly rapidApiKey: string | null;
  private readonly apiUrl: string;

  public constructor(perspectiveApiKey: string, rapidApiKey?: string | null) {
    this.perspectiveKey = perspectiveApiKey;
    this.rapidApiKey = rapidApiKey || null;

    if (!this.perspectiveKey) throw new MissingParameterError("Perspective API Key")
    if (!this.rapidApiKey) console.warn('[Perspective Client] Warning, not providing a rapid API key will prevent you from using the detect language command.')
    this.apiUrl = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${this.perspectiveKey}`;
  }

  private async fetchAPI<TRequest, TResponse>(url: string, requestBody: TRequest): Promise<TResponse> {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    if (data.error) {
      throw new Error(`[${data.error.status}] ${data.error.message}`);
    }
    return data as TResponse;
  }

  private createRequestBody(options: AnalyzeCommentOptions): AnalyzeCommentRequestBody {
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

  async analyzeComment(options: AnalyzeCommentOptions): Promise<AnalyzeCommentResponse> {
    const { comment, language, autoLanguage } = options;
    if (!comment) throw new MissingParameterError('Comment')
    if (!language) throw new MissingParameterError('Language')

    let lang = language;
    // TODO: We need to allow the user to specify what attributes to receive
    // We need to validate if the attributes support the language
    // if (autoLanguage) lang = (await this.detectLanguage(comment)).name
    if (autoLanguage) console.log('[Auto Language] This is still being developed, keep a look out for the next beta version')

    const requestBody = this.createRequestBody({ autoLanguage, comment, language: lang, });
    const data = await this.fetchAPI<AnalyzeCommentRequestBody, AnalyzeCommentResponse>(this.apiUrl, requestBody);
    return data;
  }

  async detectLanguage(comment: string): Promise<DetectLanguageResponse> {
    if (!this.rapidApiKey) throw new MissingParameterError("Rapid API Key")
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
      throw new LanguageNotSupportedError(`${error.code}: ${error.message}`);
    }

    const doc = responseData.documents[0];
    let iso6391Name: string = doc.detectedLanguage.iso6391Name;
    const confidenceScore: number = doc.detectedLanguage.confidenceScore;
    const name: string = doc.detectedLanguage.name;

    if (confidenceScore < 0.51) {
      throw new LowConfidenceError(
        "[TOXICITY ANALYZER WARNING] Language detection confidence score is below the threshold."
      );
    }

    return {
      name,
      iso6391Name,
      confidenceScore
    };
  }
}
