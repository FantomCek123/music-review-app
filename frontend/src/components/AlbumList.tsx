import React, { useState, useEffect } from "react";
import * as api from "../api/api";

interface AlbumListProps {
  albums: api.Album[];
}

const AlbumList = ({ albums }: AlbumListProps) => {
  // stanje za review polja, edit mode i reviewId
  const [reviewsState, setReviewsState] = useState<
    Record<
      string,
      { rating: number; comment: string; reviewId?: string; isEditing?: boolean }
    >
  >({});

  // stanje za formu novog review-a
  const [showReviewForm, setShowReviewForm] = useState<Record<string, boolean>>({});
  const [newReviews, setNewReviews] = useState<
    Record<string, { rating: number; comment: string }>
  >({});

  // inicijalizacija reviewsState iz props
  useEffect(() => {
    albums.forEach(album => {
      if (album.reviews && album.reviews.length > 0) {
        const userStr = localStorage.getItem("user");
        const user = userStr ? JSON.parse(userStr) : null;

        // ako je user dao review, ubaci ga u state
        const userReview = user
          ? album.reviews.find(r => r.user._id === user._id)
          : null;

        if (userReview) {
          setReviewsState(prev => ({
            ...prev,
            [album._id]: {
              rating: userReview.rating,
              comment: userReview.comment,
              reviewId: userReview._id,
              isEditing: false,
            },
          }));
        } else if (!reviewsState[album._id]) {
          // inicijalizacija praznog za novi review
          setReviewsState(prev => ({
            ...prev,
            [album._id]: {
              rating: 1,
              comment: "",
            },
          }));
        }
      }
    });
  }, [albums]);

  // --- funkcije za postojeći review ---
  const handleEditClick = (albumId: string) => {
    setReviewsState(prev => ({
      ...prev,
      [albumId]: { ...prev[albumId], isEditing: true },
    }));
  };

  const handleInputChange = (
    albumId: string,
    field: "rating" | "comment",
    value: string | number
  ) => {
    setReviewsState(prev => ({
      ...prev,
      [albumId]: { ...prev[albumId], [field]: value },
    }));
  };

  const handleSaveReview = async (albumId: string) => {
    const reviewData = reviewsState[albumId];
    if (!reviewData || !reviewData.reviewId) return;

    if (reviewData.rating < 1 || reviewData.rating > 10) {
      alert("Rating must be between 1 and 10");
      return;
    }

    try {
      await api.updateReview(reviewData.reviewId, {
        rating: reviewData.rating,
        comment: reviewData.comment,
      });

      setReviewsState(prev => ({
        ...prev,
        [albumId]: { ...prev[albumId], isEditing: false },
      }));

      alert("Review updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update review");
    }
  };

  const handleDeleteReview = async (albumId: string) => {
    const reviewData = reviewsState[albumId];
    if (!reviewData || !reviewData.reviewId) return;

    try {
      await api.deleteReview(reviewData.reviewId);

      setReviewsState(prev => ({
        ...prev,
        [albumId]: {
          rating: 1,
          comment: "",
          reviewId: undefined,
          isEditing: false,
        },
      }));

      alert("Review deleted!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete review");
    }
  };

  // --- funkcije za novi review ---
  const handleToggleForm = (albumId: string) => {
    setShowReviewForm(prev => ({
      ...prev,
      [albumId]: !prev[albumId],
    }));

    setNewReviews(prev => ({
      ...prev,
      [albumId]: { rating: 1, comment: "" },
    }));
  };

  const handleNewReviewChange = (
    albumId: string,
    field: "rating" | "comment",
    value: string | number
  ) => {
    setNewReviews(prev => ({
      ...prev,
      [albumId]: { ...prev[albumId], [field]: value },
    }));
  };

  const handleSubmitNewReview = async (albumId: string) => {
    const reviewData = newReviews[albumId];
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
        album: albumId,
        rating: reviewData.rating,
        comment: reviewData.comment,
        user: user._id,
      });

      // postavi ga u reviewsState da može odmah da se edituje
      setReviewsState(prev => ({
        ...prev,
        [albumId]: {
          rating: newReview.rating,
          comment: newReview.comment,
          reviewId: newReview._id,
          isEditing: false,
        },
      }));

      setShowReviewForm(prev => ({
        ...prev,
        [albumId]: false,
      }));

      alert("Review submitted!");
    } catch (err) {
      console.error(err);
      alert("Failed to submit review");
    }
  };

  return (
    <div>
      {albums.map(album => (
        <div
          key={album._id}
          style={{
            border: "1px solid #444",
            padding: 10,
            marginBottom: 8,
            borderRadius: 6,
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
          }}
        >
          {/* Slika albuma */}
          {album.imageUrl && (
            <img
              src={`http://localhost:3001/uploads/${album.imageUrl}`}
              alt={album.title}
              style={{
                width: 120,
                height: 120,
                objectFit: "cover",
                borderRadius: 4,
              }}
            />
          )}

          {/* Tekstualni deo albuma */}
          <div style={{ flex: 1 }}>
            <h3>{album.title}</h3>
            <p>Artist: {album.artist}</p>
            <p>Year: {album.year}</p>
            <p>Genre: {album.genre.join(", ")}</p>

            {/* reviews prikaz */}
            {album.reviews && album.reviews.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <strong>Reviews:</strong>

                {album.reviews.map(review => {
                  const state = reviewsState[album._id];
                  const isUserReview = state?.reviewId === review._id;

                  if (!isUserReview) {
                    return (
                      <div
                        key={review._id}
                        style={{
                          borderTop: "1px solid #555",
                          marginTop: 6,
                          paddingTop: 6,
                        }}
                      >
                        <div>Rating: {review.rating}/10</div>
                        <div>{review.comment}</div>
                        <div style={{ opacity: 0.7 }}>
                          By: {review.user?.username || "Unknown"}
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={review._id}
                        style={{
                          borderTop: "1px solid #555",
                          marginTop: 6,
                          paddingTop: 6,
                        }}
                      >
                        {state.isEditing ? (
                          <>
                            <input
                              type="number"
                              min={1}
                              max={10}
                              value={state.rating}
                              onChange={e =>
                                handleInputChange(
                                  album._id,
                                  "rating",
                                  Number(e.target.value)
                                )
                              }
                              style={{ width: 50 }}
                            />
                            <input
                              type="text"
                              value={state.comment}
                              onChange={e =>
                                handleInputChange(
                                  album._id,
                                  "comment",
                                  e.target.value
                                )
                              }
                              style={{ marginLeft: 8 }}
                            />
                            <button onClick={() => handleSaveReview(album._id)}>
                              Save
                            </button>
                            <button onClick={() => handleDeleteReview(album._id)}>
                              Delete
                            </button>
                          </>
                        ) : (
                          <>
                            <div>Rating: {state.rating}/10</div>
                            <div>{state.comment}</div>
                            <div style={{ opacity: 0.7 }}>
                              By: {review.user?.username || "Unknown"}
                            </div>
                            <button onClick={() => handleEditClick(album._id)}>
                              Edit
                            </button>
                          </>
                        )}
                      </div>
                    );
                  }
                })}
              </div>
            )}

            {/* forma za novi review */}
            {!reviewsState[album._id]?.reviewId && (
              <div style={{ marginTop: 12 }}>
                <button
                  onClick={() => handleToggleForm(album._id)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 4,
                    border: "none",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  {showReviewForm[album._id] ? "Cancel" : "Leave a review"}
                </button>

                {showReviewForm[album._id] && (
                  <div style={{ marginTop: 8 }}>
                    <div>
                      <label>Rating (1-10): </label>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={newReviews[album._id]?.rating ?? 1}
                        onChange={e =>
                          handleNewReviewChange(
                            album._id,
                            "rating",
                            Number(e.target.value)
                          )
                        }
                        style={{ width: 60, marginLeft: 8 }}
                      />
                    </div>

                    <div style={{ marginTop: 6 }}>
                      <label>Comment: </label>
                      <input
                        type="text"
                        value={newReviews[album._id]?.comment ?? ""}
                        onChange={e =>
                          handleNewReviewChange(
                            album._id,
                            "comment",
                            e.target.value
                          )
                        }
                        style={{ width: "70%", marginLeft: 8 }}
                      />
                    </div>

                    <button
                      onClick={() => handleSubmitNewReview(album._id)}
                      style={{
                        marginTop: 6,
                        padding: "6px 12px",
                        borderRadius: 4,
                        border: "none",
                        backgroundColor: "#28a745",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      Submit Review
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlbumList;