import { React } from "react";
import PropTypes from "prop-types";

export default function TaskFilter(props) {
  const { activeFilter, chooseActiveFilter, all, active, completed } = props;
  const Filters = [all, active, completed];
  return (
    <ul className="filters">
      {Filters.map((filter) => {
        return (
          <li key={Math.random()}>
            <button
              onClick={() => chooseActiveFilter(filter)}
              className={activeFilter === filter ? "selected" : ""}
              type="button"
            >
              {filter}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

TaskFilter.defaultProps = {
  activeFilter: "All",
  chooseActiveFilter: () => {},
};

TaskFilter.propTypes = {
  chooseActiveFilter: PropTypes.func,
};
