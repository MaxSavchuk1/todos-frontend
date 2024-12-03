import React, { useEffect, useState } from "react";
import { getTodos } from "./api";

import TodoDialog from "./components/TodoDialog";
import TodosContainer from "./components/TodosContainer";

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const res = await getTodos();
      setTodos(res.data);
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-500 mb-2">Jeera 🤪</h1>
      <TodosContainer todos={todos} />
      <TodoDialog />
    </>
  );
}

export default App;
