import { connect, query, end } from "@/lib/db";
import bcrypt from "bcrypt";
export default async function handler(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const validUsername = await query(
            `
            SELECT * FROM Users
            WHERE username = $1
            `   ,
            [username]
        );
        if (validUsername.rows.length === 0) {
            return res.status(400).json({ message: "Username is incorrect" });
        }
        if (bcrypt.compareSync(password, validUsername.rows[0].hashed_password)) {
            const cleanedUser = {
                id: validUsername.rows[0].id,
                username: validUsername.rows[0].username,
                ingredients: validUsername.rows[0].ingredients,
                recipes: validUsername.rows[0].recipes,
            }
            return res.status(200).json(cleanedUser);
        } else {
            return res.status(400).json({ message: "Password is incorrect" });
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}