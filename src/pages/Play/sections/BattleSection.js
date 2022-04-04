import React from "react";
import WhaleBlue from "../../../assets/whale_blue.png";
import AquaIcon from "../../../assets/aqua.png";
import SideArrow from "../../../assets/side-arrow.png";
import GoldBar from "../../../assets/gold-bar.png";
import "./style.css";

import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import WhaleThumbActive from "../../../assets/whale_thumb.jpg";
import GlowBackground from "../../../assets/glow-2.png";

export default function BattleSection({ isCreateBattle, whales, form, setForm }) {
  const { whaleId } = form;

  const WinStats = ({ data }) => {
    const { won, lost } = data;
    const percentage = (won / (won + lost)) * 100;
    return (
      <div className="flex mt-10 h-24 mr-20">
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

  const WhaleCard = ({ data, isActive }) => {
    console.log(data)
    return (
      <div
        className="flex cursor-pointer"
        style={!isActive ? { marginLeft: 24 } : {}}
      >
        {isActive && (
          <img src={SideArrow} className="min-w-6 h-6 my-auto pr-2" />
        )}
        <div
          style={{
            backgroundImage: `url(https://harmony-whales-meta.herokuapp.com/token/image/${data.whaleId})`,
            backgroundSize: "cover",
          }}
          className="h-24 flex w-full font-bold text-xl"
        >
          {isActive && (
            <div className="w-full pl-4 glow flex">
              <div className="my-auto">{data.whaleId}</div>
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
      <div className="flex mt-1 hover:cursor-pointer" onClick={() => { }}>
        {conditionRender()}
      </div>
    );
  };

  return (
    <div className="flex justify-between">
      <div className="flex-1 text-white p-4 px-6 ">
        <div className="text-2xl font-bold">Whale Name</div>
        <div className="text-md font-semibold mb-10">Whale Species</div>
        <div className="text-xl">Rarity Rank:</div>
        <div className="font-impact text-4xl">69420</div>
        <WinStats data={{ won: 925, lost: 791 }} />
      </div>
      <div className="flex-1 flex-col">
        <img src={WhaleBlue} />
        {isCreateBattle && (
          <div className="flex border-white border-2 p-1 px-2 w-36 mx-auto cursor-pointer">
            <img src={AquaIcon} className="w-6" />
            <div className="flex-1 text-white text-center">Add Amount</div>
          </div>
        )}
      </div>
      <div className="flex flex-1 text-white">
        <div className="w-2/3 overflow-auto h-128">
          {whales?.map((e) => {
            return (<WhaleCard data={{ ...e }} isActive={e.whaleId == whaleId ? true : false} />)
          })}

          <WhaleCard
            data={{ name: "Whale name", image: WhaleThumbActive }}
            isActive
          />
          <WhaleCard data={{ name: "Whale name", image: WhaleThumbActive }} />
          <WhaleCard data={{ name: "Whale name", image: WhaleThumbActive }} />
          <WhaleCard data={{ name: "Whale name", image: WhaleThumbActive }} />
          <WhaleCard data={{ name: "Whale name", image: WhaleThumbActive }} />
          <WhaleCard data={{ name: "Whale name", image: WhaleThumbActive }} />
          <WhaleCard data={{ name: "Whale name", image: WhaleThumbActive }} />
        </div>
        {/* <div className="w-1/3 flex flex-col pl-2">
          <Option text="All" isActive />
          <Option text="Blue Whale" />
          <Option text="Green Whale" />
        </div> */}
      </div>
    </div>
  );
}
