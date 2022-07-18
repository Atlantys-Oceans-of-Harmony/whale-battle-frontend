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

const Raids = ({ setPlayState }) => {
  const {
    account,

    cancelBattle,

    blockNumber,
    reviveRaid,
    battlesToCommence,
    createdBattles,
    allWhalesData,
    harmonyWhales,
    allRaids,
    currTime,
    raidLockedPeriod,
    returnRaid,
    userArtifacts,
  } = useContext(Web3Context);
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
      const _selectedBattle = battlesToCommence?.find((e) => {
        return e?.battleId == viewBattleId.toString();
      });
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
    if (allRaids) {
      setBattlesToShow([...allRaids]);
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
  }, [battlesToCommence, createdBattles, sortOption, searchText, allRaids]);

  useEffect(() => {
    setCurrentBattles(battlesToShow.slice(page * 5, page * 5 + 5));
  }, [battlesToShow, page]);

  useEffect(() => {
    if (!account) {
      navigate("/connect", { state: { from: "/battles" } });
    }
  }, [account]);

  const handlePageUp = () => {
    if (page * 5 + 5 < allRaids.length) {
      setPage(page + 1);
    }
  };

  const handlePageDown = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const Option = ({ text, isActive, onClick }) => {
    const conditionRender = () => {
      if (isActive) {
        return (
          <div
            onClick={onClick}
            className="text-white active-option w-full pl-2 py"
          >
            <div className="font-bold">{text}</div>
          </div>
        );
      }
      return (
        <div onClick={onClick} className="text-white hover:text-red ml-7">
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

  const createOrEndRaids = () => {
    const finalOngoingRaids = allRaids?.filter((e) => {
      const [
        whaleId,
        address,
        land,
        timeStaked,
        prizeMultiplier,
        position,
        userPosition,
      ] = e;
      const dateDiff = currTime - parseInt(timeStaked) * 1000;
      let canBeRemoved = false;
      if (dateDiff > raidLockedPeriod * 1000) {
        canBeRemoved = true;
      }
      if (prizeMultiplier <= 0) {
        canBeRemoved = true;
      }
      return canBeRemoved;
    });
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="text-white w-full py-52 text-3xl font-bold text-center">
          {harmonyWhales?.length > 0
            ? "Psst! Your whales are waiting idle! Send them on raid to win precious artifacts"
            : "Looks like you don't have a whale available"}
          <br />
          <br />
          <RaidsButton
            onClick={() => setPlayState("NEW RAID")}
            disabled={harmonyWhales?.length > 0 ? false : true}
            className={`mr-8`}
          >
            CREATE NEW RAIDS
          </RaidsButton>{" "}
          <RaidsButton
            onClick={() =>
              returnRaid(
                finalOngoingRaids.map((e) => e[0]),
                setPlayState
              )
            }
            disabled={finalOngoingRaids?.length > 0 ? false : true}
          >
            END ALL RAIDS({finalOngoingRaids?.length})
          </RaidsButton>
        </div>
      </div>
    );
  };

  const LeftSection = ({ onChange, value }) => {
    const options = [
      { text: "Stake", id: "Stake" },
      { text: "Date", id: "Date" },
      { text: "Progress", id: "Progress" },
    ];

    return (
      <div style={{ visibility: "hidden" }} className="flex-1 text-white pt-12">
        <SearchBox
          autoFocus="autofocus"
          value={searchText}
          onChange={(e) => setSearchText(e?.target?.value)}
          placeholder="Search #"
        />
        <div className="mt-6">
          <div className="text-xl font-bold">Sort by :</div>
          <div className="mt-4">
            {options?.map(({ text, id }) => {
              return (
                <Option
                  text={text}
                  isActive={value === id}
                  onClick={() => {
                    onChange(id);
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const BattleCard = ({ data, onClick, isSelected }) => {
    const [
      whaleId,
      userAddress,
      plotId,
      timeStaked,
      prizeMultiplier,
      position,
      userPosition,
      revived,
    ] = data;
    const dateDiff = currTime - parseInt(timeStaked) * 1000;
    let canBeRemoved = false;
    let canBeRevived = false;
    if (dateDiff > raidLockedPeriod * 1000) {
      canBeRemoved = true;
    }

    if (prizeMultiplier <= 0) {
      canBeRemoved = true;
      if (revived == "false" && userArtifacts?.length > 0) {
        canBeRevived = true;
      }
    }

    const secondsRemaining = Math.max(
      0,
      parseInt(raidLockedPeriod) - parseInt(dateDiff / 1000)
    );
    const displayTimeRemaining = {
      hours: parseInt(secondsRemaining / (60 * 60))
        .toString()
        .padStart(2, "0"),
      minutes: parseInt((secondsRemaining % (60 * 60)) / 60)
        .toString()
        .padStart(2, "0"),
      seconds: parseInt(secondsRemaining % 60)
        .toString()
        .padStart(2, "0"),
    };
    const created =
      data.acceptedBy === "0x0000000000000000000000000000000000000000";
    if (data) {
      return (
        <div className="relative">
          <div className="battle-card relative flex flex-col cursor-pointer z-10">
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
            <div className="z-50 flex flex-col flex-1 mx-4 bg-cover px-4">
              <div className="text-white text-center text-xl  mt-6">
                Plot #{plotId}
              </div>
              <div className="text-white text-center text-xl  mt-4">
                Prize Multiplier x{prizeMultiplier}
              </div>
              <div
                style={{
                  fontSize: "24px",
                  fontFamily:
                    "Impact, Haettenschweiler, Arial Narrow Bold, sans-serif",
                }}
                className={`text-white w-full text-center`}
              >
                {canBeRemoved ? (
                  "00:00:00"
                ) : (
                  <>
                    {displayTimeRemaining?.hours}:
                    {displayTimeRemaining?.minutes}:
                    {displayTimeRemaining?.seconds}{" "}
                  </>
                )}
              </div>
              {canBeRemoved && (
                <RaidsButton
                  onClick={onClick}
                  disabled={!canBeRemoved}
                  style={{
                    fontSize: "24px",
                    padding: "2px",
                    width: "fit-content",
                    margin: "auto",
                  }}
                >
                  END RAID
                </RaidsButton>
              )}
              {canBeRevived && (
                <RaidsButton
                  onClick={() => reviveRaid([whaleId], [userArtifacts[0]])}
                  style={{
                    fontSize: "24px",
                    padding: "2px",
                    width: "fit-content",
                    margin: "auto",
                  }}
                >
                  REVIVE
                </RaidsButton>
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
    const {
      battleId,
      whaleId,
      owner,
      amount,
      ownerTotalPoints,
      acceptedBy,
      whaleIdAccepted,
      acceptedTotalPoints,
      winner,
      endDate,
      futureBlock,
      inProgress,
      isOwner,
      userWon,
      created,
    } = data;
    const ImageContainer = ({ image, name, species, mirror }) => {
      return (
        <>
          <img
            src={image}
            className={
              image === OpponentWhale
                ? "pt-24"
                : `whale-image ${mirror ? "-scale-x-100" : ""}`
            }
          />
          <div className="-mt-24 z-10">
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
            image={`https://gen1.atlantys.one/token/image/transparent/${whaleId}`} // Acadia yaha pe image url daal dena (url() type wala)
            name={`Whale #${whaleId}`}
            species={
              allWhalesData[whaleId?.toString()]?.data?.attributes[3]?.value
            }
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
          {created ? (
            <BailButton handleConfirm={() => cancelBattle(battleId)} />
          ) : blockNumber > futureBlock ? (
            <ConfirmButton
              handleConfirm={() => {
                // commenceBattle(battleId)
                navigate(`/battles/${battleId}`);
              }}
            />
          ) : (
            "Battle in Progress"
          )}
        </div>
        <div className="flex flex-col flex-1 ">
          <ImageContainer
            mirror
            image={
              whaleIdAccepted != 0
                ? `https://gen1.atlantys.one/token/image/transparent/${whaleIdAccepted}`
                : OpponentWhale
            }
            name={
              whaleIdAccepted != 0 ? `Whale #${whaleIdAccepted}` : undefined
            }
            species={
              allWhalesData[whaleIdAccepted?.toString()]?.data?.attributes[3]
                ?.value
            }
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <BattleProgressModal
        open={openModal || false}
        setOpen={setOpenModal}
        {...selectedBattleModalDetail}
        battleSummary={battleSummary}
        setBattleSummary={setBattleSummary}
      />
      {battleSummary ? (
        <BattleResultModal
          data={battleSummary}
          closeModal={() => {
            setBattleSummary();
          }}
        />
      ) : (
        <></>
      )}

      <div className="w-full flex flex-col mb-10">
        <div className="mx-24">
          <Container>{createOrEndRaids()}</Container>
        </div>

        <div className="flex mt-4 mx-8 xl:mx-24 gap-5">
          {LeftSection({ onChange: setSortOption, value: sortOption })}
          <div className="flex w-4/5">
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
export default Raids;
