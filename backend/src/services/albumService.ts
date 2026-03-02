import Album, { IAlbum, INewAlbum } from "../models/album";
import Review from "../models/review";

export const createAlbumService = async (data: INewAlbum): Promise<IAlbum> => {
  return await Album.create(data);
};

export const getAlbumsService = async (): Promise<IAlbum[]> => {
  return await Album.find();
};

export const getAlbumByIdService = async (id: string): Promise<IAlbum | null> => {
  return await Album.findById(id);
};

export const deleteAlbumService = async (id: string): Promise<IAlbum | null> => {
  await Review.deleteMany({ album: id });
  return await Album.findByIdAndDelete(id);
};
export const updateAlbumService = async (id: string, data: Partial<any>) => {
  return await Album.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const searchAlbumsByNameService = async (name: string) => {
  const albums = await Album.find({
    title: { $regex: name, $options: "i" }
  }).lean();

  if (!albums.length) return [];

  const albumIds = albums.map(a => a._id);

  const reviews = await Review.find({ album: { $in: albumIds } })
    .populate("user", "username email")
    .lean();

  return albums.map(album => ({
    ...album,
    reviews: reviews.filter(r => r.album.toString() === album._id.toString())
  }));
};

export const searchAlbumsByArtistService = async (artist: string) => {
  const albums = await Album.find({
    artist: { $regex: artist, $options: "i" }
  }).lean();

  if (!albums.length) return [];

  const albumIds = albums.map(a => a._id);

  const reviews = await Review.find({ album: { $in: albumIds } })
    .populate("user", "username email")
    .lean();

  return albums.map(album => ({
    ...album,
    reviews: reviews.filter(r => r.album.toString() === album._id.toString())
  }));
};

export const getAlbumsByUserService = async (userId: string): Promise<IAlbum[]> => {
  return await Album.find({ user: userId });
};


export const updateAlbumArtistService = async (id: string, newArtist: string) => {
  return await updateAlbumService(id, { artist: newArtist });
};


export const updateAlbumYearService = async (id: string, newYear: number) => {
  return await updateAlbumService(id, { year: newYear });
};


export const updateAlbumGenreService = async (id: string, newGenres: string[]) => {
  return await updateAlbumService(id, { genre: newGenres });
};

export const getAlbumWithReviewsService = async (id: string) => {
  const album = await Album.findById(id).lean();

  if (!album) return null;

  const reviews = await Review.find({ album: id })
    .populate("user", "username email")
    .lean();

  return {
    ...album,
    reviews,
  };
};
