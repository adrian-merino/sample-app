import { BrowserRouter, Routes, Route } from "react-router-dom";
import Colombo from "./pages/Colombo";
import Gandalf from "./pages/Gandalf";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/colombo" element={<Colombo />} />
          <Route path="/gandalf" element={<Gandalf />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
