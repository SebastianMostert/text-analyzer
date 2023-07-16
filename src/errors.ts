class ToxicityAnalyzerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ToxicityAnalyzerError";
  }
}

class LanguageNotSupportedError extends ToxicityAnalyzerError {
  constructor(language: string) {
    super(
      `The language "${language}" is not supported. Please use one of the following languages: ar, zh, cs, nl, en, fr, de, hi, hi-Latn, id, it, ja, ko, pl, pt, ru, es, sv.`
    );
    this.name = "LanguageNotSupportedError";
  }
}

class MissingParameterError extends ToxicityAnalyzerError {
  constructor(parameter: string) {
    super(`The parameter "${parameter}" is missing.`);
    this.name = "MissingParameterError";
  }
}

class PerspectiveAnalyzerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PerspectiveAnalyzerError";
  }
}

class LowConfidenceError extends ToxicityAnalyzerError {
  constructor(message: string) {
    super(message);
    this.name = "LowConfidenceError";
  }
}

class LanguageNotSupportedForAttributesError extends ToxicityAnalyzerError {
  constructor(message: string) {
    super(message);
    this.name = "LanguageNotSupportedForAttributesError";
  }
}

export {
  ToxicityAnalyzerError,
  LanguageNotSupportedError,
  MissingParameterError,
  PerspectiveAnalyzerError,
  LowConfidenceError,
  LanguageNotSupportedForAttributesError,
};
