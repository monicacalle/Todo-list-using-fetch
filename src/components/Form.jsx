import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

const Form = () => {
  const [task, setTask] = useState({
    label: "",
    done: false,
  });
  const [list, setList] = useState([]);

  const handleChange = (event) => {
    setTask({
      label: event.target.value,
      done: false,
    });
  };

  const getTodos = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/monicacalle", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("this is data", data);
        setList(data);
      });
  };

  const createTodos = (todoList) => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/monicacalle", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoList),
    });
  };

  useEffect(() => {
    getTodos();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setList([...list, task]);
    createTodos([...list, task]);
    setTask({
      label: "",
      done: false,
    });
  };

  const onDelete = (item) => {
    const filteredTodoList = list.filter((todoItem) => {
      return todoItem.label !== item.label;
    });

    setList(filteredTodoList);
  };

  const deleteAll = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/monicacalle", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{}]),
    });
    setList([]);
  };

  return (
    <div className="form">
      <h1 className="title">Todos</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="what needs to be done?"
          value={task.label}
          onChange={handleChange}
        />
      </form>
      <button onClick={deleteAll}>delete all</button>
      <ul>
        {list.map((item, index) => {
          return <TodoItem todoItem={item} deleteTodo={onDelete} key={index} />;
        })}
      </ul>
    </div>
  );
};

export default Form;
