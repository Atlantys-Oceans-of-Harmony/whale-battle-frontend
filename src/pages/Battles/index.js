import Web3Context from "contexts/Web3Context";
import { useContext, useEffect, useState, Fragment } from "react";
import "./index.css";

import Navbar from "../../components/NavbarV2";
import ArenaEmblem from "../../assets/arena_emblem.png";
import TrainingEmblem from "../../assets/training_emblem.png";
import RaidEmblem from "../../assets/raid_emblem.png";
import SideArrow from "../../assets/side-arrow.png";
import LeftArrow from "../../assets/left-arrow.png";
import BattleFrame from "../../assets/battle-frame.png";
import GoldFrame from "../../assets/golden-frame.png";
import Whale1 from "../../assets/whale-1.png";
import OpponentWhale from "../../assets/placeholder_whale.png";
import AquaIcon from "../../assets/aqua.png";
import Shade from "../../assets/shade.png";
import CardGlow from "../../assets/carousel_glow.png";

import Container from "components/Container/index";
import SearchBox from "components/SearchBox/index";
import BailButton from "components/Buttons/BailButton/index";
import { Navigate } from "../../../node_modules/react-router-dom/index";

const Battle = () => {
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
    battlesToCommence,
    createdBattles,
  } = useContext(Web3Context);

  // const battlesData = [
  //   {
  //     image: Whale1,
  //     battleId: 6942,
  //     aqua: 645,
  //     date: "23.02.2022",
  //     done: true,
  //   },
  //   {
  //     image: Whale1,
  //     battleId: 15,
  //     aqua: 1242,
  //     date: "28.11.2021",
  //     done: false,
  //   },
  //   null,
  //   null,
  //   null,
  // ];

  const [selectedBattle, setSelectedBattle] = useState();

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
        <div className="text-white hover:text-red ml-7">
          <div className="font-bold">{text}</div>
        </div>
      );
    };

    return (
      <div className="flex mt-1 hover:cursor-pointer" onClick={() => {}}>
        {isActive && <img src={SideArrow} className="h-6 my-auto mr-2" />}
        {conditionRender()}
      </div>
    );
  };

  const renderErrorState = () => {
    return (
      <div className="text-white w-full py-32 text-3xl font-bold text-center">
        You have no battle selected. :(
      </div>
    );
  };

  const LeftSection = () => {
    return (
      <div className="flex-1 text-white pt-12">
        <SearchBox placeholder="Search #" />
        <div className="mt-6">
          <div className="text-xl font-bold">Sort by :</div>
          <div className="mt-4">
            <Option text="Stake" isActive />
            <Option text="Date" />
            <Option text="Progress" />
          </div>
        </div>
      </div>
    );
  };

  const BattleCard = ({ data, onClick, isSelected }) => {
    if (data) {
      return (
        <div className="relative">
          <div
            onClick={onClick}
            className="battle-card relative flex flex-col cursor-pointer z-10"
          >
            <div
              style={{
                backgroundImage: `url(https://harmony-whales-meta.herokuapp.com/token/image/${data?.whaleId})`,
              }}
              className="flex-1 mx-4 mt-4 bg-cover "
            >
              <div className="mt-6 text-center text-yellow text-xl">Battle</div>
              <div className="text-center font-impact text-yellow text-3xl">
                #{data.battleId}
              </div>
            </div>
            <div className="z-20 flex flex-col flex-1 mx-4 bg-cover ">
              <div className="text-white text-center text-3xl font-impact mt-6">
                {data?.amount}
              </div>
              <div className="text-white text-center text-xl -mt-2">Aqua</div>
              <div className="text-white text-center text-xl font-impact mt-4">
                {data.date}
              </div>
              {data.done && (
                <div className="mt-4 text-center font-impact text-yellow text-3xl">
                  DONE!
                </div>
              )}
            </div>
            <img
              src={GoldFrame}
              className="absolute top-0 w-full z-30 h-full"
            />
            <img src={Shade} className="absolute bottom-0 h-4/5 z-0 p-4" />
          </div>
          {isSelected && (
            <img src={CardGlow} className="w-full z-0 absolute top-0" />
          )}
        </div>
      );
    }
    return (
      <div className="flex-1">
        <img src={BattleFrame} className="" />
      </div>
    );
  };

  const BattleDetails = ({ data }) => {
    const { battleId, whaleId, amount } = data;
    const ImageContainer = ({ image, name, species }) => {
      return (
        <>
          <img
            src={image}
            className={image === OpponentWhale ? "pt-24" : "whale-image"}
          />
          <div className="-mt-24">
            <div className="text-white font-bold text-4xl">
              {image === OpponentWhale ? "???" : name}
            </div>
            <div className="text-white text-xl">
              {image === OpponentWhale ? "????" : species}
            </div>
          </div>
        </>
      );
    };
    return (
      <div className="flex w-full mb-10">
        <div className="flex flex-col flex-1">
          <ImageContainer
            image={`https://harmony-whales-meta.herokuapp.com/token/image/transparent/${whaleId}`} // Acadia yaha pe image url daal dena (url() type wala)
            name="Whale name"
            species="Whale species"
          />
        </div>
        <div className="flex flex-col flex-1">
          <div className="text-white text-xl mt-20">Battle</div>
          <div className="text-white text-4xl font-impact">#{battleId}</div>
          <img src={AquaIcon} className="self-center w-8 mt-6" />
          <div className="text-white text-center text-3xl font-impact -mt-3">
            {amount}
          </div>
          <div className="text-white text-center text-xl -mt-2">Aqua</div>
          <BailButton handleConfirm={{}} />
        </div>
        <div className="flex flex-col flex-1 ">
          <ImageContainer image={OpponentWhale} />
        </div>
      </div>
    );
  };

  return (
    <>
      {!account && <Navigate to="/connect" />}
      <div className="w-full flex flex-col ">
        <Navbar active="BATTLES" />
        <div className="mx-24">
          <Container>
            {selectedBattle ? (
              <BattleDetails data={selectedBattle} />
            ) : (
              renderErrorState()
            )}
          </Container>
        </div>

        <div className="flex mt-4 mx-8 xl:mx-24 gap-5">
          <LeftSection />
          <div className="flex w-3/4">
            <img src={LeftArrow} className="flex-1 my-auto w-6 h-9 " />
            <div className="flex overflow-auto mx-5 mb-6">
              {createdBattles &&
                createdBattles?.map((el) => {
                  return (
                    <BattleCard
                      data={el}
                      onClick={() => {
                        console.log(el);
                        setSelectedBattle(el);
                      }}
                      isSelected={
                        selectedBattle &&
                        selectedBattle.battleId === el.battleId
                      }
                    />
                  );
                })}
            </div>
            <img src={SideArrow} className="flex-1 my-auto w-6 h-9" />
          </div>
        </div>
      </div>
    </>
  );
};
export default Battle;
