import {
  PerspectiveClient,
  AnalyzeCommentRequestBody,
  AnalyzeCommentResponse,
  AttributeScore,
  SpanScore,
  analyzeImage,
  ImageAnalyzerOptions,
  ImageAnalyzerPredictions,
  ImageAnalyzerResponse
} from "./api";
import { SupportedLanguage } from "./api/text-analyzer";

import {
  LanguageNotSupportedError,
  LanguageNotSupportedForAttributesError,
  LowConfidenceError,
  MissingParameterError,
  PerspectiveAnalyzerError,
  ToxicityAnalyzerError
} from './errors'

export {
  PerspectiveClient,
  AnalyzeCommentRequestBody,
  AnalyzeCommentResponse,
  AttributeScore,
  SpanScore,
  analyzeImage,
  ImageAnalyzerOptions,
  ImageAnalyzerPredictions,
  ImageAnalyzerResponse,

  LanguageNotSupportedError,
  LanguageNotSupportedForAttributesError,
  LowConfidenceError,
  MissingParameterError,
  PerspectiveAnalyzerError,
  ToxicityAnalyzerError
};
