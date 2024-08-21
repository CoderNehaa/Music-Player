import dotenv from "dotenv";
dotenv.config();

import express from "express";
import swaggerUi from "swagger-ui-express";
import userRouter from "./src/routes/user.routes.js";
import { connectDb } from "./src/config/db.connect.js";
import { errorHandler } from "./src/middlewares/error.handler.js";
import swaggerDoc from "./swagger.json" with { type: "json" };

import cors from "cors";
import musicRouter from "./src/routes/music.routes.js";

const server = express();
const port = process.env.PORT;

server.use(express.json());
server.use(cors({
    origin: process.env.FRONTEND_DOMAIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}));

server.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
server.use('/users', userRouter);
server.use('/music', musicRouter);

server.use(errorHandler);

server.get('/', (req, res) => {
    res.send(`Get API documentation on http://localhost:${port}/api`);
});

server.listen(port, async () => {
    console.log("Server is listening on port", port);

    const url = process.env.DB_CONNECTION;
    await connectDb(url);
})

