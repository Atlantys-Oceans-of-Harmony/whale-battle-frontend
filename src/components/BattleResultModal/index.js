import React from "react";
import "./style.css";
import CrossIcon from "../../assets/cross_icon.png";

const Emblem = (isWinner) => {
  return isWinner
    ? require("../../assets/victory_emblem.png")
    : require("../../assets/defeat_emblem.png");
};

const Banner = (isWinner) => {
  return isWinner
    ? require("../../assets/victory_banner.png")
    : require("../../assets/defeat_banner.png");
};

export default function BattleResultModal({ data={}, closeModal }) {
  const {
    image,
    userWon,
    battleId,
   amount,
    owner,
    acceptedBy,
    ownerTotalPoints,
    acceptedTotalPoints,
  } = data;
  return (
    <div className="text-white flex overlay ">
      <img
        src={CrossIcon}
        className="absolute top-20 right-20 w-10 cursor-pointer"
        onClick={closeModal}
      />
      <div className="mx-auto flex flex-col">
        <img src={Emblem(userWon)} className="emblem" />
        <div className="relative text-white">
          <div className="-mt-28 flex flex-col">
            <img
              src={Banner(userWon)}
              className={`absolute banner mx-auto ${
                userWon ? "winner" : "loser"
              }`}
            />
            <div className="mt-12 z-10 flex flex-col">
              <div className="text-center text-yellow text-lg">
                Battle Summary
              </div>
              <div className="text-center text-yellow text-xl font-impact font-bold">
                #{battleId}
              </div>
              <div
                className={`text-center text-yellow text-sm ${
                  userWon ? "mt-10" : "mt-16"
                }`}
              >
                {userWon ? "Winnings" : "Losses"}
              </div>
              <div className="text-center text-white text-xl font-impact font-bold -mt-1">
                {amount}
              </div>
              <div
                className={`flex mx-auto ${
                  userWon ? "mt-4 gap-6" : "mt-8 gap-12"
                }`}
              >
                <div className="text-center text-white text-lg font-impact font-bold -mt-1">
                  {acceptedTotalPoints}
                </div>
                <div className="text-center text-white text-lg font-impact font-bold -mt-1">
                  {ownerTotalPoints}
                </div>
              </div>
              <div
                className={`flex mx-auto mt-2 ${userWon ? "gap-4" : "gap-8"}`}
              >
                <div className="text-center text-yellow text-sm w-16 leading-3">
                  Battle Host
                </div>
                <div className="text-center text-yellow text-sm w-16 leading-3">
                  Battle Challenger
                </div>
              </div>
              <div className="flex mx-auto mt-2 gap-6">
                <div className="text-center text-white text-sm font-impact font-bold -mt-1">
                  {owner?.slice(0,3)}...{owner?.slice(-3)}
                </div>
                <div className="text-center text-white text-sm font-impact font-bold -mt-1">
                  {acceptedBy?.slice(0,3)}...{acceptedBy?.slice(-3)}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
