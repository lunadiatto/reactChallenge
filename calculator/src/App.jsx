import "./App.css";
import Row from "./components/Row";

const App = () => {
  return (
    <div
      className="App"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <h1>React Calculator</h1>
      <Row />
    </div>
  );
};

export default App;
