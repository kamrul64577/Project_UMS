export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type Guardian = {
  fatherName: string;
  motherName: string;
  fatherOcupation: string;
  motherOcupation: string;
  fatherContactNo: string;
  motherContactNo: string;
};

export type localGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type Student = {
  id: string;
  name: UserName;
  gender: "male" | "female";
  dateOfBirth: string;
  email: string;
  contactNumber: string;
  bloodGroup?: "A+" | "B+" | "A-";
  presentAddress: string;
  parmanentAddress: string;
  guardian: Guardian;
  localGuardian: localGuardian;
  profileImg?: string;
  isActive?: "active" | "block";
};
