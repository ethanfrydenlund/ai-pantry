import { Configuration, OpenAIApi} from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const ingredients = req.body.ingredients || '';

  try {
    const reply = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {"role": "system", "content": "You are a helpful chef that reccomends reasonable recipies."},
          {"role": "user", "content":  `Can you suggest one specific meal I can make with exclusively these ingredients: ${ingredients}.
          You respond with at most a 4 sentence description and you don't have to use all ingredients provided. You respond in the following format, Name: Description: Calories:`}
        ],
        temperature: 0.4,
        max_tokens: 200,
      });
    res.status(200).json({ result: reply.data.choices[0].message.content});
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}