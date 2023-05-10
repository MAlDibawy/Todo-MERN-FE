import React from "react";
import { useEffect, useState } from "react";
import TodoItem from "../components/todoItem/TodoItem";
import TodoImage from "/cfd969583ee9557cb6d7ac303d0d2a80.svg";
import TodosForm from "./../components/TodosForm";
import axios from "axios";

export default function Dashboard() {
  const [todos, setTodos] = useState([]);

  const [hideDone, setHideDone] = useState(false);

  const addTodo = async (e) => {
    e.preventDefault();
    if (inputText.trim() !== "") {
      try {
        const res = await axios.post(`/api/addItem`, {
          item: inputText,
        });
        console.log(res.data);
        setTodos((prevState) => [...prevState, res.data]);
      } catch (error) {
        console.log(error);
      }
      setInputText("");
    }
  };

  const getAllTodos = async () => {
    try {
      const res = await axios.get(`/api/getAllTodos`);
      setTodos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const editTodo = async (todoID, newValue) => {
    if (newValue.trim() !== "") {
      try {
        const res = await axios.patch(`/api/updateTodo/${todoID}`, {
          item: newValue,
        });
        setTodos((prevState) => {
          const newTodos = prevState.map((todo) => {
            if (todo._id === todoID && todo.value !== newValue) {
              return { ...todo, value: newValue };
            } else {
              return todo;
            }
          });
          return newTodos;
        });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const changeDone = async (todoId, doneValue) => {
    setTodos((prevState) => {
      const newTodos = prevState.map((todo) => {
        if (todo._id === todoId) {
          return { ...todo, done: doneValue };
        } else {
          return todo;
        }
      });
      return newTodos;
    });

    try {
      const res = await axios.patch(`/api/updateTodo/${todoId}`, {
        done: doneValue,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const removeTodo = async (todoId) => {
    const confirm = window.confirm("Are you sure you want delete this todo?");
    if (!confirm) return;
    try {
      const res = await axios.delete(`/api/deleteTodo/${todoId}`);
      const newTodos = todos.filter((todo) => todo._id !== todoId);
      setTodos(newTodos);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleShowDone = () => {
    setHideDone((prevState) => !prevState);
  };

  useEffect(() => {
    // getAllTodos();
  }, []);

  return (
    <>
      <TodosForm />
      <div className=" text-center mb-2">
        <span onClick={toggleShowDone} role="button">
          {hideDone ? "Show completed todos" : "Hide completed todos"}
        </span>
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
                changeDone={changeDone}
                removeTodo={removeTodo}
                editTodo={editTodo}
              />
            ))
        )}
      </div>
    </>
  );
}
