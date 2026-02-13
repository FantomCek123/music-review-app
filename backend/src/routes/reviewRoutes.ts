import express from "express";
import  * as reviewController from "../controllers/reviewController";

const router = express.Router();

router.post("/", reviewController.createReview);
router.get("/", reviewController.getReviews);
router.get("/:id", reviewController.getReviewById);
router.delete("/:id", reviewController.deleteReview);

export default router;
