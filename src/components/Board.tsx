import React, { useState } from "react";
import "./Board.scss";
interface Task {
  task: string;
  hash: string;
  completionDate?: string | null;
}
const Board = () => {
  const [dashboard, setDashboard] = useState<Task[]>([
    { task: "run", hash: "#1234", completionDate: "2025-12-25" },
  ]);
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
    setDashboard([
      ...dashboard,
      {
        task: inputValue,
        hash: hashcodeGenerator(),
        completionDate: inputDate === "" ? null : inputDate,
      },
    ]);
    setInputValue("");
    setInputDate("");
  };
  return (
    <>
      <div className="main">
        <input
          type="text"
          value={inputValue}
          onChange={handleValueChange}
          placeholder="Running..."
        ></input>
        <input
          type="date"
          value={inputDate}
          onChange={handleDateChange}
        ></input>
        <button onClick={handleTask}>Add Task Panel</button>
        <div>
          Task Dashboard
          {dashboard.map((item) => {
            return (
              <div className="task-panel" key={item.hash}>
                {item.task}, {item.hash}, {item.completionDate}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Board;
