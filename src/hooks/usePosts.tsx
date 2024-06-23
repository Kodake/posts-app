import { useNavigate, useParams } from "react-router-dom";
import useNotifications from "../utils/useNotifications";
import store from "../store/postStore";
import { useEffect } from "react";

const usePosts = () => {
  let nav = useNavigate();
  const [
    posts,
    listar,
    buscarPorId,
    setPost,
    validatePost,
    guardar,
    actualizar,
    limpiar,
  ] = store((state) => [
    state.posts,
    state.listar,
    state.buscarPorId,
    state.setPost,
    state.validatePost,
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
    const { id } = useParams();

    useEffect(() => {
      if (id !== undefined) {
        buscarPorId(parseInt(id));
      }
    }, []);
  };

  const handleInputPost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPost({ [name]: value });
  };

  const handleSavePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validatePost()) {
      return;
    }
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
    if (!validatePost()) {
      return;
    }
    const post = await actualizar();
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

  const handleClearPost = () => {
    limpiar;
  };

  return {
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
