import NavButton from "components/Buttons/NavButton/index";
import Web3Context from "contexts/Web3Context";
import { useContext, useEffect, useState, Fragment } from "react";
import "./style.css";

import DividerTop from "../../assets/divider-top.png";
import AquaIcon from "../../assets/aqua.png";

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
    arbTokenBalance,
  } = useContext(Web3Context);

  return (
    <div>
      <img src={DividerTop} />
      <div className="w-full lg:px-8 flex justify-between items-center border-b border-red">
        <div className="font-impact text-2xl text-lightRed flex flex-1">
          <img src={AquaIcon} className="w-8 h-8 my-auto mr-2" />
          {arbTokenBalance}
        </div>

        <div className="flex justify-center">
          {/* <NavButton text="HOME" active={active} /> */}
          <NavButton text="PLAY" active={active} />
          <NavButton text="BATTLES" active={active} />
          <NavButton text="HISTORY" active={active} />
          <NavButton text="ARTIFACTS" active={active} />
          <NavButton text="GEMS" active={active} />
        </div>
        <div
          className="font-impact text-2xl text-lightRed flex flex-1 justify-end cursor-pointer"
          onClick={connectWallet}
        >
          {account
            ? `${account?.slice(0, 4)}...${account?.slice(-4)}`
            : "Connect to Wallet"}
        </div>
        <div className="navbar-button text-white" onClick={connectWallet}></div>
      </div>
    </div>
  );
};
export default Navbar;
