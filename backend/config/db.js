import {neon}  from '@neondatabase/serverless'

import "dotenv/config";

// Tạo kết nối SQL bằng cách sử dụng DB URL từ biến môi trường
export const sql = neon(process.env.DATABASE_URL);