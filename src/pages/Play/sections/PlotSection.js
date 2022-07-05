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
import SearchBox from "components/SearchBox/index";
import PlotFull from "assets/MarPacifico.jpeg";
import PlotThumb from "assets/MarPacifico.jpeg";
const WinStats = ({ data }) => {
  const { title, value } = data;
  const percentage = Math.max(value);
  return (
    <div className="flex  w-32">
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
          <div className="">{title}</div>
          <div className="font-impact text-lg">{parseFloat(percentage)}%</div>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
};

const WhaleCard = ({ data, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer"
      style={!isActive ? { marginLeft: 24 } : {}}
    >
      {isActive && <img src={SideArrow} className="min-w-6 h-6 my-auto pr-2" />}
      <div
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
        className="h-24 w-84 relative flex w-full font-bold text-xl overflow-hidden"
      >
        <img
          src={PlotThumb}
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
export default function PlotSection({
  isCreateBattle,
  whales = [],
  form,
  setForm,
}) {
  let { plotId } = form;
  const whaleData = whales?.find((e) => e.plotId == plotId);

  return (
    <div className="flex justify-between">
      {plotId != "" && plotId != "0" ? (
        <>
          <div className="flex-1 text-white p-4 px-6 ">
            <div className="text-2xl font-bold">Plot #{plotId}</div>
            {/* <div className="text-md font-semibold mb-10">Whale Species</div> */}
            <div className="text-xl">Depth: {whaleData?.Depth}</div>
            <div className="font-impact text-4xl">{whaleData?.rarityRank}</div>
            <div className="flex h-40 w-80 items-center justify-between">
              <WinStats
                data={{ title: "Attack", value: whaleData["Attack"] }}
              />
              <WinStats
                data={{ title: "Defense", value: whaleData["Defense"] }}
              />
            </div>
            <div className="h-48 w-80 flex items-center justify-center">
              <WinStats
                data={{ title: "Resource", value: whaleData["Resource"] }}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <div>
              <img src={PlotFull} className="m-8 w-64 rounded-2xl" />
            </div>
          </div>
        </>
      ) : (
        <div className="text-2xl w-full h-full my-auto text-center text-white">
          You have no Plots!
        </div>
      )}
      <div className="flex flex-1 text-white">
        <div className="w-2/3 overflow-auto h-128">
          {whales?.map((e) => {
            return (
              <WhaleCard
                onClick={() => {
                  setForm({ ...form, plotId: e.plotId });
                }}
                data={{ ...e }}
                isActive={e.plotId == plotId ? true : false}
              />
            );
          })}
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
