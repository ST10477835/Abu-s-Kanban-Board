import React, { useState } from "react";
import "./Board.scss";
interface Task {
  task: string;
  hash: string;
  completionDate?: string | null;
}
const Board = () => {
  const [dashboard, setDashboard] = useState<Task[]>([]);
  const [inputNotification, setInputNotification] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputDate, setInputDate] = useState("");
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputDate(event.target.value);
  };
  const hashcodeGenerator = () => {
    let hash = "";
    console.log(hash);
    let random = Math.floor(Math.random() * 100 + 1);
    hash += inputValue.slice(0, 2) + "-" + inputDate.slice(0, 2) + "-" + random;
    console.log(hash);
    return hash;
  };
  const handleTask = () => {
    if (inputValue !== "") {
      setDashboard((dashboard) => [
        ...dashboard,
        {
          task: inputValue,
          hash: hashcodeGenerator(),
          completionDate: inputDate === "" ? null : inputDate,
        },
      ]);
      setInputValue("");
      setInputDate("");
      setInputNotification(false);
    } else {
      setInputNotification(true);
    }
  };
  const handleText = (task: string) => {
    if (task.length > 10) {
      return task.charAt(0).toUpperCase() + task.slice(1, 10) + "...";
    } else {
      return task.charAt(0).toUpperCase() + task.substring(1);
    }
  };
  const handleDelete = (hash: string) => {
    dashboard.filter((item) => item.hash !== hash);
  };
  return (
    <>
      <div className="main">
        <div className="control">
          <div className="task-input">
            <input
              type="text"
              value={inputValue}
              onChange={handleValueChange}
              placeholder="Running..."
            ></input>
            <label className={`${inputNotification ? "show" : ""}`}>
              Please enter you task!
            </label>
          </div>
          <input
            type="date"
            value={inputDate}
            onChange={handleDateChange}
          ></input>
          <button onClick={handleTask}>Add Task</button>
        </div>
        <div className="task-panel">
          {dashboard.map((item) => {
            return (
              <div className="task-box" key={item.hash}>
                <label>{item.completionDate}</label>
                <div className="task">
                  <div>{handleText(item.task)}</div>
                  <button onClick={() => handleDelete(item.hash)}>
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Board;
