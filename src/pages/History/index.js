import Web3Context from "contexts/Web3Context";
import { useContext, useEffect, useState, Fragment } from "react";
import "./index.css";

import Navbar from "../../components/NavbarV2";
import { Navigate } from "../../../node_modules/react-router-dom/index";

const History = () => {
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
        <Navbar active="HISTORY" />
      </div>
    </>
  );
};
export default History;
