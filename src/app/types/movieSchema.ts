import { Document } from "mongoose";

export default interface IMovie extends Document{
  _id: string;
  title: string;
  director: string;
  releaseYear: string;
}
