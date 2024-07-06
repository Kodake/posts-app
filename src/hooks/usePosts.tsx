import { useNavigate, useParams } from "react-router-dom";
import useNotifications from "../utils/useNotifications";
import store from "../store/postStore";
import { useEffect } from "react";
import Swal from "sweetalert2";
import validatePost from "../utils/useValidation";

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
    eliminar,
    limpiar,
  ] = store((state) => [
    state.post,
    state.posts,
    state.listar,
    state.buscarPorId,
    state.setPost,
    state.guardar,
    state.actualizar,
    state.eliminar,
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

    if (!validatePost(post)) {
      return;
    }

    const postSaved = await guardar();
    if (postSaved === null) {
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

    if (!validatePost(post)) {
      return;
    }

    const postUpdated = await actualizar(id!);
    if (postUpdated === null) {
      return;
    }
    nav("/posts");
    useNotifications(
      "Guardado",
      "El registro ha sido actualizado satisfactoriamente.",
      "success"
    );
  };

  const handleDeleteConfirmation = async (id: string) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No se puede revertir este cambio",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
      allowOutsideClick: false,
    });

    if (result.isConfirmed) {
      await eliminar(id);
      useNotifications(
        "Eliminado",
        "El registro ha sido eliminado satisfactoriamente.",
        "success"
      );
    }
  };

  const handleClearPost = () => {
    useEffect(() => {
      limpiar();
    }, []);
  };

  return {
    post,
    posts,
    listarPosts,
    buscarPostPorId,
    handleInputPost,
    handleSavePost,
    handleUpdatePost,
    handleDeleteConfirmation,
    handleClearPost,
  };
};

export default usePosts;
