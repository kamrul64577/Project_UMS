import express from "express";
import { StudentController } from "./student.controller";

const router = express.Router();

//will get controller
router.post("/create-student", StudentController.createStudent);

router.get("/", StudentController.getAllStudents);

router.get("/:StudentId", StudentController.getSingleStudent);

export const StudentRoute = router;
