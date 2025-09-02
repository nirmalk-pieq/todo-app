import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./login";
import Todo from "./components/todo";
import EmployeeList from "./components/employeeList";
import AddEmployee from "./components/AddEmployee";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(()=>{
      return localStorage.getItem("isLoggedIn") === "true";
  })

  const handleLogin = ()=>{
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn","true");
  }

  const handleLogOut = ()=>{
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  }

  return (
    //router - Wraps everything and enables routing
    <Router>

      {/* Holds all the page definitions */}
      <Routes>

        {/* Handles the single pages route address */}
        <Route path="/login" 
        element={
          // calls the function isLoggedIn and check whether it is logged in.
          // if not goes to handleLogin page 
          isLoggedIn? <Navigate to ="/todos"/> : <Login onLogin={handleLogin}/>
          } 
        />

        <Route path="/todos" 
          element={
            isLoggedIn? <Todo onLogout={handleLogOut}/> : <Navigate to = "/login"/>
            }
        />

        <Route path="/employees" 
          element={
            isLoggedIn? <EmployeeList onLogout={handleLogOut}/> : <Navigate to = "/login"/>
            }
        />

        <Route path="/addemployee" 
          element={
            isLoggedIn? <AddEmployee onLogout={handleLogOut}/> : <Navigate to = "/login"/>
            }
        />

      </Routes>
    </Router>
  );
}

export default App;