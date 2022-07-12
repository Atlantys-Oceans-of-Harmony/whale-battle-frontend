import React from "react";
import PlotThumb2 from "assets/plotThumb2.png";
import GoldFrame from "../assets/gold-frame-full.png";
import RaidsButton from "./Buttons/RaidsButton/index";
import Fade from "../assets/top_fade.png";
import CardGlow from "../assets/card_glow_2.png";
import CardNewGlow from "../assets/card_glow_3.png";
import AddIcon from "../assets/AddIcon.png";

export default function RaidSelectCard({
  index,
  whaleSelectFunc,
  plotSelectFunc,
  whalePlotIds,
  cardNumber,
  setCardNumber,
  setCardsArray,
  setPageNumber,
  cards,
}) {
  return (
    <>
      {index > -1 ? (
        <div className="h-full relative">
          {cardNumber === index && (
            <img src={CardGlow} className="absolute h-full" />
          )}

          <div className="h-124 w-64 relative my-4 mx-2 ">
            <img
              src={GoldFrame}
              className="absolute top-0 z-10 w-full h-full"
            />
            {/* <img src={GoldFrame} className=" top-0 z-30 h-full" /> */}
            <div className="h-full  relative">
              <div className="h-1/2 relative w-full text-center ">
                <div className="h-full text-sm flex relative justify-center items-center">
                  {whalePlotIds.whaleId ? (
                    <span className="h-full w-10/12 py-5 z-0 absolute top-1/2 -translate-y-2/4 overflow-hidden cursor-pointer">
                      <img src={Fade} className="absolute top-6" />
                      <img
                        src={`https://gen1.atlantys.one/token/image/${whalePlotIds.whaleId}`}
                        className="w-full overflow-hidden"
                        onClick={() => {
                          whaleSelectFunc(true);
                          plotSelectFunc(false);
                          setCardNumber(index);
                        }}
                      />
                    </span>
                  ) : (
                    <button
                      className="text-white text-base absolute top-1/2 -translate-y-2/4 z-20 bg-red p-1 font-impact"
                      onClick={() => {
                        whaleSelectFunc(true);
                        setCardNumber(index);
                        plotSelectFunc(false);
                      }}
                      disabled={false}
                    >
                      Add Whale
                    </button>
                  )}
                </div>
              </div>
              <hr className="h-0.5 text-red bg-red w-4/6 mx-auto"></hr>
              <div className="h-1/2 absolute bottom-0 w-full text-center">
                <div className="h-full flex justify-center items-center">
                  {whalePlotIds.plotId && whalePlotIds.plotId !== "0" ? (
                    <span
                      className="text-white px-4 pt-1 pb-6 h-full cursor-pointer overflow-hidden"
                      onClick={() => {
                        plotSelectFunc(true);
                        setCardNumber(index);
                        whaleSelectFunc(false);
                      }}
                    >
                      <img src={Fade} className="absolute" />
                      <img
                        src={PlotThumb2}
                        className="h-full overflow-hidden "
                      />
                    </span>
                  ) : (
                    <button
                      className="text-white text-base absolute z-20 bottom-1/2 bg-red p-1 font-impact"
                      disabled={false}
                      onClick={() => {
                        plotSelectFunc(true);
                        whaleSelectFunc(false);
                        setCardNumber(index);
                      }}
                    >
                      Add Plot
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className=" h-full relative ">
          <img src={CardNewGlow} className="absolute h-full" />

          <div className="h-128 w-64 relative text-center">
            <img
              className="absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 cursor-pointer"
              onClick={() => {
                setCardsArray((prev) => [...prev, prev[prev.length - 1] + 1]);
                whaleSelectFunc(true);
                plotSelectFunc(false);

                cards.length &&
                  cards.length % 2 === 0 &&
                  setPageNumber((prev) => prev + 1);
              }}
              src={AddIcon}
            />
          </div>
        </div>
      )}
    </>
  );
}
