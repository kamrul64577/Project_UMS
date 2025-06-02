import { Request, Response } from "express";
import { StudentService } from "./student.service";
import Joi from 'joi'
import studentValidationSchema from "./student.validation";
const createStudent = async (req: Request, res: Response) => {
  try {
    // Creating a schema validation using joi

    const { student: StudentData } = req.body;

    const { error, value } = studentValidationSchema.validate(StudentData);

      //will call service funtion to send data
    const result = await StudentService.createStudentIntoDB(StudentData);

    // console.log({ error }, { value });
    if (error) {
      res.status(500).json({
        success: false,
        message: "something went wrong",
        eror: error.details,
      })
    }
    // send response
    res.status(200).json({
      success: true,
      message: "succesfully created student",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      eror: error,
    })
  }}

  const getAllStudents = async (req: Request, res: Response) => {
    try {
      const result = await StudentService.getAllStudentsFromDB();
      console.log(result);
      res.status(200).json({
        success: true,
        message: "succesfully retrieved students ALL",
        data: result,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getSingleStudent = async (req: Request, res: Response) => {
    try {
      const { StudentId } = req.params;
      const result = await StudentService.getSingleStudentFromDB(StudentId);
      res.status(200).json({
        success: true,
        message: "succesfully get a student",
        data: result,
      });
    } catch (error) {
      console.log(error);
    }
  }

export const StudentController = {
    createStudent,
    getAllStudents,
    getSingleStudent,
  }

