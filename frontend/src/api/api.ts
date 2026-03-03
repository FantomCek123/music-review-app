import axios from "axios";

/* ================= AXIOS INSTANCE ================= */

const api = axios.create({
  baseURL: "http://localhost:5000",
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
  user: string;
  imageUrl?: string;
  reviews?: Review[]; 
}

export interface NewAlbum {
  title: string;
  artist: string;
  year: number;
  genre: string[];
  user: string;
  image?: File;
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
  user: string
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
  console.log(res)
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
  const res = await api.get("/albums/getAllAlbums");
  return res.data;
};

export const createAlbum = async (data: NewAlbum): Promise<Album> => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("artist", data.artist);
  formData.append("year", data.year.toString());
  formData.append("user", data.user);


  formData.append("genre", JSON.stringify(data.genre));

  if (data.image) {
    formData.append("image", data.image);
  }

  const res = await api.post("/albums/createAlbum", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

export const deleteAlbum = async (id: string) => {
  const res = await api.delete(`/albums/deleteAlbumWithId/${id}`);
  return res.data;
};

export const getAlbumById = async (id: string): Promise<Album> => {
  const res = await api.get(`/albums/getAlbumById/${id}`);
  return res.data;
};


export const searchAlbumsByName = async (name: string): Promise<Album[]> => {
  const res = await api.get(`/albums/getAlbumByName`, { params: { name } });
  return res.data;
};


export const searchAlbumsByArtist = async (artist: string): Promise<Album[]> => {
  const res = await api.get(`/albums/getByArtist`, { params: { artist } });
  return res.data;
};


export const updateAlbumArtistService = async (id: string, artist: string): Promise<Album> => {
  const res = await api.patch(`/albums/updateArtist/${id}`, { artist });
  return res.data;
};


export const updateAlbumYearService = async (id: string, year: number): Promise<Album> => {
  const res = await api.patch(`/albums/updateYear/${id}`, { year });
  return res.data;
};

export const updateAlbumGenreService = async (id: string, genre: string[]): Promise<Album> => {
  const res = await api.patch(`/albums/updateGenre/${id}`, { genre });
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

export const getReviewById = async (id: string): Promise<Review> => {
  const res = await api.get(`/reviews/getReviewWithId/${id}`);
  return res.data;
};

export const getAlbumsByUser = async (userId: string): Promise<Album[]> => {
  const res = await api.get(`/albums/getAlbumsByUser/${userId}`);
  return res.data;
};

export const updateReview = async (
  id: string,
  data: { rating: number; comment: string }
): Promise<Review> => {
  const res = await api.patch(`/reviews/updateReview/${id}`, data);
  return res.data;
};