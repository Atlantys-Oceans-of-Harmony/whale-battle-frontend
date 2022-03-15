
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
const AllBattles = () => {
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
    const [selectedIndex, setSelectedIndex] = useState(0)


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
    const options = [
        { title: "All Battles", onClick: () => { setBattlesToShow(allBattles) } },
        { title: "Won Battles", onClick: () => { setBattlesToShow(wonBattles) } },
        { title: "Lost Battles", onClick: () => { setBattlesToShow(lostBattles) } },
    ]

    return (<>
        <WonSummary
            {...wonSummary}
            open={openWon}
            setOpen={setOpenWon} />

        <div className="w-full">
            <div className="relative z-10 pb-16">
                <div className="w-full md:flex items-center justify-evenly">
                    {options.map(({ title, onClick }, index) => {
                        return (<div onClick={() => { onClick(); setSelectedIndex(index) }
                        } className={`text-3xl px-4 py-2  ${selectedIndex === index ? "border rounded-md" : ""} cursor-pointer text-center font-bold mb-8 text-white`}>{title}</div>)
                    })}

                </div>
                {battlesToShow?.length > 0 ? <>
                    <div className="lg:px-16 grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1">
                        {battlesToShow.map((e) => {
                            const handleClick = () => {
                                setOpenWon(true)
                                setWonSummary(e);
                            }
                            return (<>
                                <BattleProgressCard
                                    handleClick={handleClick}
                                    {...e}
                                    isComplete={parseInt(e.futureBlock) - parseInt(blockNumber) <= 0}
                                />
                            </>)
                        })}
                    </div></> : <div className="mt-16 w-full text-white text-center text-2xl font-bold">Nothing to Show</div>}





            </div>

        </div>

    </>)
}
export default AllBattles;