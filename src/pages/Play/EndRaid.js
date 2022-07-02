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
import ConfirmButton from "components/Buttons/ConfirmButton/index";
import BattleProgressModal from "components/BattleProgressModal";

import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BattleResultModal from "components/BattleResultModal/index";
import Primary from "components/Buttons/Primary";
import RaidsButton from "components/Buttons/RaidsButton/index";

const EndRaid = ({ setPlayState }) => {
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
    commenceBattles,
    battlesToCommence,
    createdBattles,
    allWhalesData,
    harmonyWhales,
    raidResult,
    currTime,
    raidLockedPeriod,
    returnRaid,
  } = useContext(Web3Context);
  console.log(raidResult);
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
  console.log(createdBattles);
  const navigate = useNavigate();
  const [selectedBattle, setSelectedBattle] = useState();
  const [selectedBattleModalDetail, setSelectedBattleModalDetail] = useState();
  const { viewBattleId } = useParams();
  const [currentBattles, setCurrentBattles] = useState();
  const [page, setPage] = useState(0);
  const [openModal, setOpenModal] = useState(undefined);
  const [battleSummary, setBattleSummary] = useState(); //battle Summary would contain the win/lose results. If this is has a value, the battle has ended and show user the popup instead of video
  const [battlesToShow, setBattlesToShow] = useState([]);
  const [sortOption, setSortOption] = useState("Date");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (viewBattleId) {
      if (openModal == undefined) {
        setOpenModal(true);
      }
      console.log(viewBattleId);
      const _selectedBattle = battlesToCommence?.find((e) => {
        console.log(e);
        return e?.battleId == viewBattleId.toString();
      });
      console.log(_selectedBattle);
      setSelectedBattleModalDetail(_selectedBattle);
    } else {
    }
  }, [viewBattleId, battlesToCommence]);
  useEffect(() => {
    if (
      battlesToCommence?.find((e) => e?.battleId == selectedBattle?.battleId) ||
      createdBattles?.find((e) => e?.battleId == selectedBattle?.battleId)
    ) {
    } else {
      setSelectedBattle(createdBattles[0] || battlesToCommence[0]);
    }
  }, [battlesToCommence, createdBattles]);

  useEffect(() => {
    if (raidResult) {
      setBattlesToShow(raidResult);
    }
    // if (battlesToCommence) {
    //   let _battlesToShow = [...battlesToCommence, ...createdBattles];
    //   if (searchText !== "") {
    //     _battlesToShow = _battlesToShow?.filter(({ battleId }) =>
    //       battleId?.toString().includes(searchText)
    //     );
    //   }
    //   if (sortOption === "Stake") {
    //     _battlesToShow.sort((b, a) => a?.amount - b?.amount);
    //   }
    //   if (sortOption === "Date") {
    //     _battlesToShow.sort((b, a) => a?.battleId - b?.battleId);
    //   }
    //   if (sortOption === "Progress") {
    //     _battlesToShow.sort((b, a) => a?.created - b?.created);
    //   }
    //   setBattlesToShow(_battlesToShow);
    // }
  }, [battlesToCommence, createdBattles, sortOption, searchText, raidResult]);

  useEffect(() => {
    setCurrentBattles(battlesToShow.slice(page * 5, page * 5 + 5));
  }, [battlesToShow, page]);

  useEffect(() => {
    if (!account) {
      navigate("/connect", { state: { from: "/battles" } });
    }
  }, [account]);

  const handlePageUp = () => {
    if (page * 5 + 5 < raidResult.length) {
      setPage(page + 1);
    }
  };

  const handlePageDown = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  console.log(selectedBattleModalDetail);

  const BattleCard = ({ data, onClick, isSelected }) => {
    const [address, whaleId, prizeMultiplier, artifactReceived] = data;

    if (data) {
      return (
        <div className="relative">
          <div
            onClick={onClick}
            className="battle-card relative flex flex-col cursor-pointer z-10"
          >
            <div
              style={{
                backgroundImage: `url(https://gen1.atlantys.one/token/image/${whaleId})`,
              }}
              className="flex-1 mx-4 mt-4 bg-cover bg-center"
            >
              <div className="mt-6 text-center text-yellow text-xl">Whale</div>
              <div className="text-center font-impact text-yellow text-3xl">
                #{whaleId}
              </div>
            </div>
            <div className="z-20 flex flex-col flex-1 mx-4 bg-cover px-4">
              <div className="text-white text-left">
                Prize Multiplier x{prizeMultiplier}
              </div>
              <div className="text-white text-left">
                Amount Won: {parseFloat(prizeMultiplier) * 100} AQUA
              </div>
              <div className="text-white text-left">
                Mystery Artifact: {artifactReceived ? "Yes" : "No"}
              </div>
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

  return (
    <>
      <div className="w-full items-center flex flex-col mb-40">
        <Container>
          <div className="text-white text-3xl font-bold text-center w-full mb-6">
            Raid Results
          </div>
        </Container>
        <div className="flex justify-center mt-4 mx-8 xl:mx-24 gap-5">
          <div className="flex w-4/5 justify-center">
            <img
              src={LeftArrow}
              className="my-auto w-6 h-9 cursor-pointer"
              onClick={handlePageDown}
            />
            <div className="flex mx-5 mb-6 grow">
              {currentBattles &&
                currentBattles.map((el) => {
                  return (
                    <BattleCard
                      data={el}
                      onClick={() => {
                        console.log(el);
                        returnRaid([el[0]], setPlayState);
                      }}
                      isSelected={
                        selectedBattle &&
                        selectedBattle.battleId === el.battleId
                      }
                    />
                  );
                })}
            </div>
            <img
              src={SideArrow}
              className="my-auto w-6 h-9 cursor-pointer"
              onClick={handlePageUp}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default EndRaid;
