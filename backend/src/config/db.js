import {neon}  from '@neondatabase/serverless'

import "dotenv/config";

// Tạo kết nối SQL bằng cách sử dụng DB URL từ biến môi trường
export const sql = neon(process.env.DATABASE_URL);

export async function initDB(){
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