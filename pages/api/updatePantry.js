import { query } from "@/lib/db";
export default async function handler(req, res) {
  const ingredients = req.body.ingredients;
  const recipes = req.body.recipes;
  const id = req.body.id;

  try {
    await connect();
    const update = await query(
      `
        UPDATE Userbase
        SET ingredients = $1,
            recipes = $2
        WHERE id = $3;
        `   ,
      [ingredients, recipes, id]
    );
    await end();
    return res.status(200).json('successful');
  } catch (e) {
    await end();
    res.status(500).json({ message: e.message });
  }
}