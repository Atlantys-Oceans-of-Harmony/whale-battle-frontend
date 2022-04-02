import NavButton from "components/Buttons/NavButton/index";
import Web3Context from "contexts/Web3Context";
import { useContext, useEffect, useState, Fragment } from "react";
import "./style.css";

import DividerTop from "../../assets/divider-top.png";

const Navbar = ({ active }) => {
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
    <div>
      <img src={DividerTop} />
      <div className="w-full flex justify-center border-b border-red">
        <NavButton text="HOME" active={active} />
        <NavButton text="PLAY" active={active} />
        <NavButton text="BATTLES" active={active} />
        <NavButton text="HISTORY" active={active} />
      </div>
    </div>
  );
};
export default Navbar;
