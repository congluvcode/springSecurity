import { useEffect, useState } from "react";
import { getTodos, saveTodos, updateTodos } from "../services/TodoService";
import { useNavigate, useParams } from "react-router-dom";

const TodoComponent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const { id } = useParams();

  const natigate = useNavigate();
  function saveOrUpdateTodo(e) {
    e.preventDefault();
    const todo = { title, description, completed };
    // console.log(todo);
    if (id) {
      updateTodos(id, todo)
        .then(() => {
          natigate("/todos");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      saveTodos(todo)
        .then((response) => {
          console.log(response.data);
          natigate("/todos");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Todo</h2>;
    } else {
      return <h2 className="text-center">Add Todo</h2>;
    }
  }

  useEffect(() => {
    if (id) {
      getTodos(id)
        .then((response) => {
          setTitle(response.data.title);
          setDescription(response.data.description);
          setCompleted(response.data.completed);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);
  return (
    <div className="container">
      <div className="row">
        <div className="card col-md-6 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form action="">
              <div className="form-group mb-2">
                <label className="form-label">Todo Title:</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Todo Title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Todo Description:</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Todo Description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Todo Completed:</label>
                <select
                  className="form-control"
                  value={completed}
                  onChange={(e) => setCompleted(e.target.value)}
                >
                  <option value={false}>NO</option>
                  <option value={true}>YES</option>
                </select>
              </div>
              <button
                className="btn btn-success"
                onClick={(e) => saveOrUpdateTodo(e)}
              >
                Save Todo
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoComponent;
