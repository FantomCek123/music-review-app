import { Schema, model, Document, Types } from "mongoose";

export interface IReview extends Document {
    //_id: Types.ObjectId;
    //id: string;
    user: Types.ObjectId;
    album: Types.ObjectId;
    rating: number;
    comment: string;
}

export interface INewReview {
    user: Types.ObjectId;
    album: Types.ObjectId;
    comment: string;
}

const reviewSchema = new Schema<IReview>({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    album: { 
        type: Schema.Types.ObjectId, 
        ref: "Album", 
        required: true 
    },
    rating: { 
        type: Number, 
        required: true, 
        min: 1, 
        max: 10 
    },
    comment: { 
        type: String, 
        trim: true, 
        default: "" 
    }
}, { timestamps: true });

export default model<IReview>("Review", reviewSchema);