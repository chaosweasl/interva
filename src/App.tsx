import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./styles/globals.css";

//components
import Navbar from "./components/Navbar";
import Home from "./pages/interva";
import Themes from "./pages/themes";
import About from "./pages/about";
import Settings from "./pages/settings";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div>
        {/* Add top padding equal to navbar height (idk if needed) */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/themes" element={<Themes />} />
          <Route path="/about" element={<About />} />
          <Route path="/settings" element={<Settings />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
}
