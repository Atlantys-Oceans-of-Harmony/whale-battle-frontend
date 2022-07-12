import React, { useState } from "react";
import WhaleBlue from "../../../assets/whale_blue.png";
import AquaIcon from "../../../assets/aqua.png";
import SideArrow from "../../../assets/side-arrow.png";
import GoldBar from "../../../assets/gold-bar.png";
import PlotThumb2 from "assets/plotThumb2.png";
import ListFadeT from "assets/ListFadeT.png";
import ListFadeB from "assets/ListFadeB.png";
import LeftArrow from "../../../assets/left-arrow.png";
import "./style.css";

import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import WhaleThumbActive from "../../../assets/whale_thumb.jpg";
import GlowBackground from "../../../assets/glow-2.png";
import SearchBox from "components/SearchBox/index";
import RaidSelectCard from "components/RaidSelectCard";
const WinStats = ({ data, hideWin }) => {
  const { won, lost } = data;
  const percentage = (won / Math.max(1, won + lost)) * 100;
  return (
    <div className={`flex mt-10 h-24 mr-20 ${hideWin ? "invisible" : ""}`}>
      <div className="flex-1">
        <CircularProgressbarWithChildren
          strokeWidth={10}
          className="flex-1"
          value={percentage}
          styles={buildStyles({
            strokeLinecap: "butt",
            textSize: "16px",
            pathTransitionDuration: 0.5,

            // Colors
            pathColor: `#00A361`,
            trailColor: "#d6d6d655",
          })}
        >
          <div className="">Win Rate</div>
          <div className="font-impact text-2xl">
            {parseFloat(percentage).toFixed(2)}%
          </div>
        </CircularProgressbarWithChildren>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="text-green">
          <span className="font-impact text-2xl">{won} </span>WON
        </h1>
        <h1 className="text-red mt-4">
          <span className="font-impact text-2xl">{lost} </span> LOST
        </h1>
      </div>
    </div>
  );
};

const WhaleCard = ({ data, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex relative cursor-pointer"
      style={!isActive ? { marginLeft: 24 } : {}}
    >
      <img src={ListFadeT} className="absolute top-0" />
      {isActive && <img src={SideArrow} className="min-w-6 h-6 my-auto pr-2" />}
      <div
        style={{
          backgroundImage: `url(https://gen1.atlantys.one/token/image/${data.whaleId})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
        className="h-24 flex w-full font-bold text-xl"
      >
        {isActive && (
          <div className="w-full pl-4 glow flex">
            <div className="my-auto">Whale #{data.whaleId}</div>
          </div>
        )}
      </div>
      {isActive && (
        <img src={GoldBar} className="h-24 min-w-6 h-6 my-auto -pr-2" />
      )}
    </div>
  );
};

const PlotCard = ({ data, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex relative cursor-pointer"
      style={!isActive ? { marginLeft: 24 } : {}}
    >
      <img src={ListFadeB} className="absolute bottom-0" />
      {isActive && <img src={SideArrow} className="min-w-6 h-6 my-auto pr-2" />}
      <div
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
        className="h-24 relative flex w-full font-bold text-xl overflow-hidden"
      >
        <img
          src={PlotThumb2}
          alt=""
          className="absolute object-cover w-full h-24 min-w-6 h-6 overflow-hidden -z-10"
        />
        {isActive && (
          <div className="w-full pl-4 glow flex">
            <div className="my-auto">Plot #{data.plotId}</div>
          </div>
        )}
      </div>
      {isActive && (
        <img src={GoldBar} className="h-24 min-w-6 h-6 my-auto -pr-2" />
      )}
    </div>
  );
};

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
      <div className="text-white hover:text-red pl-2">
        <div className="font-bold">{text}</div>
      </div>
    );
  };

  return (
    <div className="flex mt-1 hover:cursor-pointer" onClick={() => {}}>
      {conditionRender()}
    </div>
  );
};
export default function RaidsSelection({
  isCreateBattle,
  whales = [],
  plots = [],
  form,
  setForm,
  hideWin,
}) {
  let { whaleIds, plotIds } = form;
  const [whaleSelect, setWhaleSelect] = useState(true);
  const [plotSelect, setPlotSelect] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardsArray, setCardsArray] = useState([0]);
  const [page, setPage] = useState(0);
  const whaleData = whales?.find((e) => e.whaleId == whaleIds[selectedCard]);

  const handlePageUp = () => {
    if (page * 2 + 2 < whales.length) {
      setPage(page + 1);
    }
  };

  const handlePageDown = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  return (
    <div className="flex items-center justify-between">
      {whaleIds[selectedCard] != "" ? (
        <>
          <div className="flex-1 text-white p-4 px-6 ">
            <div className="text-xl">Rarity Rank:</div>
            <div className="font-impact text-4xl">{whaleData?.rarityRank}</div>

            <WinStats
              hideWin={hideWin}
              data={{ won: whaleData?.wins, lost: whaleData?.loses }}
            />
          </div>
        </>
      ) : (
        <div className="text-2xl w-full h-full my-auto text-center text-white">
          You have no whales!
        </div>
      )}
      <div className="flex flex-1 mr-4 w-3/4 justify-center grow">
        <img
          src={LeftArrow}
          className="my-auto mr-4 w-6 h-9 cursor-pointer"
          onClick={handlePageDown}
        />
        {whales.length === cardsArray.length
          ? cardsArray?.slice(page, page + 3).map((card, index) => {
              return (
                <RaidSelectCard
                  key={index}
                  index={card}
                  cardNumber={selectedCard}
                  setCardNumber={setSelectedCard}
                  whaleSelectFunc={setWhaleSelect}
                  plotSelectFunc={setPlotSelect}
                  setCardsArray={setCardsArray}
                  whalePlotIds={{
                    whaleId: whaleIds[card],
                    plotId: plotIds[card],
                  }}
                />
              );
            })
          : cardsArray?.slice(page, page + 2).map((card, index) => {
              return (
                <RaidSelectCard
                  key={index}
                  index={card}
                  cardNumber={selectedCard}
                  setCardNumber={setSelectedCard}
                  whaleSelectFunc={setWhaleSelect}
                  plotSelectFunc={setPlotSelect}
                  setCardsArray={setCardsArray}
                  whalePlotIds={{
                    whaleId: whaleIds[card],
                    plotId: plotIds[card],
                  }}
                />
              );
            })}
        {whales.length > cardsArray.length && (
          <RaidSelectCard
            whaleSelectFunc={setWhaleSelect}
            plotSelectFunc={setPlotSelect}
            setCardsArray={setCardsArray}
            setPageNumber={setPage}
            cards={cardsArray}
          />
        )}
        <img
          src={SideArrow}
          className="my-auto ml-4 w-6 h-9 cursor-pointer"
          onClick={handlePageUp}
        />
      </div>

      {whaleSelect && (
        <div className="flex relative flex-0 text-white">
          <div className="w-48 overflow-auto h-128">
            {whales?.map((e) => {
              return (
                !whaleIds.includes(e.whaleId) && (
                  <WhaleCard
                    onClick={() => {
                      const whaleIds2 = form.whaleIds;
                      whaleIds2[selectedCard] = e.whaleId;
                      const plotIds2 = form.plotIds;
                      plotIds2[selectedCard] = "0";
                      setForm({
                        ...form,
                        whaleIds: [...whaleIds2],
                        plotIds: [...plotIds],
                      });
                    }}
                    data={{ ...e }}
                  />
                )
              );
            })}
          </div>
        </div>
      )}
      {plotSelect && (
        <div className="flex flex-0 text-white">
          <div className="w-48 overflow-auto h-128">
            {plots?.map((e) => {
              return (
                !plotIds.includes(e.plotId) && (
                  <PlotCard
                    onClick={() => {
                      const plotIds2 = form.plotIds;
                      plotIds2[selectedCard] = e.plotId;
                      setForm({
                        ...form,
                        plotIds: [...plotIds2],
                      });
                    }}
                    data={{ ...e }}
                  />
                )
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
