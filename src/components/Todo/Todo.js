/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import cx from "classnames";
import styles from "./Todo.module.css";
import { Row, Col } from "react-bootstrap";
export default function Todo({ id, description, date, status }) {
  const [isOverDue, setIsOverdue] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const classNames = cx(styles.todo, {
    [styles.overdue]: isOverDue === true,
    [styles.completed]: isCompleted === true,
  });

  const formattedDate = new Date(date).toLocaleDateString().split("T")[0];

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

  // const sortedData = todos.sort(sortByDate);

  // function getCompletedTodos() {
  //   const completedTodos = todos.filter((td) => td.isComplete);
  //   return completedTodos;
  // }

  function updateTodo(e) {
    setIsChecked(e.target.checked);
    const updateURL = `https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/patch/${id}`;
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
    if ((status && date) || (status && !date)) {
      setIsCompleted(true);
    } else if ((!status && date) || (!status && !date)) {
      setIsOverdue(true);
    }
  }, []);

  return (
    <div className={styles.todoList}>
      <Row className={classNames}>
        <Col xs={9}>
          <input
            type="checkbox"
            checked={isChecked[id]}
            defaultChecked={status}
            onChange={(e) => updateTodo(e)}
          />
          <label className={styles.desc}>{description}</label>
        </Col>
        {date && (
          <Col xs={3} className={styles.date}>
            <label>{formattedDate}</label>
          </Col>
        )}
      </Row>
    </div>
  );
}
