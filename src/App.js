import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Web3Provider } from "contexts/Web3Context";
import { useContext } from "react";
import Home from "pages/Home/index";
import HomeV2 from "./pages/HomeV2/index";
import Navbar from "components/Navbar/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Play from "pages/Play/index";
import Battles from "pages/Battles/index";
import History from "pages/History/index";

function App() {
  return (
    <>
      <div className="relative w-full">
        <Router>
          <Web3Provider>
            <ToastContainer />

            {/* <Navbar /> */}
            <Routes>
              <Route path="/" element={<HomeV2 />} />
              <Route path="/play" element={<Play />} />
              <Route path="/battles" element={<Battles />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </Web3Provider>
        </Router>
      </div>
    </>
  );
}

export default App;
