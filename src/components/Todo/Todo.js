/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import cx from "classnames";
import styles from "./Todo.module.css";
import { Row, Col } from "react-bootstrap";
export default function Todo({ todos, original }) {
  const [isOverDue, setIsOverdue] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const classNames = cx(styles.todo, {
    [styles.overdue]: isOverDue === true,
    [styles.completed]: isCompleted === true,
    [styles.pending]: isPending === true,
  });

  function handleTodos() {
    isCheckboxSchecked();
    original?.map((todo) => {
      console.log(todo.isComplete);
      const od = new Date(todo.dueDate);
      if (
        todo.dueDate &&
        new Date(od.toDateString()) < new Date(new Date().toDateString()) &&
        todo.isComplete === false
      ) {
        setIsOverdue(true);
        setIsCompleted(false);
        setIsPending(false);
      } else if (
        todo.dueDate &&
        new Date(od.toDateString()) < new Date(new Date().toDateString()) &&
        todo.isComplete === true
      ) {
        setIsOverdue(true);
        setIsCompleted(true);
        setIsPending(false);
      } else {
        setIsOverdue(false);
      }
      return isOverDue;
    });
  }

  function isCheckboxSchecked() {
    const status = todos.map((td) => {
      if (td.isComplete === true) {
        setIsChecked(true);
        return true;
      } else {
        setIsChecked(false);
        return false;
      }
    });
    return status;
  }

  function updateTodo(e, todo) {
    setIsChecked(e.target.checked);
    const updateURL = `https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/patch/${todo.id}`;
    const headers = {
      "X-Api-Key":
        "PMAK-5ef63db179d23c004de50751-10300736bc550d2a891dc4355aab8d7a5c",
      "Content-type": "application/json",
    };
    const body = {
      isComplete: e.target.checked,
    };
    fetch(updateURL, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ body }),
    });
  }

  useEffect(() => {
    handleTodos();
  }, []);

  return (
    <div className={styles.todoList}>
      {todos &&
        todos.length > 0 &&
        todos.map((todo) => (
          <Row className={classNames} key={todo.id}>
            <Col sm={9}>
              <input
                type="checkbox"
                checked={isChecked[todo]}
                defaultChecked={todo.isComplete}
                className={styles.checkbox}
                onChange={(e) => updateTodo(e, todo)}
              />
              <label className={styles.desc}>{todo.description}</label>
            </Col>
            {todo.dueDate && (
              <Col sm={3} className={styles.date}>
                <label>{todo.dueDate}</label>
              </Col>
            )}
          </Row>
        ))}
    </div>
  );
}
