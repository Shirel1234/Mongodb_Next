import { Document } from "mongoose";

export default interface ICar extends Document{
  _id: string;
  make: string;
  model_car: string;
  year: string;
}
