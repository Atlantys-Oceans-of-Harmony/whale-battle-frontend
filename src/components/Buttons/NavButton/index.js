import Web3Context from "contexts/Web3Context";
import { useContext, useEffect, useState, Fragment } from "react";
import "./style.css";
import DownArrow from "../../../assets/down-arrow.png";
import { Link } from "../../../../node_modules/react-router-dom/index";

const NavButton = ({ text, active }) => {
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

  const isActive = () => {
    return text === active;
  };
  const renderButton = () => {
    if (isActive()) {
      return (
        <div className="active navbar-button px-8 pb-4 text-white">
          <div className="w-full flex justify-center">
            <img src={DownArrow} className="arrow" />
          </div>
          {text}
        </div>
      );
    }
    return (
      <div className="navbar-button pt-6 px-8 pb-4 text-lightRed hover:text-red">
        {text}
      </div>
    );
  };

  return (
    <Link to={text === "HOME" ? "/" : "/" + text.toLowerCase()}>
      {renderButton()}
    </Link>
  );
};
export default NavButton;
