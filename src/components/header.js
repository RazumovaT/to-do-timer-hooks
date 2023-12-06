import { React, useState } from "react";
import PropTypes from "prop-types";
export default function Header({ onItemAdded }) {
  const [input, setInput] = useState("");
  const [min, setMin] = useState("");
  const [sec, setSec] = useState("");

  const onInputChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const onMinChange = (e) => {
    e.preventDefault();
    setMin(Number(e.target.value));
  };

  const onSecChange = (e) => {
    e.preventDefault();
    setSec(Number(e.target.value));
  };

  const onInputSubmit = (e) => {
    e.preventDefault();
    const seconds = sec < 10 ? sec * 10 : sec;
    onItemAdded(input, Number(min * 60 + seconds));
    setInput("");
    setMin("");
    setSec("");
  };

  return (
    <header className="header">
      <h1>Todos</h1>
      <form className="new-todo-form" onSubmit={onInputSubmit}>
        <label>
          <input
            className="new-todo"
            value={input}
            onChange={onInputChange}
            placeholder="Task"
            autoFocus
            required
          />
          <input
            className="new-todo-form__timer"
            value={min}
            onChange={onMinChange}
            placeholder="Min"
            pattern="[0-9]{1,2}"
            maxLength={2}
            autoFocus
            required
            type="number"
            min="1"
          />
          <input
            className="new-todo-form__timer"
            value={sec}
            onChange={onSecChange}
            placeholder="Sec"
            pattern="[0-9]{1,2}"
            maxLength={2}
            autoFocus
            required
            type="number"
            min="1"
            max="60"
          />
        </label>
        <button type="submit" onSubmit={onInputSubmit} />
      </form>
    </header>
  );
}

Header.defaultProps = {
  onItemAdded: () => {},
};

Header.propTypes = {
  onItemAdded: PropTypes.func,
};
