import { Link } from "react-router-dom";
import usePosts from "../../hooks/usePosts";

const Add = () => {
  const { handleSavePost, handleInputPost, handleClearPost } = usePosts();

  handleClearPost();

  return (
    <div className="container">
      <div className="text-center m-3">
        <h3>Add Post</h3>
      </div>
      <form onSubmit={handleSavePost}>
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
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-success btn-sm me-sm-3">
            Add
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

export default Add;
