import React, { useRef, useState } from "react";

export default function TodoItem({ todo, changeDone, removeTodo, editTodo }) {
  const { _id, item, done } = todo;
  const [editValue, setEditValue] = useState(item);
  const [isDone, setIsDone] = useState(done);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editValue.trim() !== "") {
      const updateObj = {
        _id,
        editValue,
      };
      editTodo(updateObj);
    } else {
      setEditValue(item);
    }
    inputRef.current.blur();
  };

  const handleCheck = (_id, doneValue) => {
    const updateObj = {
      _id,
      editValue: doneValue,
    };
    changeDone(updateObj);
    setIsDone(doneValue);
  };

  return (
    <>

      <div className=" col-8 m-auto p-2">
        <div className="todoItem d-flex justify-content-between rounded border-0 align-items-center p-2">
          <div
            onClick={() => handleCheck(_id, !done)}
            className="done d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: isDone ? "#0B5ED7" : "white",
            }}
          >
            <i className="fa-solid fa-check d-inline p-2 text-white"></i>
          </div>
          <div>
            <i
              onClick={() => removeTodo(_id)}
              className="deleteIcon fa-solid fa-trash-can p-2"
              role="button"
            ></i>
          </div>
          <div className="todoInput flex-grow-1">
            <form onSubmit={(e) => handleSubmit(e)}>
              <input
                ref={inputRef}
                type="text"
                className="form-control border-0 py-2 m-0"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
