/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import cx from "classnames";
import styles from "./Todo.module.css";
import { Row, Col } from "react-bootstrap";
export default function Todo({ todos, original }) {
  const [isOverDue, setIsOverdue] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const classNames = cx(styles.todo, {
    [styles.overdue]: isOverDue === true,
    [styles.completed]: isCompleted === true,
  });

  // function sortByDate(a, b) {
  //   if (a.dueDate && b.dueDate) {
  //     let d1 = new Date(a.dueDate);
  //     let d2 = new Date(b.dueDate);
  //     if (d1.getUTCMonth() > d2.getUTCMonth()) {
  //       return 1;
  //     } else if (d2.getUTCMonth() > d1.getUTCMonth()) {
  //       return -1;
  //     } else {
  //       return d1.getUTCDate() - d2.getUTCDate();
  //     }
  //   }
  // }

  function sortByIsComplete(x, y) {
    return x.isComplete === y.isComplete ? 0 : x.isComplete ? 1 : -1;
  }
  const sortedTodos = todos.sort(sortByIsComplete);

  // const sortedData = todos.sort(sortByDate);
  // console.log("final sorted data--", sortedData);

  function getCompletedTodos() {
    const completedTodos = todos.filter((td) => td.isComplete);
    return completedTodos;
  }

  function format(d) {
    if (d.dueDate) {
      const formattedDate = d.dueDate;
      d["dueDate"] = new Date(formattedDate).toLocaleDateString().split("T")[0];
    }
  }

  function handleTodos() {
    getCompletedTodos();
    todos?.map((todo, i) => {
      // const od = new Date(todo.dueDate);
      format(todo);
      if (todo.isComplete === false) {
        setIsOverdue(true);
      } else if (todo.isComplete === true) {
        setIsCompleted(true);
      }
      return todos;
    });
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
    console.log("From the list--", todos);
    handleTodos();
  }, []);

  return (
    <div className={styles.todoList}>
      {sortedTodos &&
        sortedTodos.length > 0 &&
        sortedTodos.map((todo) => (
          <Row className={classNames} key={todo.id}>
            <Col sm={9}>
              <input
                type="checkbox"
                checked={isChecked[todo]}
                defaultChecked={todo.isComplete}
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
