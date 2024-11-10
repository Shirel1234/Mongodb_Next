import IUser from "@/app/types/userSchema";
import mongoose, { Model, Schema } from "mongoose";

const UserSchema: Schema<IUser>=new Schema({
    username:{type: String, required: true},
    email:{type: String, required: true, unique: true},
    password: {type: String, required: true},
})

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;