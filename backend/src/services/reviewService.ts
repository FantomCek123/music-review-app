import Review, { IReview } from "../models/review";


export const createReviewService = async (data: Partial<IReview>): Promise<IReview> => {
  return await Review.create(data);
};


export const getReviewsService = async (): Promise<IReview[]> => {
  return await Review.find()
    .populate("user", "username")
    .populate("album", "title artist");
};


export const getReviewByIdService = async (id: string): Promise<IReview | null> => {
  return await Review.findById(id)
    .populate("user", "username")
    .populate("album", "title artist");
};


export const deleteReviewService = async (id: string): Promise<IReview | null> => {
  return await Review.findByIdAndDelete(id);
};

export const updateReviewService = async (
  id: string,
  data: Partial<any>
) => {
  return await Review.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

