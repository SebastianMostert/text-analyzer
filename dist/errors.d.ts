declare class ToxicityAnalyzerError extends Error {
    constructor(message: string);
}
declare class LanguageNotSupportedError extends ToxicityAnalyzerError {
    constructor(language: string);
}
declare class MissingParameterError extends ToxicityAnalyzerError {
    constructor(parameter: string);
}
declare class PerspectiveAnalyzerError extends Error {
    constructor(message: string);
}
declare class LowConfidenceError extends ToxicityAnalyzerError {
    constructor(message: string);
}
declare class LanguageNotSupportedForAttributesError extends ToxicityAnalyzerError {
    constructor(message: string);
}
export { ToxicityAnalyzerError, LanguageNotSupportedError, MissingParameterError, PerspectiveAnalyzerError, LowConfidenceError, LanguageNotSupportedForAttributesError, };
