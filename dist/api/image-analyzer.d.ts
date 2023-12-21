export interface ImageAnalyzerOptions {
    apiKey: string;
    proxyURL: string;
}
export interface ImageAnalyzerPredictions {
    teen: number;
    everyone: number;
    adult: number;
}
export interface ImageAnalyzerResponse {
    url_classified: string;
    rating_index: number;
    rating_letter: string;
    predictions: ImageAnalyzerPredictions;
    rating_label: string;
    error_code: number;
}
/**
 * Analyze an image and determine its rating
 * @param {ImageAnalyzerOptions} options - The options object
 * @throws {MissingParameterError} Throws an error if one of the parameters is missing
 * @return {Promise<ImageAnalyzerResponse>} - The result of the analysis
 * @description Analyze an image and determine its rating
 * @example
 * // Checks an image and returns the result
 * await analyzeImage({
 *   apiKey: process.env.API_KEY,
 *   proxyURL: 'https://www.exampleImage.com',
 * });
 */
export declare function analyzeImage(options: ImageAnalyzerOptions): Promise<ImageAnalyzerResponse>;
