import { useState, useEffect } from "react";

function App() {
  // Load todos from localStorage initially
  const [todos, setTodos] = useState<string[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTodo, setNewTodo] = useState<string>("");

  //updates the localstorage with the todos list when user gives input
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //addToDo validates the input and update in the list
  const addTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos([...todos, newTodo]);
    setNewTodo("");
  };

  const deleteTodo = (valueRem: number) => {
    setTodos((prevList) => prevList.filter((_, index) => index !== valueRem));
  };

  // _ has been used to indicate that the first parameter is not used in the filter function

  return (
    <div>
      <h1>Todo List</h1>
      <p>Enter ToDo here!</p>

      <input
        placeholder="Add todo..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />

      <button onClick={addTodo}>+</button>

      <h2>Todos:</h2>
      <ul>
        {todos.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => deleteTodo(index)}> - </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;