import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { ScoresTable } from "./Components/ScoresTable/ScoresTable";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ScoresTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
