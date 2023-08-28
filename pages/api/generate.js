import { Configuration, OpenAIApi } from "openai";

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
  const numIngredients = Math.floor(Math.random() * (Math.min(ingredients.length, 10) - 3 + 1) + 3);
  const randomIngredients = [];

  for (let i = 0; i < numIngredients; i++) {
    let index = Math.floor(Math.random() * ingredients.length);
    randomIngredients.push(ingredients[index]);
    ingredients.splice(index, 1);
  }

  try {
    const reply = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system", "content": `You are a helpful chef that reccomends reasonable recipies. You always respond in the format 
        Name: Description: Calories: . The description section should be a series of bullet points (using -) explaining how to prepare the dish.
         You will be given a list of ingredients, and you should suggest a recipie that could be made using them` },
        {
          "role": "user", "content": `Can you suggest one specific meal I can make with exclusively these ingredients: ${randomIngredients}.
          You respond with at most a 8 bullet point description. Also make the name for the dish creative and quirky. When you are done
          please double check that you have Name: Description: and Calories: sections in your response. and calories has an accurate number` },
      ],
      temperature: 0.4,
      max_tokens: 300,
    });
    res.status(200).json({ result: reply.data.choices[0].message.content });
  } catch (error) {
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