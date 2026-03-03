import { Schema, model, Document, Types } from "mongoose";

export interface IAlbum extends Document {
  title: string;
  artist: string;
  year: number;
  genre: string[];
  imageUrl?: string;
  user: Types.ObjectId;  
}

export interface INewAlbum {
  title: string;
  artist: string;
  year: number;
  genre: string[];
  imageUrl?: string;
  user: Types.ObjectId;   
}

const albumSchema = new Schema<IAlbum>(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: [String], default: [] },
    imageUrl: { type: String },
    user: {                
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IAlbum>("Album", albumSchema);