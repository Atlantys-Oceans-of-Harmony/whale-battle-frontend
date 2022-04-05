import Web3Context from "contexts/Web3Context";
import { useContext, useEffect, useState, Fragment } from "react";

import "./style.css";
import "react-circular-progressbar/dist/styles.css";

import GoldFrame from "../../../assets/gold-frame-full.png";
import LockedFrame from "../../../assets/locked-frame.png";
import AquaIcon from "../../../assets/aqua.png";

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

  const BattleCard = ({ data, onClick, isSelected }) => {
    if (data) {
      return (
        <div onClick={onClick} className={`flex-1 ${isSelected ? "scale-125" : ""} mx-10 relative flex flex-col cursor-pointer`}>
          <div
            style={{
              backgroundImage: `url(https://harmony-whales-meta.herokuapp.com/token/image/${data.whaleId})`,
            }}
            className="flex-1 mx-4 mt-4 bg-cover shadow"
          >
            <div className="text-center font-bold text-yellow text-xl mt-6 mb-32">
              Battle #{data.battleId}
            </div>
          </div>
          <div className="bg-black flex flex-col flex-1 mx-4 mb-4 pb-4 ">
            <img src={AquaIcon} className="self-center w-8 mt-6" />
            <div className="text-white text-center text-3xl font-impact -mt-3">
              {data?.amount}
            </div>
            <div className="text-white text-center text-xl -mt-2">Aqua</div>
            <div className="text-center text-yellow text-lg mt-4">HOST</div>
            <div className="text-white text-center text-xl font-impact ">
              {`${data?.owner?.slice(0, 4)}...${data?.owner?.slice(-4)}`}
            </div>
            {data.done && (
              <div className="mt-4 text-center font-impact text-yellow text-3xl">
                DONE!
              </div>
            )}
          </div>
          <img src={GoldFrame} className="absolute top-0 w-full" />
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
    <div className="flex justify-between mt-10">
      {battles && battles?.length > 2 && battles?.slice(0, 3)?.map((e) => {
        return (<BattleCard
          data={e}
          isSelected={form?.battleId == e?.battleId}
          onClick={() => setForm({ ...form, battleId: e?.battleId, amount: e?.amount })}
        />)
      })}

      {/* <BattleCard />
      <BattleCard /> */}
    </div>
  );
}
