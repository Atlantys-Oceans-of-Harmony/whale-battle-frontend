import Web3Context from "contexts/Web3Context";
import { useContext, useEffect, useState, Fragment } from "react";

import "./style.css";
import "react-circular-progressbar/dist/styles.css";

import GoldFrame from "../../../assets/gold-frame-full.png";
import LockedFrame from "../../../assets/locked-frame.png";
import AquaIcon from "../../../assets/aqua.png";
import Shade from "../../../assets/shade.png";
import CardGlow from "../../../assets/carousel_glow.png";
import RefreshIcon from "../../../assets/refresh.png";

export default function FindBattleSection({ battles, form, setForm }) {
  console.log(battles);

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
  } = useContext(Web3Context);

  const [currentBattles, setCurrentBattles] = useState();

  useEffect(() => {
    handleRefresh();
  }, [battles]);

  const handleRefresh = () => {
    const shuffledBattles = battles.sort(() => 0.5 - Math.random());
    setCurrentBattles(
      shuffledBattles &&
        shuffledBattles?.length > 2 &&
        shuffledBattles?.slice(0, 3)
    );
  };

  const BattleCard = ({ data, onClick, isSelected }) => {
    if (data) {
      return (
        <div className="flex-1 flex relative">
          {isSelected && (
            <img src={CardGlow} className="w-full h-full z-0 absolute top-0" />
          )}

          <div
            onClick={onClick}
            className={`mx-auto mt-10 relative flex flex-col cursor-pointer battle-card w-72`}
          >
            <div
              style={{
                backgroundImage: `url(https://harmony-whales-meta.herokuapp.com/token/image/${data.whaleId})`,
              }}
              className="flex-1 mx-4 mt-4 bg-cover"
            >
              <div className="text-center font-bold font-impact text-yellow text-xl mt-6 mb-32">
                Battle #{data.battleId}
              </div>
            </div>
            <div className="flex flex-col flex-1 mx-4 mb-4 pb-4 z-20">
              <img src={AquaIcon} className="self-center w-6 mt-6" />
              <div className="text-white text-center text-2xl font-impact -mt-3">
                {data?.amount}
              </div>
              <div className="text-white text-center text-lg -mt-2">Aqua</div>
              <div className="text-center text-yellow text-md mt-4">HOST</div>
              <div className="text-white text-center text-lg font-impact mb-6">
                {`${data?.owner?.slice(0, 4)}...${data?.owner?.slice(-4)}`}
              </div>
            </div>
            <img src={Shade} className="absolute bottom-0 h-4/5 z-10 p-4" />
            <img
              src={GoldFrame}
              className="absolute top-0 w-full h-full z-30"
            />
          </div>
        </div>
      );
    }
    return (
      <div className="flex-1 mx-10">
        <img src={LockedFrame} className="" />
      </div>
    );
  };
  return (
    <div className="flex justify-between">
      {currentBattles &&
        currentBattles.map((e) => {
          return (
            <BattleCard
              data={e}
              isSelected={form?.battleId == e?.battleId}
              onClick={() =>
                setForm({ ...form, battleId: e?.battleId, amount: e?.amount })
              }
            />
          );
        })}

      <div
        className="absolute right-20 bottom-20 flex cursor-pointer"
        onClick={() => handleRefresh()}
      >
        <img src={RefreshIcon} className="w-6 h-6  my-auto mr-4" />
        <div className="text-white text-3xl font-bold">REFRESH</div>
      </div>
    </div>
  );
}
