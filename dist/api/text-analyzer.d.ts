export interface AnalyzeCommentRequestBody {
    comment: {
        text: string;
    };
    requestedAttributes: {
        [attribute: string]: {};
    };
    languages: string[];
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
export declare enum SupportedLanguage {
    Arabic = "ar",
    Chinese = "zh",
    Czech = "cs",
    Dutch = "nl",
    English = "en",
    French = "fr",
    German = "de",
    Hindi = "hi",
    HindiLatin = "hi-Latn",
    Indonesian = "id",
    Italian = "it",
    Japanese = "ja",
    Korean = "ko",
    Polish = "pl",
    Portuguese = "pt",
    Russian = "ru",
    Spanish = "es",
    Swedish = "sv"
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
export declare class PerspectiveClient {
    private readonly perspectiveKey;
    private readonly rapidApiKey;
    private readonly apiUrl;
    constructor(perspectiveApiKey: string, rapidApiKey?: string | null);
    private fetchAPI;
    private createRequestBody;
    analyzeComment(options: AnalyzeCommentOptions): Promise<AnalyzeCommentResponse>;
    detectLanguage(comment: string): Promise<DetectLanguageResponse>;
}
