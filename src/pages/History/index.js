import Web3Context from "contexts/Web3Context";
import { useContext, useEffect, useState, Fragment } from "react";
import "./index.css";
import { Navigate } from "../../../node_modules/react-router-dom/index";

import Navbar from "../../components/NavbarV2";
import SearchBox from "components/SearchBox/index";

import SideArrow from "../../assets/side-arrow.png";
import Placeholder from "../../assets/whale_square.png";
import AquaIcon from "../../assets/aqua.png";
import AttackIcon from "../../assets/attack_icon.png";
import DefenseIcon from "../../assets/defense_icon.png";

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

  const Option = ({ text, isActive }) => {
    const conditionRender = () => {
      if (isActive) {
        return (
          <div className="text-white active-option w-full pl-2 py">
            <div className="font-bold">{text}</div>
          </div>
        );
      }
      return (
        <div className="text-white hover:text-red ml-7">
          <div className="font-bold">{text}</div>
        </div>
      );
    };

    return (
      <div className="flex mt-1 hover:cursor-pointer" onClick={() => {}}>
        {isActive && <img src={SideArrow} className="h-6 my-auto mr-2" />}
        {conditionRender()}
      </div>
    );
  };

  const LeftSection = () => {
    return (
      <div className="flex-1 text-white pt-12">
        <SearchBox placeholder="Search #" />
        <div className="mt-6">
          <div className="text-xl font-bold">Sort by :</div>
          <div className="mt-4">
            <Option text="Stake" isActive />
            <Option text="Date" />
            <Option text="Progress" />
          </div>
        </div>
      </div>
    );
  };

  const HistoryItem = ({ data }) => {
    const {handleClick,creatorAddress,owner,acceptedBy, hideWin, battleId, amount, whaleId = 7, whaleIdAccepted = -1, isComplete, ownerTotalPoints, acceptedTotalPoints, userWon} = data
  

    const AddressCard = ({ text, address }) => {
      return (
        <div className="flex flex-col my-auto text-xl">
          <div className="text-yellow">{text}</div>
          <div className="text-white font-bold font-impact text-center">
            {address?.slice(0,4)}...{address?.slice(-4)}
          </div>
        </div>
      );
    };
    return (
      <div className="flex border-b border-yellow mt-6 gap-8">
        <img src={`https://harmony-whales-meta.herokuapp.com/token/image/${whaleIdAccepted}`} className="w-20" />
        <div
          className={`text-4xl font-bold my-auto ${
            userWon ? "text-green" : "text-red"
          }`}
        >
          {userWon ? "VICTORY" : "DEFEAT"}
        </div>
        <div className="flex flex-col my-auto text-xl">
          <div className="text-yellow">
            Battle #
            <span className="font-bold font-impact text-center">
              {battleId}
            </span>
          </div>
         
        </div>
        <div className="font-impact text-2xl text-lightRed flex my-auto">
          <img src={AquaIcon} className="w-8 h-8 my-auto mr-2" />
          {amount}
        </div>
        <AddressCard text="Battle Host" address={owner} />
        <div className="flex">
          <div className="text-white flex font-bold font-impact text-center text-xl relative w-20">
            <div className="my-auto z-10 mx-4">{ownerTotalPoints}</div>
            <img src={DefenseIcon} className="absolute top-0 " />
          </div>
          <div className="text-white flex font-bold font-impact text-center text-xl relative w-20">
            <div className="my-auto z-10 mx-4">{acceptedTotalPoints}</div>
            <img src={AttackIcon} className="absolute top-0 " />
          </div>
        </div>

        <AddressCard text="Challenger" address={acceptedBy} />
      </div>
    );
  };
const {allBattles} = useContext(Web3Context);
  const data = {
    image: Placeholder,
    isWinner: true,
    battleId: 8630,
    date: "23.02.2022",
    aqua: 645,
    host: "0x18...9fb0",
    attackPoints: 53654,
    defensePoints: 53234,
    challenger: "0x18...9fb0",
  };
  return (
    <>
      {!account && <Navigate to="/connect" />}
      <div className="w-full">
        <Navbar active="HISTORY" />
        <div className="flex mt-4 mx-8 xl:mx-24 gap-5">
          <LeftSection />
          <div className="flex flex-col w-4/5 h-screen overflow-auto mb-10">
            {allBattles?.map(e=>{
              return(<HistoryItem data={e} />)
            })}
            
        
          </div>
        </div>
      </div>
    </>
  );
};
export default History;
