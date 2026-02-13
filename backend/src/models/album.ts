import { Schema, model, Document } from "mongoose";

export interface IAlbum extends Document {
    title: string;
    artist: string;
    year: number;
    genre: string[];
} 

const albumSchema = new Schema<IAlbum>(
    {
    title: { 
        type: String, required: true 
    }, 
    artist: { 
        type: String, required: true 
    },
    year: { 
        type: Number, required: true 
    },
    genre: { 
        type: [String], default: []
     }
}, { timestamps: true });

export default model<IAlbum>("Album", albumSchema);
