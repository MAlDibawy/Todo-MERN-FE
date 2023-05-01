import { useEffect, useRef, useState } from "react";
import "./App.css";
import TodoItem from "./components/todoItem/TodoItem";
import TodoImage from "/cfd969583ee9557cb6d7ac303d0d2a80.svg";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "./theme";
import { Switch } from "@mui/material";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");
  const [hideDone, setHideDone] = useState(false);
  const inputRef = useRef(null);
  const [theme, setTheme] = useState("light");
  const isDarkTheme = theme === "dark";
  const toggleTheme = () => setTheme(isDarkTheme ? "light" : "dark");

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
    inputRef.current.focus();
    getAllTodos();
  }, []);

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <GlobalStyles />
      <div className="App container-fluid m-auto">
        <label htmlFor="">
          switch to {isDarkTheme ? "light" : "dark"} theme
        </label>

        <Switch onChange={toggleTheme} />

        <h2 className=" mb-4 text-center">Todo List</h2>

        <form onSubmit={addTodo}>
          <div className="d-flex  justify-content-center py-4">
            <input
              onChange={(e) => {
                setInputText(e.target.value);
              }}
              type="text"
              placeholder="Add a todo..."
              className="inpValue form-control me-2"
              ref={inputRef}
              value={inputText}
              style={{ maxWidth: "75%" }}
            />
            <button className="btn btn-primary  " type="submit">
              <span className="icon">
                <i className="fa-solid fa-check d-inline p-2"></i>
              </span>
            </button>
          </div>
        </form>
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
      </div>
    </ThemeProvider>
  );
}

export default App;
