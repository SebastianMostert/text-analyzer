
# Toxicity Analyzer

This package allows you to analyze text for toxicity, profanity and many other things!
## Usage/Examples
### Variables
#### Attribute Thresholds
TODO: Add Table

### Example
```js
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

const text = 'This is where you place the text you want to analyze'
const apiKey = 'You need to put your perspective api key here! 

const results = await analyzer({
	text, 
	attributeThresholds,
	languages: ['en'],
	apiKey,
});
```

