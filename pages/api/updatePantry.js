import { query } from "@/lib/db";
export default async function handler(req, res) {
  const ingredients = req.body.ingredients;
  const recipies = req.body.recipies;
  const id = req.body.id;

  try {
    const update = await query(
      `
        UPDATE Userbase
        SET ingredients = $1,
            recipies = $2
        WHERE id = $3;
        `   ,
      [ingredients, recipies, id]
    );
    return res.status(200).json('successful');
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}