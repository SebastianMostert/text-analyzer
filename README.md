
# Toxicity Analyzer

This package allows you to analyze text for toxicity, profanity and many other things!
## Usage/Examples
### Options
#### Attribute Thresholds
| Name                	| Type   	| Description                                                           	| Available Languages                                                             	|
|---------------------	|--------	|-----------------------------------------------------------------------	|---------------------------------------------------------------------------------	|
| TOXICITY            	| Number 	| Indicates whether the text was considered Toxic                       	| ar, zh, cs, nl, en, fr, de, hi, hi-Latn, <br>id, it, ja, ko, pl, pt, ru, es, sv 	|
| SEVERE_TOXICITY     	| Number 	| Indicates whether the text was considered Severe Toxicity             	| ar, zh, cs, nl, en, fr, de, hi, hi-Latn,<br>id, it, ja, ko, pl, pt, ru, es, sv  	|
| IDENTITY_ATTACK     	| Number 	| Indicates whether the text was considered an Identity Attack          	| ar, zh, cs, nl, en, fr, de, hi, hi-Latn,<br>id, it, ja, ko, pl, pt, ru, es, sv  	|
| INSULT              	| Number 	| Indicates whether the text was considered an Insult                   	| ar, zh, cs, nl, en, fr, de, hi, hi-Latn,<br>id, it, ja, ko, pl, pt, ru, es, sv  	|
| PROFANITY           	| Number 	| Indicates whether the text was considered profane                     	| ar, zh, cs, nl, en, fr, de, hi, hi-Latn,<br>id, it, ja, ko, pl, pt, ru, es, sv  	|
| THREAT              	| Number 	| Indicates whether the text was considered a threat                    	| ar, zh, cs, nl, en, fr, de, hi, hi-Latn,<br>id, it, ja, ko, pl, pt, ru, es, sv  	|
| SEXUALLY_EXPLICIT   	| Number 	| Indicates whether the text was considered as sexually explicit        	| Experimental                                                                    	|
| FLIRTATION          	| Number 	| Indicates whether the text was considered flirtatious                 	| Experimental                                                                    	|
| SPAM                	| Number 	| Indicates whether the text was considered spam                        	| en                                                                              	|
| ATTACK_ON_AUTHOR    	| Number 	| Indicates whether the text was considered as an attack on the author  	| en                                                                              	|
| ATTACK_ON_COMMENTER 	| Number 	| Indicates whether the text was considered as an attack on a commenter 	| en                                                                              	|
| INCOHERENT          	| Number 	| Indicates whether the text was considered incoherent                  	| en                                                                              	|
| INFLAMMATORY        	| Number 	| Indicates whether the text was considered inflammatory                	| en                                                                              	|
| OBSCENE             	| Number 	| Indicates whether the text was considered obscene                     	| en                                                                              	|
| UNSUBSTANTIAL       	| Number 	| Indicates whether the text was considered unsubstantial               	| en                                                                              	|

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

