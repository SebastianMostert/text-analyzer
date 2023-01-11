// googleapis@48.0.0
const { google } = require('googleapis');
const DISCOVERY_URL = 'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1';

const typedefs = require("./typedefs");

// Some supported attributes
// attributes = ["TOXICITY", "SEVERE_TOXICITY", "IDENTITY_ATTACK", "INSULT",
// "PROFANITY", "THREAT", "SEXUALLY_EXPLICIT", "FLIRTATION", "SPAM",
// "ATTACK_ON_AUTHOR", "ATTACK_ON_COMMENTER", "INCOHERENT",
// "INFLAMMATORY", "OBSCENE", "UNSUBSTANTIAL"];

// Set your own thresholds for when to trigger a response

/**
 * Analyze attributes in a block of text
 * @param {typedefs.PerspectiveOptions} options - The options object
 * 
 * @return {typedefs.PerspectiveResponse} res - analyzed atttributes
 * @description Analyze some text to find profanity
 * 
 * @example <caption>Checks english text and triggers if the ai is 75% sure</caption>
 * await perspective.analyzeText({
			text: message.content,
			attributeThresholds: {
				TOXICITY: 0.75,
				SEVERE_TOXICITY: 0.75,
				IDENTITY_ATTACK: 0.75,
				INSULT: 0.75,
				THREAT: 0.75,
				SEXUALLY_EXPLICIT: 0.75,
				FLIRTATION: 0.75,
				ATTACK_ON_AUTHOR: 0.75,
				ATTACK_ON_COMMENTER: 0.75,
			},
			languages: ['en'],
			apiKey: process.env.PERSPECTIVE_API_KEY
		});

 * 
 */
async function analyzeText(options = {}) {
	const { apiKey, text, attributeThresholds, languages } = options;
	let data = {};

	const res = google.discoverAPI(DISCOVERY_URL)
		.then(async client => {
			// This is the format the API expects
			const requestedAttributes = {};
			for (const key in attributeThresholds) {
				requestedAttributes[key] = {};
			}

			//-------------------------------------------------//
			const analyzeRequest = {
				comment: { text: text },
				languages,
				requestedAttributes: requestedAttributes,
			};

			const res_ = await client.comments.analyze({
				key: apiKey,
				resource: analyzeRequest,
			});
			for (const key in res_.data['attributeScores']) {
				data[key] =
					res_.data['attributeScores'][key]['summaryScore']['value'] >
					attributeThresholds[key];
			}
			return data;
		})
		.catch(err => {
			throw err;
		});
	return await res;
}

module.exports = analyzeText;