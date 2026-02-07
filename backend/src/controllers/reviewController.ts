import { Request, Response } from "express";
import Review, { IReview } from "../models/review";

export const createReview = async (req: Request, res: Response) => {
  try {
    const review: IReview = await Review.create(req.body);
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const getReviews = async (_req: Request, res: Response) => {
  const reviews = await Review.find()
    .populate("user", "username")
    .populate("album", "title artist");
  res.json(reviews);
};

export const getReviewById = async (req: Request, res: Response) => {
  const review = await Review.findById(req.params.id)
    .populate("user", "username")
    .populate("album", "title artist");
  if (!review) return res.status(404).json({ message: "Review not found" });
  res.json(review);
};
