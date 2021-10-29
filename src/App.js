import "./App.css";
import Header from "./components/Header/Header";
import TodoList from "./components/Todo/TodoList";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container className="App">
      <Header />
      <TodoList />
    </Container>
  );
}

export default App;
