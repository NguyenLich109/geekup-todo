import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/home";
import TodoScreens from "./screens/todoScreens";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="todo/*" element={<TodoScreens />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
