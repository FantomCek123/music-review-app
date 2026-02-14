import { Request, Response } from "express";
import { isNewReview } from "../utils/typeGuards";
import * as rs from "../services/reviewService";


export const createReview = async (req: Request, res: Response) => {
  try {
    if (!isNewReview(req.body)) {
      return res.status(400).json({ message: "Invalid review data" });
    }

    const review = await rs.createReviewService(req.body);
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};


export const getReviews = async (_req: Request, res: Response) => {
  const reviews = await rs.getReviewsService();
  res.json(reviews);
};


export const getReviewById = async (req: Request, res: Response) => {
  const review = await rs.getReviewByIdService(req.params.id);

  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }

  res.json(review);
};


export const deleteReview = async (req: Request, res: Response) => {
  try {
    const review = await rs.deleteReviewService(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json({ message: "Review deleted", review });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};


export const updateReview = async (req: Request, res: Response) => {
  try {
    const review = await rs.updateReviewService(req.params.id, req.body);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json(review);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

