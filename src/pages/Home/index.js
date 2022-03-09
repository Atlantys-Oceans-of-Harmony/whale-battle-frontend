
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
import Frame from "assets/frame.png";
import { toast } from 'react-toastify';

const DURATION = [300, 600, 1800, 3600];
const COLOR = ["Blue", "Red"]
const GAME_STATES = [{ title: "Create Battle", index: 0 }, { title: "Join Battle", index: 1 }]
const Home = () => {
    const [gameState, setGameState] = useState(GAME_STATES[0])

    const { account, createBattle,
        joinBattle, getArbTokenBalance,
        getAllHarmonyWhales, listenToCreatedBattles,
        listenToWonBattles, listenToCanceledBattles,
        listenToAcceptedBattles, cancelBattle,getAllBattles,
        getBattleDetails,getBattlesReadyToAccept
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
    useEffect(() => {
        const fetchStuff = async () => {
            getAllHarmonyWhales().then(res => {
                setHarmonyWhales(res)
                setCreateBattleForm({ ...createBattleForm, whaleId: res[0] });
                setJoinBattleForm({ ...joinBattleForm, whaleId: res[0] });
            }).catch(e => { setHarmonyWhales([]) });
            const [{wonBattles,lostBattles,readyToAcceptBattles,readyToCommenceBattles,cancelledBattles,forfeitedBattles},readyToJoinBattleIds] = await Promise.all([getAllBattles(),getBattlesReadyToAccept()]) ;

            const [createdBattles,commenceBattles,readyToJoinbattles] =
            await Promise.all([getBattleDetails(readyToAcceptBattles),
                getBattleDetails(readyToCommenceBattles),
                getBattleDetails(readyToJoinBattleIds)])
            // listenToCreatedBattles(handleOnCreateBattle);
            // listenToCreatedBattles(handleOnCreateOwnBattle, true);
            // listenToWonBattles(handleOnWinBattle);
            // listenToCanceledBattles(handleOnCancelledBattle);
            // listenToAcceptedBattles(handleOnJoinedBattle);
            console.log(createdBattles,commenceBattles,readyToJoinbattles)

        }
        if (account) {
            fetchStuff();
        }
    }, [account])
    const handleOnWinBattle = async (data) => {
        console.log(data.battleId + ":WOn")
        if (battlesWon.filter((e) => e.battleId === data.battleId).length === 0) {
            let _newCreatedBattle = [...battlesWon]
            _newCreatedBattle.push(data);
            setBattlesWon((e) => ([...e, data]));
        }
    }

    const handleOnCreateBattle = async (data) => {
        console.log("created Battle:" + data.battleId);
        if (battlesToJoin.filter((e) => e.battleId === data.battleId).length === 0) {
            let _newCreatedBattle = [...battlesToJoin, data]

            setBattlesToJoin((e) => ([...e, data]));

        }
        console.log(data);
    }
    const handleOnCancelledBattle = async (data) => {
        setBattlesToJoin((battlesToJoin) => battlesToJoin.filter((e) => e.battleId !== data.battleId));
        setCreatedBattles((createdBattles) => createdBattles.filter((e) => e.battleId !== data.battleId));

    }
    const handleOnJoinedBattle = async (data) => {
        console.log("jonied battle: " + data.battleId);
        setBattlesToJoin((battlesToJoin) => battlesToJoin.filter((e) => e.battleId !== data.battleId));
        setCreatedBattles((createdBattles) => createdBattles.filter((e) => e.battleId !== data.battleId));
    }
    const handleOnCreateOwnBattle = async (data) => {
        if (createdBattles.filter((e) => e.battleId === data.battleId).length === 0) {
            let _newCreatedBattle = [...createdBattles]
            _newCreatedBattle.push(data);
            setCreatedBattles((e) => ([...e, data]));
        }
        console.log(data);
    }
    const handleCreateBattleChange = (field, value) => {
        const _createBattleForm = { ...createBattleForm };
        _createBattleForm[field] = value;
        setCreateBattleForm(_createBattleForm);

    }
    const handleJoinBattleChange = (field, value) => {
        const _joinBattleForm = { ...joinBattleForm };
        _joinBattleForm[field] = value;
        setJoinBattleForm(_joinBattleForm);
    }

    const handleCreateBattle = async () => {
        console.log(createBattleForm)
        createBattle(createBattleForm);
    }
    const handleJoinBattle = async (battleId, amount) => {
        joinBattle({ ...joinBattleForm, battleId, amount });
    }
    const handleCancelBattle = async (battleId) => {
        await cancelBattle(battleId);
    }
    const CreateBattle = () => {
        return (<div className="mb-96">

            <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className=" py-6 px-4 space-y-6 sm:p-6">
                    <div>

                    </div>
                    <div className="lg:flex justify-center">
                        <div>
                            {harmonyWhales && <>
                                <h3 className="text-white sm:text-xl md:text-2xl font-extrabold">Select a Whale</h3>

                                <div className="h-32 mt-4 -top-6 -left-8 w-96 relative text-md tracking-tight font-extrabold text-white sm:text-xl md:text-2xl flex items-center wallet-btn ">
                                    <select
                                        id="whale_create"
                                        name="whale_create"
                                        className="mt-1 z-10 pt-2 block bg-transparent text-white focus:outline-none text-lg  pl-32 pr-10 py-2  font-extrabold cursor-pointer  items-center justify-center  mb-3 "
                                        value={createBattleForm["whaleId"]}
                                        onChange={e => handleCreateBattleChange("whaleId", e.target.value)}
                                    >
                                        {harmonyWhales.map(e => {
                                            return (<option className="flex" value={e}>Whale #{e}</option>
                                            )
                                        })}

                                    </select>
                                    <img src={Button1} alt="" className="absolute -z-10 w-64 -top-10 -left-10" />

                                </div>

                                <div className="relative w-80 mt-4">
                                    <img src={Frame} alt="" className="absolute w-96" />
                                    <img src={`https://api.harmonywhales.com/images/${createBattleForm?.whaleId}`} alt="" className="pt-12 ml-8 w-64" />
                                </div>
                            </>
                            }
                        </div>
                        <div>
                            <div className="text-white sm:text-xl md:text-2xl font-extrabold">
                                <h3 className="text-white sm:text-xl md:text-2xl font-extrabold">Select Duration</h3>

                                <div className="h-32 mt-4  -top-6 -left-8 w-96 relative text-md tracking-tight font-extrabold text-white sm:text-xl md:text-2xl flex items-center wallet-btn ">
                                    <select
                                        id="whale_create"
                                        name="whale_create"
                                        className="mt-1 z-10 pt-2 block bg-transparent text-white focus:outline-none text-lg  pl-32 pr-10 py-2  font-extrabold cursor-pointer  items-center justify-center  mb-3 "
                                        value={createBattleForm["duration"]}
                                        onChange={e => handleCreateBattleChange("duration", e.target.value)}
                                    >
                                        {DURATION &&


                                            DURATION.map(e => {
                                                return (<option className="flex" value={e}>{e / 60} minutes</option>
                                                )
                                            })

                                        }
                                    </select>
                                    <img src={Button1} alt="" className="absolute -z-10 w-64 -top-10 -left-10" />

                                </div>
                                <h3 className="text-white sm:text-xl md:text-2xl font-extrabold">Enter Amount</h3>

                                <div className="h-32 mt-4  -top-6 -left-8 w-96 relative text-md tracking-tight font-extrabold text-white sm:text-xl md:text-2xl flex items-center ">
                                    <input
                                        className="text-black bg-white ml-8"
                                        placeholder="Amount in ARB"
                                        type="text"
                                        pattern="^[0-9]*$"
                                        value={createBattleForm["amount"]}
                                        onChange={e => handleCreateBattleChange("amount", e.target.value)}

                                    />

                                </div>



                            </div>
                        </div>
                    </div>

                </div>
                <div
                    className="h-32  cursor-pointer mx-auto  w-80 relative text-md tracking-tight font-extrabold text-white sm:text-xl md:text-2xl flex items-center wallet-btn ">
                    <button
                        onClick={handleCreateBattle}
                        className="w-full font-extrabold cursor-pointer flex items-center justify-center px- py-3 mb-3 "
                    >
                        Create Battle
                    </button>
                </div>

            </div>
            <div className="relative z-10">
                <div className="text-2xl text-center font-bold mb-8 text-white">Battles Created</div>
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="relative z-10 text-white text-2xl">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left  uppercase tracking-wider"
                                            >BattleID</th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left  uppercase tracking-wider">From</th>

                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left uppercase tracking-wider">Amount</th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left  uppercase tracking-wider">Color</th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left  uppercase tracking-wider">Created At</th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left uppercase tracking-wider">Cancel</th>
                                        </tr>


                                    </thead>
                                    <tbody className=" divide-y text-white font-bold divide-gray-200">
                                        {createdBattles.map((e) => {
                                            return (<>
                                                <tr>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-200">{e.battleId}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                <img className="h-10 w-10 rounded-full" src={`https://api.harmonywhales.com/images/${e.whaleId}`} alt="" />
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className=" font-medium text-gray-200">{e.creatorAddress.slice(0, 6)}...{e.creatorAddress.slice(-6)}</div>
                                                                <div className="text-gray-200">Whale #{e.whaleId}</div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{e.amount}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{COLOR[parseInt(e.color)]}</td>
                                                    <td
                                                        onClick={() => handleCancelBattle(e?.battleId)}

                                                        className="cursor-pointer">Cancel</td>
                                                </tr>
                                            </>)
                                        })}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>)
    }
    const JoinBattle = () => {
        return (<div>
            <div className="">
                <div className="lg:flex  items-center justify-center py-6 px-4 space-y-6 sm:p-6">

                    {harmonyWhales && <>

                        <div className="h-32 mt-4 -top-6 -left-8 w-96 relative text-md tracking-tight font-extrabold text-white sm:text-xl md:text-2xl flex items-center wallet-btn ">

                            <select
                                id="whale_create"
                                name="whale_create"
                                className="mt-1 z-10 pt-2 block bg-transparent text-white focus:outline-none text-lg  pl-32 pr-10 py-2  font-extrabold cursor-pointer  items-center justify-center  mb-3 "
                                value={joinBattleForm["whaleId"]}
                                onChange={e => handleJoinBattleChange("whaleId", e.target.value)}
                            >
                                {harmonyWhales.map(e => {
                                    return (<option className="flex" value={e}>Whale #{e}</option>
                                    )
                                })}

                            </select>
                            <img src={Button1} alt="" className="absolute -z-10 w-64 -top-10 -left-10" />

                        </div>

                        <div className="relative w-80 m-4">
                            <img src={Frame} alt="" className="absolute w-96" />
                            <img src={`https://api.harmonywhales.com/images/${joinBattleForm?.whaleId}`} alt="" className="pt-12 ml-8 w-64" />
                        </div>
                    </>
                    }

                </div>
            </div>

            <h3 className="text-xl text-white leading-6 font-bold">Battles to join appear here:</h3>

            <div className="flex text-white text-xl flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"></div>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="">

                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left  uppercase tracking-wider"
                                    >BattleID</th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left  uppercase tracking-wider"
                                    >CreatorID</th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left  uppercase tracking-wider"
                                    >WhaleID</th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left  uppercase tracking-wider"
                                    >Amount</th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left  uppercase tracking-wider"
                                    >Color</th>

                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {battlesToJoin.map((e) => {
                                    return (<>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{e.battleId}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img className="h-10 w-10 rounded-full" src={`https://api.harmonywhales.com/images/${e.whaleId}`} alt="" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{e.creatorAddress.slice(0, 6)}...{e.creatorAddress.slice(-6)}</div>
                                                        <div className="text-sm text-gray-500">Whale #{e.whaleId}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{e.amount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{COLOR[parseInt(e.color)]}</td>
                                            <td onClick={() => handleJoinBattle(e.battleId, e.amount)} className="text-gray-500 cursor-pointer">Join Battle</td>
                                        </tr>
                                    </>)
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>)
    }
    if (!account) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="text-4xl font-bold">Connect to a wallet first!</div>
                <div className="text-xl text-center font-semibold">You can connect to the test wallets(1 and 2) that have test tokens and test whales<br />Or<br />You can connect with your own wallet</div>
            </div>)
    }
    return (<>
        {/* <img src={Ship} alt="" className="z-0 absolute w-full bottom-0" />
        <img src={BackgroundSand} alt="" className="  absolute w-full bottom-0" />
        <img src={Dinasour} alt="" className="dinasour  absolute  bottom-0 right-0" />
        <img src={Reef} alt="" className=" absolute  w-96 bottom-0 left-0" /> */}
        <div className="w-full">
            <div
                className=" mx-auto h-36 w-96 relative text- tracking-tight font-extrabold focus-visible:border-0 focus:border-0 text-white sm:text-xl md:text-2xl flex items-center wallet-btn ">
                <button
                    onClick={() => { setGameState(GAME_STATES[(gameState.index + 1) % 2]) }}
                    className="w-full font-extrabold text-lg cursor-pointer flex items-center justify-center px- py-3 mb-3 "
                >
                    Switch to {GAME_STATES[(gameState.index + 1) % 2].title}
                </button>
            </div>
            <div className="mx-auto text-white text-center mt-8 text-3xl font-extrabold">{gameState.title}</div>
        </div>


        {gameState.index === 0 ? CreateBattle() : JoinBattle()}

        <div className="text-xl pt-32 text-white font-bold">
            Battles Won
        </div>
        <div className="-my-2 text-white overflow-x-auto sm:-mx-6 lg:-mx-8 mb-32">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className=" ">
                    <table className="min-w-full divide-y divide-gray-200"></table>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="">
                            <tr>
                                <th scope="col"
                                    className="px-6 py-3 text-left  uppercase tracking-wider"
                                >BattleID</th>
                                <th scope="col"
                                    className="px-6 py-3 text-left  uppercase tracking-wider"
                                >CreatorID</th>
                                <th scope="col"
                                    className="px-6 py-3 text-left  uppercase tracking-wider"
                                >WhaleID</th>
                                <th scope="col"
                                    className="px-6 py-3 text-left  uppercase tracking-wider"
                                >Accepted WhaleID</th>
                                <th scope="col"
                                    className="px-6 py-3 text-left  uppercase tracking-wider"
                                >Owner Points</th>
                                <th scope="col"
                                    className="px-6 py-3 text-left  uppercase tracking-wider"
                                >Accepted Points</th>
                                <th scope="col"
                                    className="px-6 py-3 text-left uppercase tracking-wider"
                                >Amount</th>
                                <th scope="col"
                                    className="px-6 py-3 text-left  uppercase tracking-wider"
                                >Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {battlesWon.map((e) => {
                                return (<>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap ">{e.battleId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap ">{e.creatorAddress}</td>
                                        <td className="px-6 py-4 whitespace-nowrap ">{e.whaleId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap ">{e.whaleIdAccepted}</td>
                                        <td className="px-6 py-4 whitespace-nowrap ">{e.ownerTotalPoints}</td>
                                        <td className="px-6 py-4 whitespace-nowrap ">{e.acceptedTotalPoints}</td>
                                        <td className="px-6 py-4 whitespace-nowrap ">{e.amount}</td>
                                        <td className="px-6 py-4 whitespace-nowrap ">{e.created}</td>
                                    </tr>
                                </>)
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>)
}
export default Home;