import { useEffect, useState } from "react";
import { createReview, deleteReview, Review } from "../api/api";
//getReviewsByAlbum
interface Props {
  albumId: string;
}

const ReviewSection = ({ albumId }: Props) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  const load = async () => {
    //const data = await getReviewsByAlbum(albumId);
    //setReviews(data);
  };

  useEffect(() => {
    load();
  }, [albumId]);

  const add = async () => {
    if (!text.trim()) return;

    // await createReview({
    //   album: albumId,
    //   rating,
    //   comment: text,
    // });

    setText("");
    setRating(5);
    load();
  };

  return (
    <div style={{ marginLeft: 20 }}>
      <h4>Reviews</h4>

      {reviews.map(r => (
        <div key={r._id}>
          <b>{r.user.username}</b> ⭐ {r.rating}/10
          <div>{r.comment}</div>
          <button onClick={() => deleteReview(r._id).then(load)}>X</button>
        </div>
      ))}

      <div style={{ marginTop: 10 }}>
        <input
          type="number"
          min={1}
          max={10}
          value={rating}
          onChange={e => setRating(Number(e.target.value))}
        />

        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Write review..."
        />

        <button onClick={add}>Add</button>
      </div>
    </div>
  );
};

export default ReviewSection;
