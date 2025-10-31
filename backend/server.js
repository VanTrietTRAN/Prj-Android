import express from 'express';
import dotenv from 'dotenv';
import { initDB} from './src/config/db.js';
import rateLimiter from './src/middleware/rateLimiter.js';

import transactionsRoute from './src/routes/transactionsRoute.js';

dotenv.config();

const app = express();

//middleware
app.use(rateLimiter);
app.use(express.json());

//Simple custom middleware
// app.use((req, res, next) => {
//     console.log("Hey we hit a reg, the method is:", req.method, "and the url is:", req.method)
//     next();
// })

const PORT = process.env.PORT || 5001;


app.use("/api/transactions", transactionsRoute);

console.log("My PORT:",process.env.PORT);

initDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on PORT:",PORT);
    });
});