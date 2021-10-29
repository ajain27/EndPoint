/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Todo from "./Todo";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/core";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const override = css`
    display: block;
    margin: 0 auto;
    color: #00001e;
  `;

  const URL = "https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/get";
  const headers = {
    "X-Api-Key":
      "PMAK-5ef63db179d23c004de50751-10300736bc550d2a891dc4355aab8d7a5c",
  };

  const getTodos = async () => {
    const res = await fetch(URL, { headers });
    setTodos(await res.json());
  };

  function sortByDate(a, b) {
    let d1 = new Date(a.dueDate);
    let d2 = new Date(b.dueDate);
    if (d1.getUTCFullYear() > d2.getUTCFullYear()) {
      return 1;
    } else if (d2.getUTCMonth() > d1.getUTCMonth()) {
      return -1;
    } else {
      return d1.getUTCDate() - d2.getUTCDate();
    }
  }

  const incompleteTodos = todos.filter((d) => !d.isComplete);
  const completedTodos = todos.filter((d) => d.isComplete);
  const incomepleTodosWithDate = incompleteTodos.filter((dd) => dd.dueDate);
  const incomepleteTodosWithNoDate = incompleteTodos.filter(
    (dd) => !dd.dueDate
  );
  incomepleTodosWithDate.sort(sortByDate); // sort by date for todos with date

  const sortedTodos = incomepleTodosWithDate
    .concat(incomepleteTodosWithNoDate)
    .concat(completedTodos);

  useEffect(() => {
    setShowLoader(true);
    setTimeout(() => {
      getTodos();
      setShowLoader(false);
    }, 1000);
  }, []);

  return (
    <>
      {sortedTodos && sortedTodos.length === 0 && showLoader ? (
        <ClipLoader size={100} css={override} />
      ) : (
        sortedTodos.map((d) => {
          return (
            <Todo
              key={d.id}
              id={d.id}
              description={d.description}
              date={d.dueDate}
              status={d.isComplete}
            />
          );
        })
      )}
    </>
  );
}
