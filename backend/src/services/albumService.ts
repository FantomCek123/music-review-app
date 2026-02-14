import Album, { IAlbum, INewAlbum } from "../models/album";

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
  return await Album.findByIdAndDelete(id);
};

export const updateAlbumService = async (id: string, data: Partial<any>) => {
  return await Album.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};
