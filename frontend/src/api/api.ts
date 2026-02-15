// import api from "./axiosInstance"; // zakomentiraj ovo privremeno

export interface Album {
  _id: string;
  title: string;
  artist: string;
  year: number;
  genre: string[];
}

export interface Review {
  _id: string;
  album: string;
  comment: string;
}

// ALBUMI
export const getAlbums = async (): Promise<Album[]> => {
  // return await api.get("/albums").then(r => r.data);

  // privremeno fake data
  return [
    { _id: "1", title: "Album 1", artist: "Artist 1", year: 2023, genre: ["rock"] },
    { _id: "2", title: "Album 2", artist: "Artist 2", year: 2022, genre: ["pop"] },
  ];
};

export const createAlbum = async (data: any) => {
  // return await api.post("/albums", data).then(r => r.data);
  console.log("Fake create album", data);
  return data;
};

export const deleteAlbum = async (id: string) => {
  // return await api.delete(`/albums/${id}`).then(r => r.data);
  console.log("Fake delete album", id);
  return id;
};

// REVIEWS
export const getReviews = async (): Promise<Review[]> => {
  // return await api.get("/reviews").then(r => r.data);
  return [
    { _id: "r1", album: "1", comment: "Great album!" },
    { _id: "r2", album: "2", comment: "Not bad" },
  ];
};

export const createReview = async (data: any) => {
  // return await api.post("/reviews", data).then(r => r.data);
  console.log("Fake create review", data);
  return data;
};

export const deleteReview = async (id: string) => {
  // return await api.delete(`/reviews/${id}`).then(r => r.data);
  console.log("Fake delete review", id);
  return id;
};
