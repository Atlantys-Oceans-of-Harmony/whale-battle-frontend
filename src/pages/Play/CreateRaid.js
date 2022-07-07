import Web3Context from "contexts/Web3Context";
import { useContext, useEffect, useState, Fragment } from "react";
import "./index.css";

import Navbar from "../../components/NavbarV2";
import SideArrow from "../../assets/side-arrow.png";
import ConfirmButton from "../../components/Buttons/ConfirmButton/index";
import Container from "components/Container/index";
import BattleSection from "./sections/BattleSection";
import PlotSection from "./sections/PlotSection";
import ConfirmWithoutButton from "components/Buttons/ConfirmWithoutButton/index";
import RaidsSelection from "./sections/RaidsSelection";

const CreateRaid = ({ setPlayState }) => {
  const {
    account,
    sendToRaid,
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
    availablePlots,
  } = useContext(Web3Context);

  const [createRaidForm, setCreateRaidForm] = useState({
    whaleIds: [],
    plotIds: [],
    amount: "10",
  });
  const [sendingInProgress, setSendingInProgress] = useState(false);
  // const [hasSelectedPlot, setHasSelectedPlot] = useState(false);
  const handleCreateBattle = async () => {
    // if (!hasSelectedPlot) {
    //   setHasSelectedPlot(true);
    //   return;
    // }
    setSendingInProgress(true);
    await sendToRaid({
      whaleId: [...createRaidForm.whaleIds],
      plotId: [...createRaidForm.plotIds],
    });
    setSendingInProgress(false);
    setCreateRaidForm({
      whaleId: [],
      plotId: [],
      amount: "10",
    });
    // setHasSelectedPlot(false);
    // funcToRun();
    setPlayState("GO TO RAIDS");
  };
  // const funcToRun = async () => {
  //   if (createRaidForm?.whaleId == "" || createRaidForm?.plotId == "0") {
  //     if (availablePlots && availablePlots?.length > 0) {
  //       setCreateRaidForm({
  //         ...createRaidForm,
  //         whaleId: harmonyWhalesData[0]?.whaleId,
  //         plotId: availablePlots[0]?.plotId,
  //       });
  //     } else {
  //       setCreateRaidForm({
  //         ...createRaidForm,
  //         whaleId: harmonyWhalesData[0]?.whaleId,
  //         plotId: "0",
  //       });
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (harmonyWhalesData && harmonyWhalesData?.length > 0) {
  //     funcToRun();
  //   }
  // }, [harmonyWhalesData, availablePlots]);
  return (
    <>
      <div className="flex flex-col mx-12 xl:mx-48">
        <Container>
          <div className="text-white text-3xl font-bold text-center w-full mb-6">
            Send to Raid
          </div>
        </Container>
        {sendingInProgress ? (
          <div className="w-full text-white font-bold text-2xl justify-center h-96 text-center flex items-center">
            Sending to Raid...
          </div>
        ) : (
          <>
            {/* {!hasSelectedPlot ? ( */}
            <RaidsSelection
              form={createRaidForm}
              setForm={setCreateRaidForm}
              whales={harmonyWhalesData}
              plots={availablePlots}
              hideWin
            />
            {/* ) : (
              <PlotSection
                form={createRaidForm}
                setForm={setCreateRaidForm}
                whales={availablePlots}
              />
            )} */}
            <div className=" w-full flex items-center flex-row-reverse">
              {/* {hasSelectedPlot ? (
                <ConfirmWithoutButton
                  handleConfirm={() => {
                    setCreateRaidForm({ ...createRaidForm, plotId: "0" });
                    handleCreateBattle();
                  }}
                />
              ) : (
                <></>
              )} */}

              <ConfirmButton handleConfirm={handleCreateBattle} />
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default CreateRaid;
