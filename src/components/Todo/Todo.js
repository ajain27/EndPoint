import "./Todo.css";
import { Row, Col } from "react-bootstrap";
export default function Todo({ todos }) {
  console.log("todos from todo js---", todos);
  return (
    <>
      {todos &&
        todos.length > 0 &&
        todos.map((todo) => (
          <Row className="todo" key={todo.id}>
            <Col>
              <input type="checkbox" className="checkbox" />
              <label>{todo.description}</label>
            </Col>
            <Col className="date">
              <label className="date">{todo.dueDate}</label>
            </Col>
          </Row>
        ))}
    </>
  );
}
