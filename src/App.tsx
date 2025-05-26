import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Homepage";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen">
        {" "}
        {/* Add top padding equal to navbar height */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
}
