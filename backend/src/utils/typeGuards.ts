import { INewUser } from "../models/user";
import { IReview } from "../models/review";
import { INewAlbum } from "../models/album";


export const isNewUser = (obj: any): obj is INewUser => {
  return (
    obj &&
    typeof obj.username === "string" &&
    typeof obj.email === "string" &&
    typeof obj.password === "string"
  );
};


export const isNewReview = (obj: any): obj is Partial<IReview> => {
  return (
    obj &&
    typeof obj.user === "string" &&
    typeof obj.album === "string" &&
    typeof obj.rating === "number" &&
    typeof obj.comment === "string"
  );
};


export const isNewAlbum = (obj: any): obj is INewAlbum => {
  return (
    obj &&
    typeof obj.title === "string" &&
    typeof obj.artist === "string" &&
    typeof obj.year === "number" &&
    Array.isArray(obj.genre)
  );
};


