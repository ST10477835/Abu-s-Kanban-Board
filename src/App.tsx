import Board from "./components/Board";
import "./index.scss";
import bg from "./assets/wallpaper.jpg";
const App = () => {
  return (
    <div
      style={{
        fontFamily: "KidsDoodle",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <Board />
    </div>
  );
};

export default App;
