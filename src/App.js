import logo from './logo.svg';
import './App.css';
import {Web3Provider} from "contexts/Web3Context"
import { useContext } from 'react';
import Home from 'pages/Home/index';


function App() {
  return (
    <>
    <Web3Provider>
      <Home/>
    </Web3Provider>
    
</>
  );
}

export default App;
