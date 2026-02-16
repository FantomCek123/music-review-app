import axios from "axios";

/* ================= AXIOS INSTANCE ================= */

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export default api;

/* ================= TYPES ================= */

/* ===== USERS ===== */

export interface User {
  _id: string;
  username: string;
  email: string;
  verified: boolean;
}

export interface NewUser {
  username: string;
  email: string;
  password: string;
}

/* ===== ALBUMS ===== */

export interface Album {
  _id: string;
  title: string;
  artist: string;
  year: number;
  genre: string[];
}

export interface NewAlbum {
  title: string;
  artist: string;
  year: number;
  genre: string[];
}

/* ===== REVIEWS ===== */

export interface Review {
  _id: string;
  album: string;
  rating: number;
  comment: string;
  user: {
    _id: string;
    username: string;
  };
}

export interface NewReview {
  album: string;
  rating: number;
  comment: string;
}


/* ================= USERS API ================= */

export const registerUser = async (data: NewUser): Promise<User> => {
  const res = await api.post("/users/register", data);
  return res.data;
};

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/users/login", data);
  return res.data;
};

export const getUsers = async (): Promise<User[]> => {
  const res = await api.get("/users/getAllUsers");
  return res.data;
};

export const getUserById = async (id: string): Promise<User> => {
  const res = await api.get(`/users/getUserWithId/${id}`);
  return res.data;
};

export const deleteUser = async (id: string) => {
  const res = await api.delete(`/users/deliteUserWithId/${id}`);
  return res.data;
};

/* ================= ALBUMS API ================= */

export const getAlbums = async (): Promise<Album[]> => {
  const res = await api.get("/albums/hetAllAlbums");
  return res.data;
};

export const createAlbum = async (data: NewAlbum): Promise<Album> => {
  const res = await api.post("/albums/createAlbum", data);
  return res.data;
};

export const deleteAlbum = async (id: string) => {
  const res = await api.delete(`/albums/deleteAlbumWithId/${id}`);
  return res.data;
};

/* ================= REVIEWS API ================= */

export const getReviews = async (): Promise<Review[]> => {
  const res = await api.get("/reviews/getAllReviews");
  return res.data;
};

export const createReview = async (data: NewReview): Promise<Review> => {
  const res = await api.post("/reviews/createReviw", data);
  return res.data;
};

export const deleteReview = async (id: string) => {
  const res = await api.delete(`/reviews/deleteReviwWithId/${id}`);
  return res.data;
};