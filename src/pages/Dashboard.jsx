import React from "react";
import { useEffect, useState } from "react";
import TodoItem from "../components/todoItem/TodoItem";
import TodoImage from "/cfd969583ee9557cb6d7ac303d0d2a80.svg";
import TodosForm from "./../components/TodosForm/TodosForm";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTodos, reset } from "../features/Todos/TodosSlice";
import LoadingScreen from "./../components/LoadingScreen/LoadingScreen";
import { deleteTodo, updateTodo } from "./../features/Todos/TodosSlice";

export default function Dashboard() {
  // const [todos, setTodos] = useState([]);

  const [hideDone, setHideDone] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { todos, isLoading, isError, message } = useSelector(
    (state) => state.todos
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      // console.log(message);
    }

    if (!user) {
      navigate("/login");
    } else {
      getAllTodos();
    }
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const getAllTodos = async () => {
    dispatch(getTodos());
  };

  const editTodo = async (updateObj) => {
    dispatch(updateTodo(updateObj));
  };

  const removeTodo = async (id) => {
    dispatch(deleteTodo(id));
  };
  const toggleShowDone = () => {
    setHideDone((prevState) => !prevState);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <h2 className="text-center">Welcome {user && user.name}</h2>
      <TodosForm />
      <div className=" text-center mb-2">
        {todos.length > 0 ? (
          <span onClick={toggleShowDone} role="button">
            {hideDone ? "Show completed todos" : "Hide completed todos"}
          </span>
        ) : (
          <h4 className="mb-3">Start adding your todos now </h4>
        )}
      </div>
      <div className="d-flex flex-column-reverse">
        {todos.length == 0 ? (
          <div className="text-center">
            <img
              className="todoImg w-50"
              src={TodoImage}
              alt=""
              style={{ maxHeight: "200px" }}
            />
          </div>
        ) : (
          todos
            .filter((todo) => !hideDone || !todo.done)
            .map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                removeTodo={removeTodo}
                editTodo={editTodo}
              />
            ))
        )}
      </div>
    </>
  );
}
