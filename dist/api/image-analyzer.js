"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeImage = void 0;
const axios_1 = require("axios");
const errors_1 = require("../errors");
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
async function analyzeImage(options) {
    const { apiKey, proxyURL } = options;
    if (!apiKey) {
        throw new errors_1.MissingParameterError("API Key");
    }
    if (!proxyURL) {
        throw new errors_1.MissingParameterError("Image URL");
    }
    const requestOptions = {
        method: "GET",
        url: `https://api.moderatecontent.com/moderate/?key=${apiKey}&url=${proxyURL}`,
    };
    try {
        const response = await axios_1.default.request(requestOptions);
        return response.data;
    }
    catch (error) {
        throw new errors_1.PerspectiveAnalyzerError(String(error.message));
    }
}
exports.analyzeImage = analyzeImage;
