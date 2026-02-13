import { Schema, model, Document, Types } from "mongoose";

export interface IReview extends Document {
    user: Types.ObjectId;
    album: Types.ObjectId;
    rating: number;
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