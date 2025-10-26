import express from 'express';
import dotenv from 'dotenv';
import { sql } from './config/db.js';

dotenv.config();

const app = express();

//middleware
app.use(express.json());

//Simple custom middleware
// app.use((req, res, next) => {
//     console.log("Hey we hit a reg, the method is:", req.method, "and the url is:", req.method)
//     next();
// })

const PORT = process.env.PORT || 5001;

async function initDB(){
    try{
        await sql `CREATE TABLE IF NOT EXISTS transaction(
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10,2) NOT NULL,
            category VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`;
        console.log("Database initialized successfully");

    } catch(error){
        console.error("Error initializing database:", error);
        process.exit(1); // 1 là faileure, 0 là success
    }
}

app.get("/", async (req, res) => {
    res.send("It works!");
});

app.post("/api/transactions", async (req, res) => {
    try {
        const { user_id, title, amount, category } = req.body;
        
        if (!user_id || !title || amount === undefined || !category) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const transaction = await sql`
            INSERT INTO transaction (user_id, title, amount, category)
            VALUES (${user_id}, ${title}, ${amount}, ${category})
            RETURNING *
        `
        console.log(transaction);
        res.status(201).json(transaction[0]);


    } catch (error) {
        console.log("Error creating transaction:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

console.log("My PORT:",process.env.PORT);

initDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on PORT:",PORT);
    });
});