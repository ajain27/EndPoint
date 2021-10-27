import "./App.css";
import Header from "./components/Header/Header";
import TodoList from "./components/Todo/TodoList";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Header />
      <TodoList />
    </div>
  );
}

export default App;
