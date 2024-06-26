import { Link } from "react-router-dom";
import usePosts from "../../hooks/usePosts";

const List = () => {
  const { listarPosts, handleDeleteConfirmation, posts } = usePosts();

  listarPosts();

  return (
    <>
      <div className="container">
        <div className="text-center m-3">
          <h3>Posts</h3>
        </div>
      </div>
      <div className="container">
        <table className="table table-hover table-striped table-bordered align-middle">
          <thead className="table-dark text-center">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Title</th>
              <th scope="col">Content</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {posts.length > 0 ? (
              posts.map((post: any) => (
                <tr key={post._id}>
                  <th scope="row">{post._id}</th>
                  <td>{post.title}</td>
                  <td>{post.content}</td>
                  <td className="text-center">
                    <Link
                      to={`/posts/edit/${post._id}`}
                      className="btn btn-warning btn-sm me-sm-3"
                    >
                      <svg
                        fillRule="evenodd"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                        <path
                          fillRule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                        ></path>
                      </svg>
                    </Link>
                    <button
                      onClick={() => handleDeleteConfirmation(post._id)}
                      className="btn btn-danger btn-sm"
                    >
                      <svg
                        fillRule="evenodd"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-trash-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center">
                  {"No hay datos para mostrar"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default List;
