import { useNavigate, useParams } from "react-router-dom";
import useNotifications from "../utils/useNotifications";
import store from "../store/postStore";
import { useEffect } from "react";

const usePosts = () => {
  const { id } = useParams<string>();
  let nav = useNavigate();
  const [
    post,
    posts,
    listar,
    buscarPorId,
    setPost,
    guardar,
    actualizar,
    limpiar,
  ] = store((state) => [
    state.post,
    state.posts,
    state.listar,
    state.buscarPorId,
    state.setPost,
    state.guardar,
    state.actualizar,
    state.limpiar,
  ]);

  const listarPosts = () => {
    useEffect(() => {
      listar();
    }, []);
  };

  const buscarPostPorId = () => {
    useEffect(() => {
      if (id !== undefined) {
        buscarPorId(id);
      }
    }, []);
  };

  const handleInputPost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPost({ [name]: value });
  };

  const handleSavePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const post = await guardar();
    if (post === null) {
      return;
    }
    nav("/posts");
    useNotifications(
      "Guardado",
      "El registro ha sido guardado satisfactoriamente.",
      "success"
    );
  };

  const handleUpdatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const post = await actualizar(id!);
    if (post === null) {
      return;
    }
    nav("/posts");
    useNotifications(
      "Guardado",
      "El registro ha sido actualizado satisfactoriamente.",
      "success"
    );
  };

  const handleClearPost = () => {
    limpiar;
  };

  return {
    post,
    posts,
    listarPosts,
    buscarPostPorId,
    handleInputPost,
    handleSavePost,
    handleUpdatePost,
    handleClearPost,
  };
};

export default usePosts;
