import { useState } from "react";

function App() {

  //initialize todos with an empty array
  
  const [todos, setTodos] = useState<string[]>([]);

  localStorage.setItem("todos",JSON.stringify(todos));
  // useState to manage the input value
  const [newTodo, setNewTodo] = useState<string>("");

  const addTodo = () => {
    if (newTodo.trim() === "") 
    {
      return; // ignore empty
    }
    setTodos([...todos, newTodo]); // add new item
    setNewTodo(""); // clear input
  };

  

  //valueRem is initialised as Number type
  // this filter function removes the item at the specified index
  const deleteTodo = (valueRem: Number) => {
    setTodos(prevList => prevList.filter((_, index) => index !== valueRem));
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
      {/* Render the list of todos */}
      <ul>
        {todos.map((item, index) => (
          <li key={index}>{item}
          <button onClick={() => deleteTodo(index)}>-</button>
          </li> 
        ))
        }
      </ul>
    </div>
  );
}

export default App;