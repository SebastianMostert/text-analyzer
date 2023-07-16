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
    languages?: ("ar" | "zh" | "cs" | "nl" | "en" | "fr" | "de" | "hi" | "hi-Latn" | "id" | "it" | "ja" | "ko" | "pl" | "pt" | "ru" | "es" | "sv")[];
}
declare function analyzeText(analyzeOptions: PerspectiveOptions): Promise<PerspectiveResponse>;
export { analyzeText };
