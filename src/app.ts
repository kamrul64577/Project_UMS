import express, { Application } from "express";
import cors from "cors";
import { StudentRoute } from "./app/Modules/student/student.route";
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// Application Routes
app.use("/api/v1/students", StudentRoute);

// console.log(process.cwd());

export default app;
