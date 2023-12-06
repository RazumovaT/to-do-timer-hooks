import { React, useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";

import Header from "./components/header";
import ToDoList from "./components/todo-list";
import Footer from "./components/footer";
import { all, active, completed } from "./components/filters";

const rootNode = document.getElementById("root");
const root = createRoot(rootNode);

function AppElements() {
  const [data, setData] = useState([]);
  const [activeTodos, setActiveTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [activeFilter, setActiveFilter] = useState(all);
  const [id, setId] = useState(0);
  const [visible, setVisible] = useState(false);

  let interval = null;
  const intervalRef = useRef("");

  useEffect(() => {
    intervalRef.current = interval;
  });

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const newArr = data.map((el) => {
        if (el.time === 0) {
          return el;
        }
        if (el.timerRun) {
          el.time = el.time - 1;
        }
        return el;
      });
      setData(newArr);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  });

  const stopTimer = (id) => {
    let newArr = data.map((el) =>
      el.id === id ? { ...el, timerRun: false } : { ...el }
    );
    setData(newArr);
  };

  const startTimer = (id) => {
    let newArr = data.map((el) =>
      el.id === id ? { ...el, timerRun: true } : { ...el }
    );
    setData(newArr);
  };

  const chooseActiveFilter = (filterName) => {
    switch (filterName) {
      case all:
        setActiveFilter(filterName);
        break;
      case active:
        const activeArr = data.filter((el) => !el.done);
        setActiveTodos(activeArr);
        setActiveFilter(filterName);
        break;
      case completed:
        const doneArr = data.filter((el) => el.done);
        setCompletedTodos(doneArr);
        setActiveFilter(filterName);
        break;
      default:
        break;
    }
  };
  const createItem = (label, time) => {
    setId((id) => id + 1);
    return {
      label,
      done: false,
      active: true,
      isEdit: false,
      timerRun: true,
      time,
      id: id,
      createdAt: Date.now(),
    };
  };

  const addItem = (text, min, sec) => {
    if (!text.length) {
      return;
    }
    const newItem = createItem(text, min, sec);
    const copy = JSON.parse(JSON.stringify(data));
    const newArr = [...copy, newItem];
    setData(newArr);
    setActiveTodos(newArr);
  };

  const deleteItem = (id) => {
    const index = data.findIndex((el) => el.id === id);
    const newArr = JSON.parse(JSON.stringify(data))
      .slice(0, index)
      .concat(JSON.parse(JSON.stringify(data)).slice(index + 1));
    setData(newArr);
  };

  const itemDone = (id) => {
    let newArr = data.map((el) =>
      el.id === id ? { ...el, done: !el.done } : { ...el }
    );
    setData(newArr);
  };

  const itemEdit = (id) => {
    setVisible(true);
    let newArr = data.map((el) =>
      el.id === id ? { ...el, isEdit: !el.isEdit } : { ...el }
    );
    setData(newArr);
  };

  const clearCompleted = () => {
    const newArr = data.filter((el) => !el.done);
    setData(newArr);
    setCompletedTodos([]);
  };

  const onItemSubmit = (id, text) => {
    let newArr = data.map((el) =>
      el.id === id ? { ...el, label: text, isEdit: !el.isEdit } : { ...el }
    );
    setData(newArr);
  };

  let itemsLeft = data.filter((el) => !el.done).length;

  return (
    <div className="todoapp">
      <Header onItemAdded={addItem} />
      <ToDoList
        todos={data}
        completedTodos={completedTodos}
        activeTodos={activeTodos}
        activeFilter={activeFilter}
        onDeleted={deleteItem}
        onItemDone={itemDone}
        onItemEdit={itemEdit}
        clearCompleted={clearCompleted}
        onItemAdded={addItem}
        onItemSubmit={onItemSubmit}
        visible={visible}
        setVisible={setVisible}
        stopTimer={stopTimer}
        startTimer={startTimer}
      />
      <Footer
        itemsLeft={itemsLeft}
        activeFilter={activeFilter}
        chooseActiveFilter={chooseActiveFilter}
        clearCompleted={clearCompleted}
        all={all}
        active={active}
        completed={completed}
      />
    </div>
  );
}

root.render(<AppElements />);
