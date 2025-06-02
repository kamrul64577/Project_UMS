import { Schema, model } from "mongoose";
import validator from 'validator';
import {
  Guardian,
  localGuardian,
  Student,
  UserName,
} from "./student.interface";

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String, require: true, trim: true,
    // validate : {
    //     validator : function (value : string){
    //     const FirstNameStr = value.charAt(0).toUpperCase() + value.slice(1)
    //     return FirstNameStr === value;
    //     console.log(value)
    //   },
    // message : "{Value} is not capitaliz format",
    // }
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String, require: true, trim: true,
    // validate : {
    //   validator : (value : string) => validator.isAlpha(value),
    //   message : "{VALUE} is not valid",
    // }
  },
});

const guardinaSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  fatherOcupation: { type: String, required: true },
  motherOcupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGuardianSchema = new Schema<localGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

// 2. Create a Schema corresponding to the document interface.
const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true },
  name: {
    type: userNameSchema,
    required: true,
  },

  gender: {
    type: String,
    enum: ["male", "female", "other"],
    message: " {VALUE} is not valid the gender must be male or female or other",
    required: true,
  },
  dateOfBirth: { type: String },
  email: {
    type: String, required: true, unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: "{VALUE} email is not valid",
    }
  },
  contactNumber: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+"],
  },
  presentAddress: { type: String },
  parmanentAddress: { type: String },
  guardian: {
    type: guardinaSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ["active", "block"],
    default: "active",
    required: true
  },
});

export const StudentModel = model<Student>("Student", studentSchema);
