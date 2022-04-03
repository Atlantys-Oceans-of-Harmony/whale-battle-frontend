import Web3Context from "contexts/Web3Context";
import { useContext, useEffect, useState, Fragment } from "react";
import "./index.css";

import Navbar from "../../components/NavbarV2";
import ArenaEmblem from "../../assets/arena_emblem.png";
import TrainingEmblem from "../../assets/training_emblem.png";
import RaidEmblem from "../../assets/raid_emblem.png";
import SideArrow from "../../assets/side-arrow.png";
import Container from "components/Container/index";
import SearchBox from "components/SearchBox/index";

const Battle = () => {
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

  const renderErrorState = () => {
    return (
      <div className="text-white w-full py-32 text-3xl font-bold text-center">
        You have no battle selected. :(
      </div>
    );
  };

  const LeftSection = () => {
    return (
      <div className="flex-none text-white pt-12">
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

  return (
    <>
      <div className="w-full flex flex-col ">
        <Navbar active="BATTLES" />
        <Container>{renderErrorState()}</Container>
        <div className="flex mx-12 xl:mx-48">
          <LeftSection />
          <div className="flex-1">ABCD</div>
        </div>
      </div>
    </>
  );
};
export default Battle;
