
import Web3Context from "contexts/Web3Context";
import { useContext, useEffect, useState, Fragment } from "react";
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import BackgroundOcean from "assets/background_ocean.png";
import BackgroundSand from "assets/background_sand.png";
import Dinasour from "assets/dinasour.png";
import Reef from "assets/reef.png";
import Ship from "assets/ship.png";
import "./index.css"
import Navbar from "components/Navbar/index";
import Button1 from "assets/buttons/button1.png"
import Button2 from "assets/buttons/button2.png"
import BattleToJoinCard from "components/BattleToJoinCard";
import Frame from "assets/frame.png";
import { toast } from 'react-toastify';
import BattleToJoinModal from "components/BattleToJoinModal";
import BattleProgressCard from "components/BattleHistoryCard";
import WonSummary from "components/WonSummary";

const DURATION = [300, 600, 1800, 3600];
const COLOR = ["Blue", "Red"]
const GAME_STATES = [{ title: "Create Battle", index: 0 }, { title: "Join Battle", index: 1 }]
const BattleDetails = () => {
    const [gameState, setGameState] = useState(GAME_STATES[0])

    const { account, createBattle,
        joinBattle, getAllUserBattles,
        getAllHarmonyWhales, listenToCreatedBattles,
        listenToWonBattles, listenToCanceledBattles,
        listenToAcceptedBattles, cancelBattle, getAllBattles,
        getBattleDetails, getBattlesReadyToAccept, blockNumber, update, commenceBattle
    } = useContext(Web3Context);
    const [createBattleForm, setCreateBattleForm] = useState({
        whaleId: "",
        amount: "10",
        color: 0,
        duration: 300,

    })
    const [createWhaleMetadata, setCreateWhaleMetadata] = useState();
    const [joinWhaleMetadata, setJoinWhaleMetadata] = useState();
    const [createdBattles, setCreatedBattles] = useState([]);
    const [battlesToJoin, setBattlesToJoin] = useState([]);
    const [battlesWon, setBattlesWon] = useState([]);
    const [joinBattleForm, setJoinBattleForm] = useState({
        battleId: "",
        whaleId: "",
    });
    const [search, setSearch] = useState();

    const [arbTokenBalance, setArbTokenBalance] = useState("Loading...");
    const [harmonyWhales, setHarmonyWhales] = useState(undefined);
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    const [wonSummary, setWonSummary] = useState({});
    const [openWon, setOpenWon] = useState(false);
    console.log(blockNumber);
    const [battlesToShow, setBattlesToShow] = useState([]);
    const [allBattles, setAllBattles] = useState([]);
    const [wonBattles, setWonBattles] = useState([]);
    const [lostBattles, setLostBattles] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [dataToShow, setDataToShow] = useState()


    useEffect(() => {
        const fetchStuff = async () => {
            const { allBattles, wonBattles: _wonBattles, lostBattles: _lostBattles } = await getAllUserBattles();
            const [_allBattleDetails, _wonBattleDetails, _lostBattleDetails] = await Promise.all([getBattleDetails(allBattles), getBattleDetails(_wonBattles), getBattleDetails(_lostBattles)]);
            setAllBattles(_allBattleDetails);
            setWonBattles(_wonBattleDetails);
            setLostBattles(_lostBattleDetails);
            setBattlesToShow(_allBattleDetails);

            setSelectedIndex(0)


        }
        if (account) {
            fetchStuff();
        }
    }, [account])

    if (!account) {
        return (
            <div className="flex flex-col text-white items-center justify-center h-screen">
                <div className="text-4xl font-bold">Connect to a wallet first!</div>
            </div>)
    }



    return (<>
        <WonSummary
            hideWin={true}
            {...wonSummary}
            open={openWon}
            setOpen={setOpenWon} />

        <div className="w-full">
            <div className="relative z-10 pb-16">
                <div className="w-full flex justify-center flex-col items-center">
                    <div className="text-4xl pb-16 font-extrabold text-white">Enter Battle ID</div>
                    <input
                        className="text-white border text-xl border-white text-center w-44 p-2 rounded-md bg-transparent "
                        placeholder="Battle ID"
                        type="text"
                        pattern="^[0-9]*$"
                        value={search}
                        onChange={e => setSearch(e.target.value)}

                    />
                    <div
                        className="h-32  cursor-pointer mx-auto  w-80 relative text-md tracking-tight font-extrabold text-white sm:text-xl md:text-2xl flex items-center wallet-btn ">
                        <button
                            onClick={async () => {
                                try {
                                    let id = parseInt(search)
                                    if (isNaN(id)) {
                                        toast.error("Invalid Battle ID")
                                    }
                                    const [data] = await getBattleDetails([id])
                                    setDataToShow(data);

                                }
                                catch (e) {
                                    toast.error("Invalid Battle ID")
                                }
                            }}
                            className="w-full font-extrabold cursor-pointer flex items-center justify-center px- py-3 mb-3 "
                        >
                            Search Battle
                        </button>
                    </div>
                </div>
                <div className="max-w-md mx-auto">
                    {dataToShow && <BattleProgressCard
                        handleClick={() => {
                            setOpenWon(true)
                            setWonSummary(dataToShow);
                        }}
                        {...dataToShow}
                        hideWin={true}
                        isComplete={parseInt(dataToShow.futureBlock) - parseInt(blockNumber) <= 0}
                    />}
                </div>




            </div>

        </div>

    </>)
}
export default BattleDetails;