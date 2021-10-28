/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Todo from "./Todo";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [formattedTodos, setFormattedTodos] = useState([]);
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
  useEffect(() => {
    trackPromise(getTodos());
  }, []);

  return (
    <>
      {todos && todos.length === 0 && promiseInProgress ? (
        "loading..."
      ) : (
        <Todo todos={todos} original={todos} />
      )}
    </>
  );
}
