import NavButton from "components/Buttons/NavButton/index";
import Web3Context from "contexts/Web3Context";
import { useContext, useEffect, useState, Fragment } from "react";
import "./style.css";

import DividerTop from "../../assets/divider-top.png";

const Navbar = ({ active }) => {
  const {
    account,
    connectWallet,
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
    <div>
      <img src={DividerTop} />
      <div className="w-full lg:px-8 flex justify-between items-center border-b border-red">
        <div className="navbar-button text-white">
          0.0000
        </div>
        <div className="flex justify-center">
          <NavButton text="HOME" active={active} />
          <NavButton text="PLAY" active={active} />
          <NavButton text="BATTLES" active={active} />
          <NavButton text="HISTORY" active={active} />

        </div>
        <div
          className="navbar-button text-white"
          onClick={connectWallet}
        >{account ? `${account?.slice(0, 4)}...${account?.slice(-4)}` : "Connect to Wallet"}</div>
      </div>
    </div>
  );
};
export default Navbar;
