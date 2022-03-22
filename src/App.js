import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { Web3Provider } from "contexts/Web3Context"
import { useContext } from 'react';
import Home from 'pages/Home/index';
import Navbar from 'components/Navbar/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllBattles from "pages/AllBattles/index";
import BattleDetails from "pages/BattleDetail/index";
import ArbDownPage from "pages/ArbDownPage/index";
import Leaderboard from "pages/Leaderboard/index";

function App() {
  return (
    <>
      <div className="bg-image font-sans relative  w-full" style={{ minHeight: "100vh" }}>
        {/* <ArbDownPage /> */}
        <Router>

          <Web3Provider>
            <ToastContainer />

            <Navbar />
            <Routes>
              <Route path="/battles" element={<AllBattles />} />
              <Route path="/detail" element={<BattleDetails />} />
              <Route path="/leaderboard" element={<Leaderboard />} />

              <Route path="/" element={<Home />} />
            </Routes>
          </Web3Provider>

        </Router>
      </div>
    </>
  );
}

export default App;
