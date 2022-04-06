import Web3Context from "contexts/Web3Context";
import { useContext, useEffect, useState, Fragment } from "react";
import "./index.css";
import { Navigate } from "react-router-dom";

import Navbar from "../../components/NavbarV2";

const Home = () => {
  const {
    account,
    createBattle,
    joinBattle,
    getArbTokenBalance,
    getAllHarmonyWhales,
    listenToCreatedBattles,
    listenToWonBattles,
    listenToCanceledBattles,
    listenToAcceptedBattles,
    cancelBattle,
    getAllBattles,
    getBattleDetails,
    getBattlesReadyToAccept,
    blockNumber,
    update,
    commenceBattle,
  } = useContext(Web3Context);

  return (
    <>
      {!account && <Navigate to="/connect" />}
      <div className="w-full">
        <Navbar active="HOME" />
      </div>
    </>
  );
};
export default Home;
