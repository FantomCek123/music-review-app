import React, { useState, useEffect } from "react";
import * as api from "../api/api";

export interface AlbumWithReviewsProps {
  album: import("../api/api").Album;
  reviewsState: Record<
    string,
    { rating: number; comment: string; reviewId?: string; isEditing?: boolean }
  >;
  setReviewsState: React.Dispatch<
    React.SetStateAction<
      Record<string, { rating: number; comment: string; reviewId?: string; isEditing?: boolean }>
    >
  >;
  showReviewForm: Record<string, boolean>;
  setShowReviewForm: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  newReviews: Record<string, { rating: number; comment: string }>;
  setNewReviews: React.Dispatch<React.SetStateAction<Record<string, { rating: number; comment: string }>>>;
}

interface ReviewState {
  rating: number;
  comment: string;
  reviewId?: string;
  isEditing?: boolean;
}

const AlbumWithReviews: React.FC<AlbumWithReviewsProps> = ({ album,
  reviewsState,
  setReviewsState,
  showReviewForm,
  setShowReviewForm,
  newReviews,
  setNewReviews, }) => {
  // Inicijalizacija stanja za review kad se učita album
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;

    if (album.reviews && user) {
      const userReview = album.reviews.find(r => r.user._id === user._id);
      if (userReview) {
        setReviewsState({
          [album._id]: {
            rating: userReview.rating,
            comment: userReview.comment,
            reviewId: userReview._id,
            isEditing: false,
          },
        });
      } else {
        setReviewsState({
          [album._id]: { rating: 1, comment: "" },
        });
      }
    } else {
      setReviewsState({
        [album._id]: { rating: 1, comment: "" },
      });
    }
  }, [album]);

  const state = reviewsState[album._id];

  // --- Edit / Save / Delete ---
  const handleEditClick = () => {
    setReviewsState(prev => ({ ...prev, [album._id]: { ...state, isEditing: true } }));
  };

  const handleInputChange = (field: "rating" | "comment", value: string | number) => {
    setReviewsState(prev => ({ ...prev, [album._id]: { ...state, [field]: value } }));
  };

  const handleSaveReview = async () => {
    if (!state?.reviewId) return;

    if (state.rating < 1 || state.rating > 10) {
      alert("Rating must be between 1 and 10");
      return;
    }

    try {
      await api.updateReview(state.reviewId, { rating: state.rating, comment: state.comment });
      setReviewsState(prev => ({ ...prev, [album._id]: { ...state, isEditing: false } }));
      alert("Review updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update review");
    }
  };

  const handleDeleteReview = async () => {
    if (!state?.reviewId) return;

    try {
      await api.deleteReview(state.reviewId);
      setReviewsState(prev => ({
        ...prev,
        [album._id]: { rating: 1, comment: "", reviewId: undefined, isEditing: false },
      }));
      alert("Review deleted!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete review");
    }
  };

  // --- New Review ---
  const handleToggleForm = () => {
    setShowReviewForm(prev => ({ ...prev, [album._id]: !prev[album._id] }));
    setNewReviews(prev => ({ ...prev, [album._id]: { rating: 1, comment: "" } }));
  };

  const handleNewReviewChange = (field: "rating" | "comment", value: string | number) => {
    setNewReviews(prev => ({ ...prev, [album._id]: { ...prev[album._id], [field]: value } }));
  };

  const handleSubmitNewReview = async () => {
    const reviewData = newReviews[album._id];
    if (!reviewData) return;

    if (reviewData.rating < 1 || reviewData.rating > 10) {
      alert("Rating must be between 1 and 10");
      return;
    }

    const userStr = localStorage.getItem("user");
    if (!userStr) {
      alert("You must be logged in to submit a review");
      return;
    }
    const user = JSON.parse(userStr);

    try {
      const newReview = await api.createReview({
        album: album._id,
        rating: reviewData.rating,
        comment: reviewData.comment,
        user: user._id,
      });

      setReviewsState(prev => ({
        ...prev,
        [album._id]: {
          rating: newReview.rating,
          comment: newReview.comment,
          reviewId: newReview._id,
          isEditing: false,
        },
      }));

      setShowReviewForm(prev => ({ ...prev, [album._id]: false }));
      alert("Review submitted!");
    } catch (err) {
      console.error(err);
      alert("Failed to submit review");
    }
  };

  return (
    <div style={{ display: "flex", gap: 12, marginBottom: 12, border: "1px solid #444", borderRadius: 6, padding: 10, alignItems: "flex-start" }}>
      {album.imageUrl && <img src={`http://localhost:5000/uploads/${album.imageUrl}`} alt={album.title} style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 4 }} />}

      <div style={{ flex: 1 }}>
        <h3>{album.title}</h3>
        <p>Artist: {album.artist}</p>
        <p>Year: {album.year}</p>
        <p>Genre: {album.genre.join(", ")}</p>

        {album.reviews && album.reviews.length > 0 && (
          <div style={{ marginTop: 8 }}>
            <strong>Reviews:</strong>
            {album.reviews.map(review => {
              const isUserReview = state?.reviewId === review._id;

              if (!isUserReview) {
                return (
                  <div key={review._id} style={{ borderTop: "1px solid #555", marginTop: 6, paddingTop: 6 }}>
                    <div>Rating: {review.rating}/10</div>
                    <div>{review.comment}</div>
                    <div style={{ opacity: 0.7 }}>By: {review.user?.username || "Unknown"}</div>
                  </div>
                );
              } else {
                return (
                  <div key={review._id} style={{ borderTop: "1px solid #555", marginTop: 6, paddingTop: 6 }}>
                    {state.isEditing ? (
                      <>
                        <input type="number" min={1} max={10} value={state.rating} onChange={e => handleInputChange("rating", Number(e.target.value))} style={{ width: 50 }} />
                        <input type="text" value={state.comment} onChange={e => handleInputChange("comment", e.target.value)} style={{ marginLeft: 8 }} />
                        <button onClick={handleSaveReview}>Save</button>
                        <button onClick={handleDeleteReview}>Delete</button>
                      </>
                    ) : (
                      <>
                        <div>Rating: {state.rating}/10</div>
                        <div>{state.comment}</div>
                        <div style={{ opacity: 0.7 }}>By: {review.user?.username || "Unknown"}</div>
                        <button onClick={handleEditClick}>Edit</button>
                      </>
                    )}
                  </div>
                );
              }
            })}
          </div>
        )}

        {!state?.reviewId && (
          <div style={{ marginTop: 12 }}>
            <button onClick={handleToggleForm} style={{ padding: "6px 12px", borderRadius: 4, border: "none", backgroundColor: "#007bff", color: "#fff", cursor: "pointer" }}>
              {showReviewForm[album._id] ? "Cancel" : "Leave a review"}
            </button>

            {showReviewForm[album._id] && (
              <div style={{ marginTop: 8 }}>
                <div>
                  <label>Rating (1-10): </label>
                  <input type="number" min={1} max={10} value={newReviews[album._id]?.rating ?? 1} onChange={e => handleNewReviewChange("rating", Number(e.target.value))} style={{ width: 60, marginLeft: 8 }} />
                </div>
                <div style={{ marginTop: 6 }}>
                  <label>Comment: </label>
                  <input type="text" value={newReviews[album._id]?.comment ?? ""} onChange={e => handleNewReviewChange("comment", e.target.value)} style={{ width: "70%", marginLeft: 8 }} />
                </div>
                <button onClick={handleSubmitNewReview} style={{ marginTop: 6, padding: "6px 12px", borderRadius: 4, border: "none", backgroundColor: "#28a745", color: "#fff", cursor: "pointer" }}>
                  Submit Review
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumWithReviews;