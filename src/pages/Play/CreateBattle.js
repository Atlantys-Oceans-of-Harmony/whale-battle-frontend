import Web3Context from "contexts/Web3Context";
import { useContext, useEffect, useState, Fragment } from "react";
import "./index.css";

import Navbar from "../../components/NavbarV2";
import SideArrow from "../../assets/side-arrow.png";
import ConfirmButton from "../../components/Buttons/ConfirmButton/index";
import Container from "components/Container/index";
import BattleSection from "./sections/BattleSection";

const CreateBattle = () => {
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
    harmonyWhales,
  } = useContext(Web3Context);

  const [createBattleForm, setCreateBattleForm] = useState({
    whaleId: "",
    amount: "10",


  });
  return (
    <>
      <div className="flex flex-col mx-12 xl:mx-48">
        <Container>
          <div className="text-white text-3xl font-bold text-center w-full mb-6">
            CREATE BATTLE
          </div>
        </Container>
        <BattleSection form={createBattleForm} setForm={setCreateBattleForm} isCreateBattle whales={harmonyWhales} />
        <ConfirmButton />
      </div>
    </>
  );
};
export default CreateBattle;
