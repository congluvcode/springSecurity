import { useEffect, useState } from "react";
import {
  completedTodos,
  deleteTodos,
  getAllTodos,
  inCompletedTodos,
} from "../services/TodoService";
import { useNavigate } from "react-router-dom";
import { isAdminUser } from "../services/AuthService";

const ListTodoComponent = () => {
  const [todos, setTodo] = useState([]);

  const navigate = useNavigate();

  const isAdmin = isAdminUser();

  useEffect(() => {
    ListTodos();
  }, []);

  function ListTodos() {
    getAllTodos()
      .then((response) => {
        setTodo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function addNewTodo() {
    navigate("/add-todo");
  }

  function updateTodo(id) {
    console.log(id);
    navigate(`/update-todo/${id}`);
  }

  function removeTodo(id) {
    deleteTodos(id)
      .then(() => {
        ListTodos();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function markCompletedTodo(id) {
    completedTodos(id)
      .then(() => {
        ListTodos();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function markInCompletedTodo(id) {
    inCompletedTodos(id)
      .then(() => {
        ListTodos();
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <div className="container">
      <h2 className="text-center">List Todo</h2>
      {isAdmin && (
        <button className="btn btn-primary" onClick={addNewTodo}>
          Add new todo
        </button>
      )}
      <div className="mt-2">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Todo Title</th>
              <th>Todo Description</th>
              <th>Todo Completed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>{todo.completed ? "YES" : "NO"}</td>
                <td>
                  {isAdmin && (
                    <button
                      className="btn btn-info"
                      onClick={() => updateTodo(todo.id)}
                    >
                      Update
                    </button>
                  )}
                  {isAdmin && (
                    <button
                      className="btn btn-danger"
                      style={{ marginLeft: "10px" }}
                      onClick={() => removeTodo(todo.id)}
                    >
                      delete
                    </button>
                  )}
                  {todo.completed ? (
                    <button
                      className="btn btn-warning"
                      style={{ marginLeft: "10px" }}
                      onClick={() => markInCompletedTodo(todo.id)}
                    >
                      Uncomplete
                    </button>
                  ) : (
                    <button
                      className="btn btn-success"
                      style={{ marginLeft: "10px" }}
                      onClick={() => markCompletedTodo(todo.id)}
                    >
                      Complete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListTodoComponent;
