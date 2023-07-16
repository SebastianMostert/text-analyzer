# Toxicity Analyzer

Toxicity Analyzer is a package that allows you to analyze text and images for toxicity, profanity, and other attributes.

## Usage/Examples

### analyzeText

Analyzes the provided text for toxicity and other attributes using the Perspective API.

#### Options

##### PerspectiveOptions

| Property             	| Type                                     	| Description                                                                                          	|
|----------------------	|------------------------------------------	|------------------------------------------------------------------------------------------------------	|
| `apiKey`             	| string                                   	| Your [Perspective API](https://developers.perspectiveapi.com/s/?language=en_US) key.                  	|
| `text`               	| string                                   	| The text to be analyzed.                                                                              	|
| `attributeThresholds` 	| PerspectiveAttributeThresholds           	| The attribute thresholds to determine if the text is considered toxic or not.                          	|
| `autoLanguage`       	| boolean                                  	| (Optional) If set to `true`, the language of the text will be automatically detected. Default is `false`. 	|
| `languages`          	| string[]                                 	| (Optional) The languages to analyze the text in. If not provided, defaults to `['en']`.               	|

##### PerspectiveAttributeThresholds

| Name                	| Type   	| Description                                                        	| Available Languages                                                             	|
|---------------------	|--------	|--------------------------------------------------------------------	|---------------------------------------------------------------------------------	|
| TOXICITY            	| Number 	| Indicates whether the text is considered toxic                      	| ar, zh, cs, nl, en, fr, de, hi, hi-Latn, <br>id, it, ja, ko, pl, pt, ru, es, sv 	|
| SEVERE_TOXICITY     	| Number 	| Indicates whether the text is considered severely toxic             	| ar, zh, cs, nl, en, fr, de, hi, hi-Latn,<br>id, it, ja, ko, pl, pt, ru, es, sv  	|
| IDENTITY_ATTACK     	| Number 	| Indicates whether the text is considered an identity attack         	| ar, zh, cs, nl, en, fr, de, hi, hi-Latn,<br>id, it, ja, ko, pl, pt, ru, es, sv  	|
| INSULT              	| Number 	| Indicates whether the text is considered an insult                   	| ar, zh, cs, nl, en, fr, de, hi, hi-Latn,<br>id, it, ja, ko, pl, pt, ru, es, sv  	|
| PROFANITY           	| Number 	| Indicates whether the text is considered profane                     	| ar, zh, cs, nl, en, fr, de, hi, hi-Latn,<br>id, it, ja, ko, pl, pt, ru, es, sv  	|
| THREAT              	| Number 	| Indicates whether the text is considered a threat                     	| ar, zh, cs, nl, en, fr, de, hi, hi-Latn,<br>id, it, ja, ko, pl, pt, ru, es, sv  	|
| SEXUALLY_EXPLICIT   	| Number 	| Indicates whether the text is considered sexually explicit        	| (Experimental)                                                                     	|
| FLIRTATION          	| Number 	| Indicates whether the text is considered flirtatious                 	| (Experimental)                                                                   	|
| SPAM                	| Number 	| Indicates whether the text is considered spam                        	| (Experimental) en                                                                              	|
| ATTACK_ON_AUTHOR    	| Number 	| Indicates whether the text is considered an attack on the author  	| (Experimental) en                                                                              	|
| ATTACK_ON_COMMENTER 	| Number 	| Indicates whether the text is considered an attack on a commenter 	| (Experimental) en                                                                              	|
| INCOHERENT          	| Number 	| Indicates whether the text is considered incoherent                  	| (Experimental) en                                                                               	|
| INFLAMMATORY        	| Number 	| Indicates whether the text is considered inflammatory                	| (Experimental) en                                                                               	|
| OBSCENE             	| Number 	| Indicates whether the text is considered obscene                     	| (Experimental) en                                                                               	|
| UNSUBSTANTIAL       	| Number 	| Indicates whether the text is considered unsubstantial               	| (Experimental) en                                                                               	|

#### Response

##### PerspectiveResponse

| Property      	| Type                                                        	| Description                                                 	|
|---------------	|-------------------------------------------------------------	|-------------------------------------------------------------	|
| `languages`   	| string[]                                                    	| The languages used for the analysis.                        	|
| `attributes`  	| { [key: string]: { score: number; threshold: number; isToxic: boolean; } } 	| The attributes and their scores indicating toxicity.         	|

#### Example

```javascript
const analyzer = require('toxicity-analyzer');

const attributeThresholds = {
  TOXICITY: 0.75,
  SEVERE_TOXICITY: 0.75,
  IDENTITY_ATTACK: 0.75,
  INSULT: 0.75,
  THREAT: 0.75,
  SEXUALLY_EXPLICIT: 0.75,
  FLIRTATION: 0.75,
  ATTACK_ON_AUTHOR: 0.75,
  ATTACK_ON_COMMENTER: 0.75,
};

const text = 'This is where you place the text you want to analyze';
const apiKey = 'Your Perspective API key goes here!';

const analyzeText = async () => {
  try {
    const results = await analyzer.analyzeText({
      text,
      attributeThresholds,
      languages: ['en'],
      apiKey,
    });
    console.log(results);
  } catch (error) {
    console.error(error);
  }
};

analyzeText();
```

##### Error Handling

Any error that occurs during the text analysis will be caught and logged to the console.

### analyzeImage

Analyzes the provided image for explicit content using the [Moderate Content](https://www.moderatecontent.com/) API.

#### Options

##### ImageAnalyzerOptions

| Property    	| Type  	| Description                                           	|
|-------------	|-------	|-------------------------------------------------------	|
| `apiKey`    	| string	| Your [Google Cloud Vision API](https://www.moderatecontent.com/) key.    	|
| `proxyURL`  	| string	| The URL of the image to be analyzed.                    	|

#### Response

##### ImageAnalyzerResponse

| Property         	| Type                  	| Description                                                   	|
|------------------	|-----------------------	|---------------------------------------------------------------	|
| `url_classified` 	| string                	| The URL of the classified image.                              	|
| `rating_index`   	| number                	| The rating index indicating the explicitness of the image.     	|
| `rating_letter`  	| string                	| The rating letter indicating the explicitness of the image.    	|
| `predictions`    	| ImageAnalyzerPredictions 	| The predictions for different age groups.                      	|
| `rating_label`   	| string                	| The rating label indicating the explicitness of the image.     	|
| `error_code`     	| number                	| The error code if an error occurred during the image analysis. 	|

##### ImageAnalyzerPredictions

| Property   	| Type   	| Description                         	|
|------------	|--------	|-------------------------------------	|
| `teen`     	| number 	| The prediction for the teen age group. 	|
| `everyone` 	| number 	| The prediction for the everyone age group. 	|
| `adult`    	| number 	| The prediction for the adult age group.    	|

#### Example

```javascript
const analyzer = require('toxicity-analyzer');

const apiKey = 'Your Google Cloud Vision API key goes here!';
const proxyURL = 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg';

const analyzeImage = async () => {
  try {
    const results = await analyzer.analyzeImage({
      apiKey,
      proxyURL,
    });
    console.log(results);
  } catch (error) {
    console.error(error);
  }
};

analyzeImage();
```

##### Error Handling

Any error that occurs during the image analysis will be caught and logged to the console.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
