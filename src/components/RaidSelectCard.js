import React from "react";
import PlotFull from "assets/plotFull.png";

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
        <div className="h-96 w-56 border-2 border-solid border-red my-16 mx-2">
          <div className="h-1/2 w-full text-center">
            <div className="h-full ">
              <span
                className="bg-white cursor-pointer"
                onClick={() => {
                  whaleSelectFunc(true);
                  setCardNumber(index);
                }}
              >
                {whalePlotIds.whaleId ? (
                  <img
                    src={`https://gen1.atlantys.one/token/image/transparent/${whalePlotIds.whaleId}`}
                    className="h-full m-auto mt"
                  />
                ) : (
                  <span>Select Whale</span>
                )}
              </span>
            </div>
          </div>
          <hr></hr>
          <div className="h-1/2 w-full text-center">
            <div className="h-full">
              <span
                className="bg-white cursor-pointer"
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
                  <span>Select Plot</span>
                )}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-96 w-56 border-2 border-solid border-red my-16 mx-2 text-center pt-40">
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
        </div>
      )}
    </>
  );
}
