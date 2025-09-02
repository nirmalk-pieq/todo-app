import { useState } from "react";
import { useNavigate } from "react-router-dom";

// defining what kind of data needed
interface LoginProps {
  onLogin: () => void;
}

function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("");
  //useState lets you create state inside functional components.
  //username variable created as "" and setUsername is a function which sets input to the username variable.

  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      onLogin();                 // Mark as logged in (in App)
      navigate("/todos");        // Navigate to the todo page
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        // e is the event object passed automatically by the browser.
        // e.target is the input element itself.
        // e.target.value takes current text inside the input field
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
