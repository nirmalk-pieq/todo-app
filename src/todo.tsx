import { useState, useEffect } from "react";

interface TodoProps {
  onLogout: () => void;
}

function Todo({ onLogout }: TodoProps) {
  const [todos, setTodos] = useState<string[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTodo, setNewTodo] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos([...todos, newTodo]);
    setNewTodo("");
  };

  const deleteTodo = (indexToRemove: number) => {
    setTodos((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <button onClick={onLogout}>Logout</button>
      <br />
      <input
        placeholder="Add todo..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>+</button>

      <ul>
        {todos.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => deleteTodo(index)}>-</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
