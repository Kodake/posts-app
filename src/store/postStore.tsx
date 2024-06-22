import create from "zustand";
import axios from "axios";
import * as yup from "yup";
import { VALIDATION_STRINGS } from "../messages/appMessages";
import useNotifications from "../utils/useNotifications";
import { renderToString } from "react-dom/server";

const API_URL = import.meta.env.VITE_API_URL;

interface PostDTO {
  idPost: number;
  title: string;
  content: string;
}

interface PostStoreState {
  post: PostDTO;
  posts: PostDTO[];
  setPost: (post: PostDTO) => void;
  setPosts: (posts: PostDTO[]) => void;
  limpiar: () => void;
  validatePost: () => boolean;
  listar: () => Promise<void>;
  buscarPorId: (id: number) => Promise<void>;
  guardar: () => Promise<void>;
  actualizar: () => Promise<void>;
}

const postInicial: PostDTO = {
  idPost: 0,
  title: "",
  content: "",
};

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .required(VALIDATION_STRINGS.titleRequired)
    .min(2, VALIDATION_STRINGS.titleMinLength)
    .max(25, VALIDATION_STRINGS.titleMaxLength),
  content: yup
    .string()
    .required(VALIDATION_STRINGS.contentRequired)
    .min(2, VALIDATION_STRINGS.titleMinLength)
    .min(50, VALIDATION_STRINGS.contentMinLength),
});

const usePostStore = create<PostStoreState>((set) => ({
  post: { ...postInicial },
  posts: [],
  setPost: (post: PostDTO) => set({ post }),
  setPosts: (posts: PostDTO[]) => set({ posts }),
  limpiar: () => set({ post: postInicial }),

  validatePost: () => {
    try {
      validationSchema.validateSync(usePostStore.getState().post, {
        abortEarly: false,
      });
      return true;
    } catch (error) {
      const validationError = error as yup.ValidationError;
      const errorMessages = validationError.inner.map((e) => (
        <li key={e.path} className="border-0 text-start">
          {e.message}
        </li>
      ));
      const errorMessage = renderToString(<ul>{errorMessages}</ul>);
      useNotifications(
        VALIDATION_STRINGS.validationError,
        errorMessage,
        "error"
      );
      return false;
    }
  },

  listar: async () => {
    const url = `${API_URL}`;
    try {
      const resp = await axios.get(url);
      const data = resp.data;
      set({ post: data });
    } catch (error) {
      console.error(error);
    }
  },

  buscarPorId: async (id: number) => {
    const url = `${API_URL}/posts/${id}`;
    try {
      const resp = await axios.get(url);
      const data = resp.data;
      set({ post: data });
    } catch (error) {
      console.error(error);
    }
  },

  guardar: async () => {
    const url = `${API_URL}/posts`;
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

  actualizar: async () => {
    const url = `${API_URL}/posts/${usePostStore.getState().post.idPost}`;
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
