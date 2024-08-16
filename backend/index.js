import express from "express";
import swaggerUi from "swagger-ui-express";
import userRouter from "./src/routes/user.routes.js";
import swaggerDoc from "./swagger.json" with {type:"json"}; 
import { connectDb } from "./src/config/db.connect.js";
import {errorHandler} from "./src/middlewares/error.handler.js";
import dotenv from "dotenv";

dotenv.config();

const server = express();
const port = process.env.PORT || 3200;

server.use(express.json());
server.get('/', (req, res) => {
    res.send(`Get API documentation on http://localhost:${port}/api`);
})

server.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
server.use('/users', userRouter);
server.use(errorHandler);

server.listen(port, () => {
    console.log("Server is listening on port ", port);
})

connectDb();

