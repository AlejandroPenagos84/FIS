import { useState } from "react";
import "./index.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ClienteForm from "./pages/ClientForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Login/>
    </>
  );
}

export default App;
