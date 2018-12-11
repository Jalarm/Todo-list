import React from "react";
import TodoListItem from "../todo-list-item";
import "./todo-list.css";

const TodoList = ({ todos, onDeleted, onTogleDone, onTogleImportant }) => {
  const elements = todos.map(item => {
    const { id, ...itemProps } = item;

    return (
      <li key={id} className="list-group-item">
        <TodoListItem
          {...itemProps}
          onDeleted={() => {
            onDeleted(id);
          }}
          onTogleImportant={() => {
            onTogleImportant(id);
          }}
          onTogleDone={() => {
            onTogleDone(id);
          }}
        />
      </li>
    );
  });

  return <ul className="list-group todo-list">{elements}</ul>;
};

export default TodoList;
