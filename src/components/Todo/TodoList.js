/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Todo from "./Todo";

export default function TodoList() {
  const [todos, setTodos] = useState();
  const [formattedTodos, setFormattedTodos] = useState([]);

  const URL = "https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/get";
  const headers = {
    "X-Api-Key":
      "PMAK-5ef63db179d23c004de50751-10300736bc550d2a891dc4355aab8d7a5c",
  };

  async function getTodos() {
    const listOfTodos = await axios.get(URL, { headers });
    setTodos(listOfTodos.data);
  }

  function formatTodos() {
    getTodos();
    return todos?.map((d) => {
      const formattedDate = d.dueDate;
      d["dueDate"] = new Date(formattedDate).toLocaleDateString().split("T")[0];
      setFormattedTodos(todos);
    });
  }

  useEffect(() => {
    formatTodos();
  }, []);

  return (
    <Container>
      {formattedTodos && (
        <div className="todoList">
          <Todo todos={formattedTodos} />
        </div>
      )}
    </Container>
  );
}
