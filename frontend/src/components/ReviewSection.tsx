import { useEffect, useState } from "react";
import { getReviews, createReview, deleteReview, Review } from "../api/api";

interface Props {
  albumId: string;
}

const ReviewSection = ({ albumId }: Props) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [text, setText] = useState("");

  const load = async () => {
    const data = await getReviews();
    setReviews(data.filter(r => r.album === albumId));
  };

  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    await createReview({
      album: albumId,
      user: "dummyUserId",
      comment: text,
    });

    setText("");
    load();
  };

  return (
    <div style={{ marginLeft: 20 }}>
      <h4>Reviews</h4>

      {reviews.map(r => (
        <div key={r._id}>
          {r.comment}
          <button onClick={() => deleteReview(r._id).then(load)}>X</button>
        </div>
      ))}

      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={add}>Add</button>
    </div>
  );
};

export default ReviewSection;
