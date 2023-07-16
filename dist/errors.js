"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageNotSupportedForAttributesError = exports.LowConfidenceError = exports.PerspectiveAnalyzerError = exports.MissingParameterError = exports.LanguageNotSupportedError = exports.ToxicityAnalyzerError = void 0;
class ToxicityAnalyzerError extends Error {
    constructor(message) {
        super(message);
        this.name = "ToxicityAnalyzerError";
    }
}
exports.ToxicityAnalyzerError = ToxicityAnalyzerError;
class LanguageNotSupportedError extends ToxicityAnalyzerError {
    constructor(language) {
        super(`The language "${language}" is not supported. Please use one of the following languages: ar, zh, cs, nl, en, fr, de, hi, hi-Latn, id, it, ja, ko, pl, pt, ru, es, sv.`);
        this.name = "LanguageNotSupportedError";
    }
}
exports.LanguageNotSupportedError = LanguageNotSupportedError;
class MissingParameterError extends ToxicityAnalyzerError {
    constructor(parameter) {
        super(`The parameter "${parameter}" is missing.`);
        this.name = "MissingParameterError";
    }
}
exports.MissingParameterError = MissingParameterError;
class PerspectiveAnalyzerError extends Error {
    constructor(message) {
        super(message);
        this.name = "PerspectiveAnalyzerError";
    }
}
exports.PerspectiveAnalyzerError = PerspectiveAnalyzerError;
class LowConfidenceError extends ToxicityAnalyzerError {
    constructor(message) {
        super(message);
        this.name = "LowConfidenceError";
    }
}
exports.LowConfidenceError = LowConfidenceError;
class LanguageNotSupportedForAttributesError extends ToxicityAnalyzerError {
    constructor(message) {
        super(message);
        this.name = "LanguageNotSupportedForAttributesError";
    }
}
exports.LanguageNotSupportedForAttributesError = LanguageNotSupportedForAttributesError;
