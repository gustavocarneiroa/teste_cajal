import 'reflect-metadata'
import express from "express"
import * as dotenv from "dotenv"
import { Controller } from './controller';
dotenv.config()

const app = express();
app.use(express.json());
app
    .route("/")
    .get(Controller.get)
    .post(Controller.post)


const port = process.env.PORT;
app.listen(port, () => console.log(`Connected at ${port}`))