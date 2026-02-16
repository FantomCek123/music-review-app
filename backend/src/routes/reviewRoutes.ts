import express from "express";
import  * as reviewController from "../controllers/reviewController";

const router = express.Router();

router.post("/createReviw", reviewController.createReview);
router.get("/getAllReviews", reviewController.getReviews);
router.get("/getReviewWithId/:id", reviewController.getReviewById);
router.delete("/deleteReviwWithId/:id", reviewController.deleteReview);

export default router;
