/**
 * @typedef {object} PerspectiveResponse
 * @property {?boolean} TOXICITY - Indicates whether the text was considered Toxic
 * @property {?boolean} SEVERE_TOXICITY - Indicates whether the text was considered Severe Toxicity
 * @property {?boolean} IDENTITY_ATTACK - Indicates whether the text was considered an Identity Attack
 * @property {?boolean} INSULT - Indicates whether the text was considered an Insult
 * @property {?boolean} PROFANITY - Indicates whether the text was considered profane
 * @property {?boolean} THREAT - Indicates whether the text was considered a threat
 * @property {?boolean} SEXUALLY_EXPLICIT - Indicates whether the text was considered as sexually explicit
 * @property {?boolean} FLIRTATION - Indicates whether the text was considered flirtatious
 * @property {?boolean} SPAM - Indicates whether the text was considered spam
 * @property {?boolean} ATTACK_ON_AUTHOR - Indicates whether the text was considered as an attack on the author
 * @property {?boolean} ATTACK_ON_COMMENTER - Indicates whether the text was considered as an attack on a commenter
 * @property {?boolean} INCOHERENT - Indicates whether the text was considered incoherent
 * @property {?boolean} INFLAMMATORY - Indicates whether the text was considered inflammatory
 * @property {?boolean} OBSCENE - Indicates whether the text was considered obscene
 * @property {?boolean} UNSUBSTANTIAL - Indicates whether the text was considered unsubstantial
 */

/**
 * @typedef {object} PerspectiveAttributeThresholds
 * @property {?number} TOXICITY - When to trigger the AI (0.01 - 1.00)
 * @property {?number} SEVERE_TOXICITY - When to trigger the AI (0.01 - 1.00)
 * @property {?number} IDENTITY_ATTACK - When to trigger the AI (0.01 - 1.00)
 * @property {?number} INSULT - When to trigger the AI (0.01 - 1.00)
 * @property {?number} PROFANITY - When to trigger the AI (0.01 - 1.00)
 * @property {?number} THREAT - When to trigger the AI (0.01 - 1.00)
 * @property {?number} SEXUALLY_EXPLICIT - When to trigger the AI (0.01 - 1.00)
 * @property {?number} FLIRTATION - When to trigger the AI (0.01 - 1.00)
 * @property {?number} SPAM - When to trigger the AI (0.01 - 1.00)
 * @property {?number} ATTACK_ON_AUTHOR - When to trigger the AI (0.01 - 1.00)
 * @property {?number} ATTACK_ON_COMMENTER - When to trigger the AI (0.01 - 1.00)
 * @property {?number} INCOHERENT - When to trigger the AI (0.01 - 1.00)
 * @property {?number} INFLAMMATORY - When to trigger the AI (0.01 - 1.00)
 * @property {?number} OBSCENE - When to trigger the AI (0.01 - 1.00)
 * @property {?number} UNSUBSTANTIAL - When to trigger the AI (0.01 - 1.00)
 */

/**
 * @typedef {object} PerspectiveOptions
 * @property {string} apiKey - The perspective API key
 * @property {string} text - The text to analyze
 * @property {PerspectiveAttributeThresholds} attributeThresholds - The object of attributes and their thresholds
 * @property {Array} languages - The Languages to check
 */

/**
 * @typedef {object} ImageAnalyzerOptions
 * @property {string} apiKey - The moderatecontent API key
 * @property {string} proxyURL - The proxy url of the image you would like to check
 */

/**
 * @typedef {object} ImageAnalyzerPredictions
 * @property {number} teen - How sure the AI is that the image is classified as "teen"
 * @property {number} everyone - How sure the AI is that the image is classified as "everyone"
 * @property {number} adult - How sure the AI is that the image is classified as "adult"
 */

/**
 * @typedef {object} ImageAnalyzerResponse
 * @property {string} url_classified - The Url of the image you would like to check
 * @property {number} rating_index - The rating index
 * @property {string} rating_letter - The rating letter
 * @property {ImageAnalyzerPredictions} predictions - The predictions
 * @property {string} rating_label - The rating label (everypne, teen or adult)
 * @property {number} error_code - The error code, 0 for no error
 */

exports.unused = {};