import "./Board.scss";
import { useState } from "react";
interface Task {
  task: string;
  id: string;
  status: string;
}
if (!localStorage.getItem("tasks")) {
  localStorage.setItem("tasks", JSON.stringify([]));
}
const Board = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? (JSON.parse(storedTasks) as Task[]) : [];
  });
  const handleDragStart = (id: string, e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text", id);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const handleDragEnd = (
    status: string,
    e: React.DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    const list: Task[] = tasks.map((prev) =>
      prev.id === e.dataTransfer.getData("text")
        ? { ...prev, status: status }
        : prev
    );
    setTasks(list);
    localStorage.setItem("tasks", JSON.stringify(list));
  };
  const generateUniqueHash = () => {
    const timestamp = Date.now().toString(36);
    const randomString = Math.random().toString(36).substring(2, 9);
    return `${timestamp}-${randomString}`;
  };
  const addTask = (task: string) => {
    const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
    const newTask = { task, id: generateUniqueHash(), status: "todo" };
    const updatedTasks = [...tasks, newTask];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks); // ❗ update state
    setInputValue(""); // optional: clear input after adding
  };

  const removeTask = (id: string) => {
    let tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks = tasks.filter((prev) => prev.id !== id);
    setTasks(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  const setup = (status: string) => {
    return (
      <div className="tasks">
        {tasks
          .filter((curr) => curr.status === status)
          .map((prev) => {
            return (
              <div
                className="task"
                draggable
                onDragStart={(e) => handleDragStart(prev.id, e)}
              >
                <span>{prev.task.toUpperCase()}</span>
                <button onClick={() => removeTask(prev.id)}>⌦</button>
              </div>
            );
          })}
      </div>
    );
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setInputValue((e.target as HTMLInputElement).value);
    }
  };
  return (
    <>
      <h1>Abu-ban: Where tasks go to maybe get done</h1>
      <div className="board">
        <div
          className="field todo"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDragEnd("todo", e)}
        >
          <span className="label">To-Do</span>

          {setup("todo")}
        </div>
        <div
          className="field in-progress"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDragEnd("in-progress", e)}
        >
          <span className="label">In-Progress</span>

          {setup("in-progress")}
        </div>
        <div
          className="field completed"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDragEnd("completed", e)}
        >
          <span className="label">Completed</span>

          {setup("completed")}
        </div>
      </div>
      <div className="input">
        <input
          type="text"
          placeholder="eg. Running"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        ></input>
        <button onClick={() => addTask(inputValue)}>+</button>
      </div>
    </>
  );
};

export default Board;
