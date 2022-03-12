
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
import BattleProgressCard from "components/BattleProgressCard";
import WonSummary from "components/WonSummary";

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
        getBattleDetails,getBattlesReadyToAccept,blockNumber, update,commenceBattle
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
    const [wonSummary,setWonSummary] = useState({});
    const [openWon, setOpenWon] = useState(false);
    console.log(blockNumber);
    const [battlesToCommence, setBattleToCommence] = useState([]);
    useEffect(()=>{
        getBattlesReadyToAccept().then(e=>getBattleDetails(e).then(ee=>setBattlesToJoin(ee)));
    },[blockNumber])
    useEffect(() => {
        const timerId = setInterval(async ()=>{
            const [readyToJoinBattleIds] = await Promise.all([getBattlesReadyToAccept()]) ;

            const [readyToJoinbattles] =
            await Promise.all([
                getBattleDetails(readyToJoinBattleIds)])
            setBattlesToJoin(readyToJoinbattles);
        }, 10000);
        return function cleanup() {
            clearInterval(timerId);
        };
    }, []);
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
            console.log("Battles Created:",createdBattles)
            console.log("Battles to commence",commenceBattles)
            console.log("Battles Ready to join",readyToJoinbattles);
            setCreatedBattles(createdBattles);
            setBattleToCommence(commenceBattles);
            setBattlesToJoin(readyToJoinbattles);
            

        }
        if (account) {
            fetchStuff();
        }
    }, [account, update])
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
    const [openCreateBattle,setOpenCreateBattle] = useState(false);
    const [createBattleSelectedIndex,setCreatedBattleSelectedIndex] = useState(-1);

    const CreateBattle = () => {
        return (<div className="mb-96">
 <BattleToJoinModal
            open={openCreateBattle}
            setOpen={setOpenCreateBattle}
            {...(createBattleSelectedIndex>=0?createdBattles[createBattleSelectedIndex]:{})}/>

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
                                            return (<option className="flex bg-blue-600" value={e}>Whale #{e}</option>
                                            )
                                        })}

                                    </select>
                                    <img src={Button1} alt="" className="absolute -z-10 w-64 -top-10 -left-10" />

                                </div>

                                <div className="relative w-80 mt-4">
                                    <img src={Frame} alt="" className="absolute w-96" />
                                    <img src={`https://harmony-whales-meta.herokuapp.com/token/image/${createBattleForm?.whaleId}`} alt="" className="pt-12 ml-8 w-64" />
                                </div>
                            </>
                            }
                        </div>
                        <div>
                            <div className="text-white sm:text-xl md:text-2xl font-extrabold">

                                
                                <h3 className="text-white sm:text-xl md:text-2xl font-extrabold">Enter Amount(ARB)</h3>

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
                <div className="lg:px-16 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1">

                {createdBattles?.length>0?createdBattles.map((e,index) => {
                     const handleClick = ()=>{
                        handleCancelBattle(e.battleId)
                    }
                    const handleDetail = ()=>{
                        setOpenJoinBattle(false)
                        setOpenCreateBattle(true)

                        setCreatedBattleSelectedIndex(index)
                        
                    }
                                            return (<>
                                            <BattleToJoinCard
                                            join={false}
                                            handleClick={handleClick}
                                            handleDetail={handleDetail}
                                            {...e}/>
                                                
                                            </>)
                                        }):<div>No Battles</div>}
                                        </div>

            </div>
        </div>)
    }
    const [openJoinBattle,setOpenJoinBattle] = useState(false);
        const [joinBattleSelectedIndex,setJoinBattleSelectedIndex] = useState(-1);
        
    const JoinBattle = () => {
        
        return (<div>
             <BattleToJoinModal
            open={openJoinBattle}
            setOpen={setOpenJoinBattle}
            {...(joinBattleSelectedIndex>=0?battlesToJoin[joinBattleSelectedIndex]:{})}/>

            <div className="">
                <div className="flex flex-col  items-center justify-center py-6 px-4 space-y-6 sm:p-6">

                    {harmonyWhales && <>

                        <div className="h-32 ml-10 mt-4 -top-6 -left-8 w-96 relative text-md tracking-tight font-extrabold text-white sm:text-xl md:text-2xl flex items-center wallet-btn ">

                            <select
                                id="whale_create"
                                name="whale_create"
                                className="mt-1 z-10 pt-2 block bg-transparent text-white focus:outline-none text-lg  pl-32 pr-10 py-2  font-extrabold cursor-pointer  items-center justify-center  mb-3 "
                                value={joinBattleForm["whaleId"]}
                                onChange={e => handleJoinBattleChange("whaleId", e.target.value)}
                            >
                                {harmonyWhales.map(e => {
                                    return (<option className="flex bg-blue-600" value={e}>Whale #{e}</option>
                                    )
                                })}

                            </select>
                            <img src={Button1} alt="" className="absolute -z-10 w-64 -top-10 -left-10" />

                        </div>

                        <div className="relative w-80 m-4">
                            <img src={Frame} alt="" className="absolute w-96" />
                            <img src={`https://harmony-whales-meta.herokuapp.com/token/image/${joinBattleForm?.whaleId}`} alt="" className="pt-12 ml-8 w-64" />
                        </div>
                    </>
                    }

                </div>
            </div>

            <h3 className=" text-center text-3xl my-8 text-white leading-6 font-bold">Battles to join appear here:</h3>
         

          <div className="lg:px-16 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1">
                                {battlesToJoin?.length>0?battlesToJoin.map((e,index) => {
                                    const handleClick = ()=>{
                                        handleJoinBattle(e.battleId, e.amount)
                                    }
                                    const handleDetail = ()=>{
                                        setOpenJoinBattle(true)
                
                                    setJoinBattleSelectedIndex(index)
                                        
                                    }
                                    return (<>
                                                      <BattleToJoinCard handleClick={handleClick} handleDetail={handleDetail} join {...e}/>

                                    </>)
                                }):<div>No Battles to Join!</div>}
                            </div>
        </div>)
    }
    if (!account) {
        return (
            <div className="flex flex-col text-white items-center justify-center h-screen">
                <div className="text-4xl font-bold">Connect to a wallet first!</div>
            </div>)
    }
    if (harmonyWhales?.length<=0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                 <div className="text-4xl text-white font-bold">You need to have atleast 1 Gen 1 Whale!</div>
            </div>)
    }
    return (<>
    <WonSummary
    {...wonSummary}
    open={openWon}
    setOpen={setOpenWon}/>
        {/* <img src={Ship} alt="" className="z-0 absolute w-full bottom-0" />
        <img src={BackgroundSand} alt="" className="  absolute w-full bottom-0" />
        <img src={Dinasour} alt="" className="dinasour  absolute  bottom-0 right-0" />
        <img src={Reef} alt="" className=" absolute  w-96 bottom-0 left-0" /> */}
        <div className="w-full">
        <div className="relative z-10">
               
                {battlesToCommence?.length>0?<>
                    <div className="text-2xl text-center font-bold mb-8 text-white">Battles In Progress</div>
                <div className="lg:px-16 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1">
                { battlesToCommence.map((e) => {
                    const handleClick = ()=>{
                        commenceBattle(e?.battleId, setOpenWon,setWonSummary);
                    }
                                            return (<>
                                               <BattleProgressCard
                                               handleClick={handleClick}
                                               {...e}
                isComplete={parseInt(e.futureBlock)-parseInt(blockNumber)<=0}
                />
                                            </>)
                                        })}
                                        </div></>:""}





            </div>
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

        
    </>)
}
export default Home;