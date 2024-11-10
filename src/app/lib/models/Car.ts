import ICar from "@/app/types/carSchema";
import mongoose, { Model, Schema } from "mongoose";

const CarSchema: Schema<ICar>=new Schema({
    make:{type: String, required: true},
    model_car:{type: String, required: true, unique: true},
    year: {type: String, required: true},
})

const Car: Model<ICar> = mongoose.models.Car || mongoose.model<ICar>('Car', CarSchema);
export default Car;