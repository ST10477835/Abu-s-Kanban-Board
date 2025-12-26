import { useState } from "react";
import Board from "./Board";
interface Panel {
  name: string;
  hash: string;
}
const DashBoard = () => {
  const [boards, setBoards] = useState<Panel[]>([]);
  const [inputValue, setInputValue] = useState("");
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const hashCodeGenerator = () => {
    let hash = "";
    let random = Math.floor(Math.random() * 100 + 1);
    hash += inputValue.slice(0, 2) + "-" + random;
    console.log(hash);
    return hash;
  };
  const handleClick = () => {
    setBoards([...boards, { name: inputValue, hash: hashCodeGenerator() }]);
    setInputValue("");
  };
  return (
    <>
      <div className="control">
        <input
          value={inputValue}
          placeholder="Panel Name..."
          type="text"
          onChange={handleValueChange}
        ></input>
        <button onClick={handleClick}>Add Panel</button>
      </div>
      <div className="page">
        {boards.map((item) => {
          return <Board key={item.hash} />;
        })}
      </div>
    </>
  );
};

export default DashBoard;
