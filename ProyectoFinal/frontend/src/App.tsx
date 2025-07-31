import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ClienteForm from "./pages/ClientForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ClienteForm />
    </>
  );
}

export default App;
