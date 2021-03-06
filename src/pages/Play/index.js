import Web3Context from "contexts/Web3Context";
import { useContext, useEffect, useState, Fragment } from "react";
import "./index.css";

import Navbar from "../../components/NavbarV2";
import ArenaEmblem from "../../assets/arena_emblem.png";
import TrainingEmblem from "../../assets/training_emblem.png";
import RaidEmblem from "../../assets/raid_emblem.png";
import SideArrow from "../../assets/side-arrow.png";
import ConfirmButton from "../../components/Buttons/ConfirmButton/index";
import CreateBattle from "./CreateBattle";
import FindBattle from "./FindBattle";
import Container from "components/Container/index";
import {
  Navigate,
  useNavigate,
} from "../../../node_modules/react-router-dom/index";

const Play = () => {
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
  } = useContext(Web3Context);

  const navigate = useNavigate();
  const [playState, setPlayState] = useState();
  const [selectedState, setSelectedState] = useState("FIND BATTLE");

  useEffect(() => {
    if (!account) {
      navigate("/connect", { state: { from: "/play" } });
    }
  }, [account]);

  const handleConfirm = () => {
    setPlayState(selectedState);
  };

  const Emblem = ({ title, image, subtitle, isActive }) => {
    return (
      <div
        style={isActive ? {} : { opacity: 0.5 }}
        className={
          isActive
            ? "selection-active pb-8 px-16 flex-1 flex flex-col"
            : "pb-8 flex-1 flex flex-col"
        }
      >
        <img src={image} className="h-48 self-center" />
        <div className="title">{title}</div>
        <div className="subtitle">{subtitle}</div>
      </div>
    );
  };

  const Option = ({ text, extra }) => {
    const isActive = () => {
      return text === selectedState;
    };
    const conditionRender = () => {
      if (isActive()) {
        return (
          <div className="text-white ">
            <div className="button text-red  font-bold">{text}</div>
            {extra && <div className="text-sm">{extra}</div>}
          </div>
        );
      }
      return (
        <div className="text-white hover:text-red">
          <div className="button font-bold">{text}</div>
          {extra && <div className="text-sm">{extra}</div>}
        </div>
      );
    };

    return (
      <div
        className="flex mt-4 hover:cursor-pointer"
        onClick={() => setSelectedState(text)}
      >
        {isActive() && (
          <img src={SideArrow} className="h-5 my-auto -ml-8 mr-4" />
        )}
        {conditionRender()}
      </div>
    );
  };

  const DefaultView = () => {
    return (
      <div className="flex flex-col mx-12 xl:mx-48">
        {/* Emblem */}
        <Container>
          <Emblem
            title="TRAINING"
            subtitle="COMING SOON"
            image={TrainingEmblem}
            isActive={false}
          />

          <Emblem
            title="ARENA"
            subtitle="ONE vs ONE"
            image={ArenaEmblem}
            isActive={true}
          />
          <Emblem
            title="RAID"
            subtitle="COMING SOON"
            image={RaidEmblem}
            isActive={false}
          />
        </Container>

        {/* Description */}
        <div className="w-64 text-white  flex border-b border-white self-center mt-6 pb-6 leading-5 font-bold">
          Crush your enemies in an epic 1v1 battle. Go up against players all
          over the world and become the Oceanverse Legend.
        </div>

        {/* Buttons */}
        <div className="buttons-container self-center my-4">
          <Option text="FIND BATTLE" />
          <Option text="CREATE BATTLE" />
          {/* <Option text="JOIN FRIEND" extra="REWARDS DISABLED" /> */}
        </div>

        {/* ConfirmButton */}
        <ConfirmButton handleConfirm={handleConfirm} />
      </div>
    );
  };

  const renderView = () => {
    switch (playState) {
      case "FIND BATTLE":
        return <FindBattle />;
        break;
      case "CREATE BATTLE":
        return <CreateBattle />;
      default:
        return <DefaultView />;
        break;
    }
  };

  return (
    <>
      <div className="w-full flex flex-col ">
        <Navbar active="PLAY" />
        {renderView()}
        {playState && (
          <div
            className="absolute left-20 bottom-20 flex cursor-pointer"
            onClick={() => setPlayState()}
          >
            <img src={SideArrow} className="w-6 mr-4" />
            <div className="text-white text-3xl font-bold">RETURN TO PLAY</div>
          </div>
        )}
      </div>
    </>
  );
};
export default Play;
