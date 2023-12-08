import { React, useEffect, useState } from "react";
import { formatDistance } from "date-fns";
import PropTypes from "prop-types";

function Task({
  time,
  label,
  done,
  id,
  isEdit,
  createdAt,
  onDeleted,
  onItemDone,
  onItemEdit,
  onItemSubmit,
  onChange,
  stopTimer,
  startTimer,
  setData,
  todos,
}) {
  const [input, setInput] = useState(label);

  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;

  const inputChange = (e) => {
    if (e.key === "Escape") {
      setInput(label);
    }
    onChange(e.target.value);
    setInput(e.target.value);
  };

  const submitFunc = (e) => {
    e.preventDefault();
    onItemSubmit();
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        let newArr = todos.map((el) =>
          el.isEdit ? { ...el, isEdit: !el.isEdit } : el
        );
        setData(newArr);
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [setData, todos]);

  if (isEdit) {
    return (
      <form
        onSubmit={(e) => submitFunc(e)}
        onClick={(e) => e.stopPropagation(e)}
      >
        <input
          type="text"
          className="edit"
          value={input}
          onChange={inputChange}
          onKeyDown={(e) => (e.key === "Escape" ? setInput(label) : "")}
        />
      </form>
    );
  }

  return (
    <label>
      <li className={done ? "completed" : ""}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            name="checkbox"
            id={id}
            checked={done ? true : false}
            onChange={onItemDone}
          />
          <label htmlFor={id}>
            <span className="title">{label}</span>
            <span className="description">
              <button className="icon icon-play" onClick={startTimer}></button>
              <button className="icon icon-pause" onClick={stopTimer}></button>
              {minutes < 10 ? "0" + minutes : minutes}:
              {seconds < 10 ? "0" + seconds : seconds}
            </span>
            <span className="description">
              created{" "}
              {formatDistance(createdAt, Date.now(), {
                includeSeconds: true,
              })}{" "}
              ago
            </span>
          </label>
          <div onClick={(e) => e.stopPropagation(e)}>
            <button className="icon icon-edit" onClick={onItemEdit}></button>
          </div>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
      </li>
    </label>
  );
}

Task.defaultProps = {
  label: "",
  min: "",
  sec: "",
  time: 0,
  minutes: 0,
  seconds: 0,
  done: false,
  isEdit: false,
  createdAt: Date.now(),
  id: Math.random(),
  inputChange: () => {},
  submitFunc: () => {},
  handleEsc: () => {},
};

Task.propTypes = {
  label: PropTypes.string.isRequired,
  done: PropTypes.bool,
  id: PropTypes.number,
  time: PropTypes.number,
  isEdit: PropTypes.bool,
  minutes: PropTypes.number,
  seconds: PropTypes.number,
  inputChange: PropTypes.func,
  submitFunc: PropTypes.func,
  handleEsc: PropTypes.func,
};

export default Task;
