import React from "react";

const TodoItem = (props) => {
  const handleDelete = () => {
    props.deleteTodo(props.todoItem);
  };

  return (
    <li className={props.todoItem.done === true ? "done-true" : "done-false"}>
      {props.todoItem.label}{" "}
      <button className="boton" onClick={handleDelete}>
        x
      </button>{" "}
    </li>
  );
};

export default TodoItem;
