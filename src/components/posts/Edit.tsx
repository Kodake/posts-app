import { Link } from "react-router-dom";
import usePosts from "../../hooks/usePosts";

const Edit = () => {
  const {
    post,
    buscarPostPorId,
    handleUpdatePost,
    handleInputPost,
    handleClearPost,
  } = usePosts();

  buscarPostPorId();

  return (
    <div className="container">
      <div className="text-center m-3">
        <h3>Update Post</h3>
      </div>
      <form onSubmit={handleUpdatePost}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            {"Title"}
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            autoComplete="off"
            onChange={handleInputPost}
            value={post.title || ""}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            {"Content"}
          </label>
          <input
            type="text"
            className="form-control"
            id="content"
            name="content"
            autoComplete="off"
            onChange={handleInputPost}
            value={post.content || ""}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-success btn-sm me-sm-3">
            Update
          </button>
          <Link
            to={"/"}
            className="btn btn-danger btn-sm"
            onClick={handleClearPost}
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Edit;
