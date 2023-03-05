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
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: generatePrompt(ingredients),
        temperature: 0.4,
        max_tokens: 100,
      });
    res.status(200).json({ result: completion.data.choices[0].text});
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

function generatePrompt(ingred) {
    return `Suggest a meal I could make with these ingredients:
    
    Ingredients: Tomatoes, Lettuce, Cheese
    Meal: Salad
    Ingredients: Noodles, Potatoes, Beef, Eggs
    Meal: Pasta with beef and potatoes on the side
    Ingredients: ${ingred}
    Meal: 
    `;
}