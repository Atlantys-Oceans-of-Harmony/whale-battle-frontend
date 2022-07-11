import React from "react";
import PlotFull from "assets/plotFull.png";
import GoldFrame from "../assets/gold-frame-full.png";
import RaidsButton from "./Buttons/RaidsButton/index";
import Shade from "../assets/shade.png";
import CardGlow from "../assets/carousel_glow.png";

export default function RaidSelectCard({
  index,
  whaleSelectFunc,
  plotSelectFunc,
  whalePlotIds,
  cardNumber,
  setCardNumber,
  setCardsArray,
}) {
  return (
    <>
      {index > -1 ? (
        <div className="h-96 w-56 relative my-16 mx-2 bg-cover bg-center">
          <img src={Shade} className="absolute bottom-0 h-full p-4" />
          <img src={GoldFrame} className="absolute top-0 w-full h-full" />
          {/* <img src={GoldFrame} className=" top-0 z-30 h-full" /> */}
          <div className="h-1/2 relative w-full text-center ">
            <div className="h-full flex relative justify-center items-center">
              {whalePlotIds.whaleId ? (
                <span
                  className="text-base text-white cursor-pointer"
                  style={{
                    backgroundImage: `url(https://gen1.atlantys.one/token/image/${whalePlotIds.whaleId})`,
                  }}
                  onClick={() => {
                    whaleSelectFunc(true);
                    setCardNumber(index);
                  }}
                ></span>
              ) : (
                <RaidsButton
                  className={`text-white absolute`}
                  onClick={() => {
                    whaleSelectFunc(true);
                    setCardNumber(index);
                  }}
                  disabled={false}
                >
                  Add Whale
                </RaidsButton>
              )}
            </div>
            <hr className=" border-top-2 w-1/2 mx-auto border-solid border-red"></hr>
          </div>

          <div className="h-1/2 absolute bottom-0 w-full text-center">
            <div className="h-full flex justify-center items-center">
              <span
                className="text-base text-white cursor-pointer"
                onClick={() => {
                  plotSelectFunc(true);
                  setCardNumber(index);
                }}
              >
                {whalePlotIds.plotId && whalePlotIds.plotId !== "0" ? (
                  <img
                    src={PlotFull}
                    className="h-4/5 rounded-xl m-auto mt-3 "
                  />
                ) : (
                  <RaidsButton disabled={false}>Add Plot</RaidsButton>
                )}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-96 w-56 relative my-16 mx-2 text-center pt-40">
          <span
            className="text-white text-xl cursor-pointer"
            onClick={() => {
              setCardsArray((prev) => [...prev, "card"]);
              whaleSelectFunc(false);
              plotSelectFunc(false);
            }}
          >
            Add
          </span>
          {/* <img src={GoldFrame} className="absolute top-0 z-30 h-full" /> */}
        </div>
      )}
    </>
  );
}
