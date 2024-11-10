import IBook from "@/app/types/bookSchema";
import mongoose, { Model, Schema } from "mongoose";

const BookSchema: Schema<IBook>=new Schema({
    title:{type: String, required: true},
    author:{type: String, required: true, unique: true},
    rating: {type: Number, required: true},
})

const Book: Model<IBook> = mongoose.models.Book || mongoose.model<IBook>('Book', BookSchema);
export default Book;