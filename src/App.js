import React, { useEffect, useState } from "react";
import { Button, Input, Field, Label, Description } from "@headlessui/react";
import clsx from "clsx";

import { getTodos, createTodo } from "./api";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  const fetchTodos = async () => {
    const res = await getTodos();
    setTodos(res.data);
  };

  const clickHandler = async () => {
    await createTodo({ body: todo });
    await fetchTodos();
    setTodo("");
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>{todo.body}</div>
      ))}

      <Button onClick={clickHandler}>Add</Button>
    </div>
  );
}

export default App;
