/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import cx from "classnames";
import styles from "./Todo.module.css";
import { Row, Col } from "react-bootstrap";
export default function Todo({ id, description, date, status }) {
  const [isOverDue, setIsOverdue] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const updateURL = `https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/patch/${id}`;
  const headers = {
    "X-Api-Key":
      "PMAK-5ef63db179d23c004de50751-10300736bc550d2a891dc4355aab8d7a5c",
    "Content-type": "application/json",
  };

  const classNames = cx(styles.todo, {
    [styles.overdue]: isOverDue === true,
    [styles.completed]: isCompleted === true,
    [styles.pending]: isPending === true,
  });

  const formattedDate = new Date(date).toLocaleDateString().split("T")[0];

  function updateTodo(e) {
    setIsChecked(e.target.checked);
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
    } else if (!status && date) {
      setIsOverdue(true);
    } else if (!status && !date) {
      setIsPending(true);
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
