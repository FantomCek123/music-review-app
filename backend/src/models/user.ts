import { Schema, model, Document } from "mongoose";


export interface IUser extends Document {
    //_id: Types.ObjectId;
    //id: string;
    username: string;
    email: string;
    password: string; 
    verified: boolean;
    verificationToken?: string;
}

export interface INewUser  {
    username: string;
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        immutable: true
     },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        isEmail: true
     },
    password: { 
        type: String, 
        required: true 
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    }
}, { timestamps: true });

export default model<IUser>("User", userSchema);
