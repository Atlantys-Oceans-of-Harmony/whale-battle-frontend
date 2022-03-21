
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
const Leaderboard = () => {
    const [gameState, setGameState] = useState(GAME_STATES[0])

    const { account, getLeaderboard,
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
    const [allLeaderboard, setAllLeaderboard] = useState();
    const [leaderboardToShow, setLeaderboardToShow] = useState();


    useEffect(() => {
        const fetchStuff = async () => {
            let newLeaderboard = (await getLeaderboard())?.data;
            newLeaderboard.sort((a, b) => (a.wins > b.wins) ? 1 : ((b.wins > a.wins) ? -1 : 0))
            newLeaderboard.reverse();
            setAllLeaderboard(newLeaderboard);
            setLeaderboardToShow(newLeaderboard.slice(0, 10));


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


        <div className="w-full">
            <div className="relative z-10 pb-16">

                <table>
                    <tr>
                        <th>Address</th>
                        <th>Wins</th>
                        <th>Loses</th>
                    </tr>
                    {allLeaderboard.map(e => {
                        return (<tr>
                            <td>{e.address}</td>
                            <td>{e.wins}</td>
                            <td>{e.loses}</td>
                        </tr>)
                    })}


                </table>




            </div>

        </div>

    </>)
}
export default Leaderboard;