import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { Web3Provider } from "contexts/Web3Context"
import { useContext } from 'react';
import Home from 'pages/Home/index';
import Navbar from 'components/Navbar/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <div className="bg-image font-sans relative  w-full" style={{ minHeight: "100vh" }}>

        <Router>

          <Web3Provider>
            <ToastContainer />

            <Navbar />
            <Home />
          </Web3Provider>

        </Router>
      </div>
    </>
  );
}

export default App;
