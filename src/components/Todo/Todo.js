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
            <Col sm={9}>
              <input type="checkbox" className="checkbox" />
              <label className="desc">{todo.description}</label>
            </Col>
            {todo.dueDate && (
              <Col sm={3} className="date">
                <label>{todo.dueDate}</label>
              </Col>
            )}
          </Row>
        ))}
    </>
  );
}
