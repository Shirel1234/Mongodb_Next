import IMovie from "@/app/types/movieSchema";
import mongoose, { Model, Schema } from "mongoose";

const MovieSchema: Schema<IMovie>=new Schema({
    title:{type: String, required: true},
    director:{type: String, required: true, unique: true},
    releaseYear: {type: String, required: true},
})

const Movie: Model<IMovie>=mongoose.models.Movie || mongoose.model<IMovie>('Movie', MovieSchema);
export default Movie;