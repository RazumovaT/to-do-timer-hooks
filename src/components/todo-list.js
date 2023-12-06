import { React, useState } from "react";
import PropTypes from "prop-types";

import NewTaskForm from "./new-task-form";

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
  visible,
  setVisible,
  stopTimer,
  startTimer,
  activeTodos,
  completedTodos,
  activeFilter,
}) {
  const [label, setLabel] = useState("");

  const onChange = (label) => {
    setLabel(label);
  };

  const filteredTodos = () => {
    if (activeFilter === all) {
      return todos.map((el) => {
        return (
          <NewTaskForm
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
            visible={visible}
            setVisible={setVisible}
            stopTimer={() => stopTimer(el.id)}
            startTimer={() => startTimer(el.id)}
          />
        );
      });
    } else if (activeFilter === active) {
      return activeTodos.map((el) => {
        return (
          <NewTaskForm
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
            visible={visible}
            setVisible={setVisible}
            stopTimer={() => stopTimer(el.id)}
            startTimer={() => startTimer(el.id)}
          />
        );
      });
    } else if (activeFilter === completed) {
      return completedTodos.map((el) => {
        return (
          <NewTaskForm
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
            visible={visible}
            setVisible={setVisible}
            stopTimer={() => stopTimer(el.id)}
            startTimer={() => startTimer(el.id)}
          />
        );
      });
    }
  };

  return (
    <section className="main">
      <ul className="todo-list">{filteredTodos()}</ul>
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
