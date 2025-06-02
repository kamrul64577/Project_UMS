import { Request, Response } from "express";
import { StudentService } from "./student.service";
import Joi from 'joi'

const createStudent = async (req: Request, res: Response) => {
  try {
    // Creating a schema validation using joi
    const JoiValidationSchema = Object({
      id : Joi.String,
      name:{
        firstName : Joi.string().max(30).required(),
        middleName : Joi.string().max(30),
        lastName : Joi.string().max(30).required(),
      },
      gender : Joi.string().required().valid( ["male", "female", "other"]),
    })

    const { student: StudentData } = req.body;

    //will call service funtion to send data
    const result = await StudentService.createStudentIntoDB(StudentData);

    // send response
    res.status(200).json({
      success: true,
      message: "succesfully created student",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

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
};
export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
