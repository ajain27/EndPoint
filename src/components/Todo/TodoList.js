/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Todo from "./Todo";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  // const [filterByDateTodos, setFilterByDateTodos] = useState([]);

  const URL = "https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/get";
  const headers = {
    "X-Api-Key":
      "PMAK-5ef63db179d23c004de50751-10300736bc550d2a891dc4355aab8d7a5c",
  };
  const { promiseInProgress } = usePromiseTracker();
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const getTodos = async () => {
    await sleep(2000);
    const res = await fetch(URL, { headers });
    setTodos(await res.json());
  };

  function sortByIsComplete(x, y) {
    return x.isComplete === y.isComplete ? 0 : x.isComplete ? 1 : -1;
  }
  const sortedTodos = todos.sort(sortByIsComplete);

  // function getInCompleteTodos() {
  //   const completedTodos = todos.filter((td) => !td.isComplete);
  //   return completedTodos;
  // }

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

  useEffect(() => {
    trackPromise(getTodos());
  }, []);

  return (
    <>
      {sortedTodos && sortedTodos.length === 0 && promiseInProgress
        ? "loading..."
        : sortedTodos.map((d) => {
            return (
              <Todo
                key={d.id}
                id={d.id}
                description={d.description}
                date={d.dueDate}
                status={d.isComplete}
              />
            );
          })}
    </>
  );
}
