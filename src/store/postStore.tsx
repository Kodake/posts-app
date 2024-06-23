import { create } from "zustand";
import axios from "axios";
import { VALIDATION_STRINGS } from "../messages/appMessages";
import useNotifications from "../utils/useNotifications";
import { CreatePostDTO, PostDTO } from "../classes/appClasses";

const API_URL = import.meta.env.VITE_API_URL;

interface PostStoreState {
  post: CreatePostDTO | PostDTO;
  posts: PostDTO[];
  setPost: (partialPost: Partial<CreatePostDTO | PostDTO>) => void;
  setPosts: (posts: PostDTO[]) => void;
  limpiar: () => void;
  listar: () => Promise<void>;
  buscarPorId: (id: string) => Promise<void>;
  guardar: () => Promise<void>;
  actualizar: (id: string) => Promise<void>;
}

const postInicial: CreatePostDTO = {
  title: "",
  content: "",
};

const usePostStore = create<PostStoreState>((set) => ({
  post: { ...postInicial },
  posts: ([] = []),
  setPost: (partialPost) =>
    set((state) => ({
      post: { ...state.post, ...partialPost },
    })),
  setPosts: (posts: PostDTO[]) => set({ posts }),
  limpiar: () => set({ post: postInicial }),

  listar: async () => {
    const url = `${API_URL}`;
    try {
      const resp = await axios.get(url);
      const data = resp.data;
      set({ posts: data });
    } catch (error) {
      console.error(error);
    }
  },

  buscarPorId: async (id: string) => {
    const url = `${API_URL}/${id}`;
    try {
      const resp = await axios.get(url);
      const data = resp.data;
      set({ post: data });
    } catch (error) {
      console.error(error);
    }
  },

  guardar: async () => {
    const url = `${API_URL}`;
    try {
      await axios.post(url, usePostStore.getState().post);
      usePostStore.getState().limpiar();
      await usePostStore.getState().listar();
    } catch (error: any) {
      useNotifications(
        VALIDATION_STRINGS.validationError,
        error.response.data,
        "error"
      );
      throw error;
    }
  },

  actualizar: async (id: string) => {
    const url = `${API_URL}/${id}`;
    try {
      await axios.put(url, usePostStore.getState().post);
      usePostStore.getState().limpiar();
      await usePostStore.getState().listar();
    } catch (error: any) {
      useNotifications(
        VALIDATION_STRINGS.validationError,
        error.response.data,
        "error"
      );
      throw error;
    }
  },
}));

export default usePostStore;
