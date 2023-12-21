# Toxicity Analyzer

Perspective Analyzer is a TypeScript library that provides a convenient interface to analyze text and images using the Perspective API. The library includes modules for text and image analysis, offering a comprehensive solution for content moderation.

### Analyzing Text

```typescript
import { PerspectiveClient, AnalyzeCommentOptions, AnalyzeCommentResponse, SupportedLanguage } from 'perspective-analyzer';

const perspectiveApiKey = 'YOUR_PERSPECTIVE_API_KEY';
const rapidApiKey = 'YOUR_RAPID_API_KEY'; // Optional

const client = new PerspectiveClient(perspectiveApiKey, rapidApiKey);

const options: AnalyzeCommentOptions = {
  comment: 'Your text goes here',
  language: SupportedLanguage.English,
  autoLanguage: true, // Optional, default is false
};

try {
  const result: AnalyzeCommentResponse = await client.analyzeComment(options);
  console.log('Analysis result:', result);
} catch (error) {
  console.error('Error analyzing text:', error.message);
}
```

### Analyzing Images

```typescript
import { analyzeImage, ImageAnalyzerOptions, ImageAnalyzerResponse } from 'perspective-analyzer';

const options: ImageAnalyzerOptions = {
  apiKey: 'YOUR_MODERATE_CONTENT_API_KEY',
  proxyURL: 'https://www.exampleImage.com',
};

try {
  const result: ImageAnalyzerResponse = await analyzeImage(options);
  console.log('Image analysis result:', result);
} catch (error) {
  console.error('Error analyzing image:', error.message);
}
```

## Error Handling

The library provides various error classes for better error management. Make sure to handle errors appropriately in your application.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
