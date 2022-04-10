import Web3Context from "contexts/Web3Context";
import { useContext, useEffect, useState, Fragment } from "react";
import "./style.css";

import Navbar from "../../components/NavbarV2";
import ConnectButton from "components/Buttons/ConnectButton/index";
import {
  Navigate,
  useLocation,
  useNavigate,
} from "../../../node_modules/react-router-dom/index";

const ConnectWallet = () => {
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
    connectWallet,
  } = useContext(Web3Context);

  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(state);
    if (account) {
      navigate(state.from);
    }
  }, [account]);

  return (
    <>
      <div className="w-full flex flex-col">
        <Navbar />
        <div className="w-full h-full flex flex-col justify-center h-96 lg:mt-32">
          <div className="text-white text-3xl font-bold text-center">
            Connect your wallet to start battling!
          </div>
          <ConnectButton handleConfirm={connectWallet} />
        </div>
      </div>
    </>
  );
};
export default ConnectWallet;
