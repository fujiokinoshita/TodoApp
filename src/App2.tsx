import { useState, useRef } from "react";

import "./App.css";

// import { Todo } from "./Todo.tsx";

const Todo = (props) => {
  const handleDeleteClick = () => {
    props.onDeleteClick(props.todo.id);
  };

  const handleCheckboxChange = () => {
    props.onCheckboxChange(props.todo.id);
  };

  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={props.todo.isCompleted}
          onChange={handleCheckboxChange}
        />
        <span>{props.todo.title}</span>
      </label>
      <button onClick={handleDeleteClick}>Del</button>
    </li>
  );
};
const AddForm = (props) => {
  const [title, setTitle] = useState("");
  const [isOverMaxLength, setIsOverMaxLength] = useState(false);
  const inputRef = useRef(null);
  const handleTextChange = (e) => {
    const newValue = e.currentTarget.value;
    if (newValue.length >= 10) {
      setIsOverMaxLength(true);
      return;
    }
    setIsOverMaxLength(false);
    setTitle(newValue);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isOverMaxLength) return;
    props.onSubmit(title);
    setTitle("");
    inputRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={handleTextChange}
        ref={inputRef}
      />
      <button disabled={isOverMaxLength}>Add</button>
      {isOverMaxLength && <p>10文字未満で入力してください</p>}
    </form>
  );
};
function App() {
  const [todos, setTodos] = useState([]);
  const updateTodos = (newTodos) => {
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };
  const handlePurgeClick = () => {
    if (!confirm("Sure?")) {
      return;
    }
    const newTodos = todos.filter((todo) => {
      return todo.isCompleted === false;
    });
    updateTodos(newTodos);
  };
  const handleTodoDeleteClick = (id) => {
    if (!confirm("Sure?")) {
      return;
    }
    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    updateTodos(newTodos);
  };
  const handleTodoCheckboxChange = (id) => {
    const newTodos = todos.map((todo) => {
      return {
        id: todo.id,
        title: todo.title,
        isCompleted: todo.id === id ? !todo.isCompleted : todo.isCompleted,
      };
    });
    updateTodos(newTodos);
  };
  const handleAddFormSubmit = (title) => {
    const newTodos = [...todos];
    newTodos.push({
      id: Date.now(),
      title: title,
      isCompleted: false,
    });
    updateTodos(newTodos);
  };
  const todoItems = todos.map((todo) => {
    return (
      <Todo
        key={todo.id}
        todo={todo}
        onDeleteClick={handleTodoDeleteClick}
        onCheckboxChange={handleTodoCheckboxChange}
      />
    );
  });
  return (
    <>
      <div className="container">
        <h1>
          Todos
          <button onClick={handlePurgeClick}>Purge</button>
        </h1>
        <ul id="todos">{todoItems}</ul>
        <AddForm onSubmit={handleAddFormSubmit} />
      </div>
    </>
  );
}
export default App;
