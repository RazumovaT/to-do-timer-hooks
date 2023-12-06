import { React } from "react";
import PropTypes from "prop-types";

import TaskFilter from "./task-filter";

export default function Footer(props) {
  const {
    itemsLeft,
    activeFilter,
    chooseActiveFilter,
    clearCompleted,
    all,
    active,
    completed,
  } = props;
  return (
    <footer className="footer">
      <span className="todo-count">{itemsLeft} items left</span>
      <TaskFilter
        activeFilter={activeFilter}
        chooseActiveFilter={chooseActiveFilter}
        all={all}
        active={active}
        completed={completed}
      />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  itemsLeft: undefined,
  activeFilter: "All",
  setActiveFilter: () => {},
  clearCompleted: () => {},
};

Footer.propTypes = {
  setActiveFilter: PropTypes.func,
  clearCompleted: PropTypes.func,
};
