import Web3Context from "contexts/Web3Context";
import { useContext, useEffect, useState, Fragment } from "react";
import "./index.css";

import Navbar from "../../components/NavbarV2";
import SideArrow from "../../assets/side-arrow.png";
import ConfirmButton from "../../components/Buttons/ConfirmButton/index";
import Container from "components/Container/index";
import BattleSection from "./sections/BattleSection";
import FindBattleSection from "./sections/FindBattleSection";
import { useNavigate } from "react-router-dom";

const FindBattle = () => {
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
    harmonyWhalesData,
    battlesToJoin,
  } = useContext(Web3Context);
  const navigate = useNavigate();
  const [joinBattleForm, setJoinBattleForm] = useState({
    whaleId: "",
    battleId: "",
  });
  const [findBattleView, setFindBattleView] = useState(false);

  const handleJoinBattle = async () => {
    console.log(joinBattleForm);
    if (joinBattleForm.battleId != "") {
      await joinBattle({ ...joinBattleForm });
    } else alert("Select a battle first");
  };
  useEffect(() => {
    const funcToRun = async () => {
      if (joinBattleForm?.whaleId == "") {
        setJoinBattleForm({
          ...joinBattleForm,
          whaleId: harmonyWhalesData[0]?.whaleId,
        });
      }
    };
    if (harmonyWhalesData && harmonyWhalesData?.length > 0) {
      funcToRun();
    }
  }, [harmonyWhalesData]);

  return (
    <>
      <div className="flex flex-col mx-12 xl:mx-48">
        <Container>
          <div className="text-white text-3xl font-bold text-center w-full mb-6">
            {findBattleView ? "FIND BATTLE" : "CHOOSE YOUR WHALE"}
          </div>
        </Container>
        {findBattleView ? (
          <FindBattleSection
            form={joinBattleForm}
            setForm={setJoinBattleForm}
            battles={battlesToJoin}
          />
        ) : (
          <BattleSection
            form={joinBattleForm}
            setForm={setJoinBattleForm}
            whales={harmonyWhalesData}
          />
        )}

        <ConfirmButton
          className="z-10"
          handleConfirm={
            findBattleView
              ? handleJoinBattle
              : () => {
                  joinBattleForm.whaleId != ""
                    ? setFindBattleView(true)
                    : alert("Select a whale first");
                }
          }
        />
      </div>
    </>
  );
};
export default FindBattle;
