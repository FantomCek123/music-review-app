import express from "express";
import { createReview, getReviews, getReviewById } from "../controllers/reviewController";

const router = express.Router();

router.post("/", createReview);
router.get("/", getReviews);
router.get("/:id", getReviewById);

export default router;
