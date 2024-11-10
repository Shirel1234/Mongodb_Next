import { Document } from "mongoose";

export default interface IBook extends Document{
    _id: string;
    title: string;
    author: string;
    rating: number;
  }
  