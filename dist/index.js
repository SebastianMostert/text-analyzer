"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeImage = exports.analyzeText = void 0;
const text_analyzer_1 = require("./api/text-analyzer");
Object.defineProperty(exports, "analyzeText", { enumerable: true, get: function () { return text_analyzer_1.analyzeText; } });
const image_analyzer_1 = require("./api/image-analyzer");
Object.defineProperty(exports, "analyzeImage", { enumerable: true, get: function () { return image_analyzer_1.analyzeImage; } });
