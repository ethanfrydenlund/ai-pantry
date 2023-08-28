import { connect, query, end } from "@/lib/db";
import bcrypt from "bcrypt";
export default async function handler(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const ingredients = [];
    const recipes = [];
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    try {
        const isUnique = await query(
            `
        SELECT * FROM Userbase
        WHERE username = $1
        `,
            [username]
        );
        if (isUnique.rows.length > 0) {
            return res.status(400).json({ message: "Username already exists" });
        }
        const results = await query(
            `
            INSERT INTO Userbase (username, hashed_password, ingredients, recipes)
            VALUES ($1, $2, $3, $4)
            RETURNING id, username, ingredients, recipes
            `,
            [username, hashedPassword, ingredients, recipes]
        );
        const name = results.rows[0].username;
        return res.status(201).json(`${name} was created! Try logging in :)`);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}