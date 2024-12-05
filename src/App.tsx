import TodoDialog from "./components/TodoDialog";
import TodosContainer from "./components/TodosContainer";

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold text-blue-500 mb-2">Jeera 🤪</h1>

      <TodosContainer />
      <TodoDialog />
    </>
  );
}

export default App;
