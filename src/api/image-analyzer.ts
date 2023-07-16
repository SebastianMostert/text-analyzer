import axios, { AxiosRequestConfig } from "axios";
import { MissingParameterError, PerspectiveAnalyzerError } from "../errors";

interface ImageAnalyzerOptions {
  apiKey: string;
  proxyURL: string;
}

interface ImageAnalyzerPredictions {
  teen: number;
  everyone: number;
  adult: number;
}

interface ImageAnalyzerResponse {
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
async function analyzeImage(
  options: ImageAnalyzerOptions
): Promise<ImageAnalyzerResponse> {
  const { apiKey, proxyURL } = options;

  if (!apiKey) {
    throw new MissingParameterError("API Key");
  }

  if (!proxyURL) {
    throw new MissingParameterError("Image URL");
  }

  const requestOptions: AxiosRequestConfig = {
    method: "GET",
    url: `https://api.moderatecontent.com/moderate/?key=${apiKey}&url=${proxyURL}`,
  };

  try {
    const response = await axios.request(requestOptions);
    return response.data;
  } catch (error: any) {
    throw new PerspectiveAnalyzerError(String(error.message));
  }
}

export { analyzeImage };
