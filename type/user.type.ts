import { Location } from "./voter.type";

export interface Employ {
  _id: string;
  full_name: string;
  email: string;
  password: string;
  role: string;
  location: Location;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface EmployResponse {
  success: boolean;
  data: Employ[];
}
