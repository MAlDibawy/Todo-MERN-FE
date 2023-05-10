import React, { useEffect, useRef, useState } from "react";

export default function TodosForm({ addTodo }) {
  const [inputText, setInputText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
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
  );
}
