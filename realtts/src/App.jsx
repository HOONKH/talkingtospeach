import { BrowserRouter, Routes, Route } from "react-router-dom";
import Day from "./pages/day";
import Main from "./pages/main";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:day" element={<Day />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
