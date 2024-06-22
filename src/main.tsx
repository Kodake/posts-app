import "sweetalert2/src/sweetalert2.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import PostsList from "./components/posts/List.tsx";
import PostsAdd from "./components/posts/Add.tsx";
import PostsEdit from "./components/posts/Edit.tsx";
import Loading from "./components/Loading.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Loading />
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/posts" element={<PostsList />}></Route>
        <Route path="/posts/agregar" element={<PostsAdd />}></Route>
        <Route path="/posts/editar/:id" element={<PostsEdit />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
