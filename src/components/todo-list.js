import { React, useState } from "react";
import PropTypes from "prop-types";

import Task from "./task";

import { all, active, completed } from "./filters";

function ToDoList({
  todos,
  onDeleted,
  onItemDone,
  onItemEdit,
  onItemActive,
  onItemCompleted,
  clearCompleted,
  onItemAdded,
  onItemSubmit,
  stopTimer,
  startTimer,
  activeFilter,
  setData,
 
}) {
  const [label, setLabel] = useState("");

  const onChange = (label) => {
    setLabel(label);
  };

  const filteredTodos = () => {
    return todos
      .filter((todo) => {
        switch (activeFilter) {
          case all:
            return todo;
          case active:
            return !todo.done;
          case completed:
            return todo.done;
          default:
            return todo;
        }
      })
      .map((el) => {
        return (
          <Task
            {...el}
            onDeleted={() => onDeleted(el.id)}
            key={el.id}
            onItemDone={() => onItemDone(el.id)}
            onItemEdit={() => onItemEdit(el.id)}
            onItemActive={() => onItemActive(el.id)}
            onItemCompleted={() => onItemCompleted(el.id)}
            clearCompleted={() => clearCompleted(el.id)}
            onItemAdded={() => onItemAdded(el.id)}
            todos={todos}
            onItemSubmit={() => onItemSubmit(el.id, label)}
            onChange={onChange}
            stopTimer={() => stopTimer(el.id)}
            startTimer={() => startTimer(el.id)}
            setData={setData}
           
          />
        );
      });
  };

  return (
    <section className="main">
      <ul className="todo-list">{todos && filteredTodos()}</ul>
    </section>
  );
}
ToDoList.defaultProps = {
  todos: [],
  onDeleted: () => {},
  onItemDone: () => {},
  onItemActive: () => {},
  onItemCompleted: () => {},
  clearCompleted: () => {},
  onItemAdded: () => {},
  onItemSubmit: () => {},
  onChange: () => {},
  setVisible: () => {},
  stopTimer: () => {},
  startTimer: () => {},
  visible: false,
};

ToDoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleted: PropTypes.func,
  onItemDone: PropTypes.func,
  onItemActive: PropTypes.func,
  onItemCompleted: PropTypes.func,
  clearCompleted: PropTypes.func,
  onItemAdded: PropTypes.func,
  onItemSubmit: PropTypes.func,
  onChange: PropTypes.func,
  setVisible: PropTypes.func,
  stopTimer: PropTypes.func,
  startTimer: PropTypes.func,
  visible: PropTypes.bool,
};

export default ToDoList;
