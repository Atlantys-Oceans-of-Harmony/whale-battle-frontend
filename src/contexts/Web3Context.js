import { createContext, useEffect, useState } from "react";
import { ethers, utils } from 'ethers';
import arbTokenAbi from "abis/arbToken.json";
import arbWhaleBattleAbi from "abis/arbWhaleBattle.json";
import harmonyWhalesAbi from "abis/harmonyWhalesv2.json";
import stakingAbi from "abis/staking.json";
import battleStorageAbi from "abis/battleStorage.json";
import { Provider as MulticallProvider, Contract as MulticallContract } from "ethers-multicall";
import { BigNumber } from "../../node_modules/ethers/lib/ethers";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const DEFAULT_ACCOUNTS = [
    { account: "0x45ac855639318BE9c2CabFBCE810e6fc116C1F72", pk: "f9ead77dddc406d52f1bfe92f9044a54f6e3bd3f106a6c746edd815d20e0e6c4" },
    { account: "0x5A92257505518a59da9DdB4a06343A9402c432c2", pk: "20495af9f8965c3033f969122fd42058b9ad9fb67c4e06af882de828fda55969" },
    { account: "0xe38c48EC0a0F98BE297cDd12fA5923Bf79bFf089", pk: "f02297b225063890dac03cb91e0efc114872bb368552205e7ccd7482f7f9bfbb" },
]

const Web3Context = createContext();

const RPC_URL = "https://rpc.hermesdefi.io/";
const CHAIN_ID = 1666600000;
const NATIVE_CURRENCY = {
    name: "one",
    symbol: "ONE", // 2-6 characters long
    decimals: 18,
}
const MULTI_CALL_ADDRESS = "0x34b415f4d3b332515e66f70595ace1dcf36254c5";
const CHAIN_NAME = "Harmony Mainnet";
const ARB_TOKEN_CONTRACT_ADDRESS = "0x1A5b1109F04Cc3f45d4C533685a347656d0983E4";
const ARB_WHALE_BATTLE_CONTRACT_ADDRESS = "0x707b8B324DE71D21218d52EB1bd942E27B7044ac";
const HARMONY_WHALES_CONTRACT_ADDRfESS = "0x289FF2F47cD7575c62FDcf45B62451EA9b2420dD";
const HARMONY_WHALES_V2_CONTRACT_ADDRESS = "0x289FF2F47cD7575c62FDcf45B62451EA9b2420dD";
const BATTLE_STORAGE_CONTRACT_ADDRESS = "0x541f1a396dC207449A8AC37d7EE92BC1F5aaE125";
// const HARMONY_WHALES_CONTRACT_ADDRfESS = "0x0519f50287DDcdF8b761Dae76Dc1A76776A0af70";
const STAKING_CONTRACT_ADDRESS = "0x3d902f6447A0D4E61d65E863E7C2425D938cfEed"


// const RPC_URL = "https://api.s0.b.hmny.io";
// const CHAIN_ID = 1666700000;
// const NATIVE_CURRENCY = {
//     name: "one",
//     symbol: "ONE", // 2-6 characters long
//     decimals: 18,
// }
// const MULTI_CALL_ADDRESS = "0xd078799c53396616844e2fa97f0dd2b4c145a685";
// const CHAIN_NAME = "Harmony Testnet";
// const ARB_TOKEN_CONTRACT_ADDRESS = "0x188f75D2f8E7636D5F12C8b50ff5E1EB1DAF2E83";
// const ARB_WHALE_BATTLE_CONTRACT_ADDRESS = "0x8A0A89513092AFf04d1B8e9f1CeFDd5FA5451Cc3";
// const HARMONY_WHALES_CONTRACT_ADDRfESS = "0xfA982a44a24f30Ca4988761441B2C85EaFDd4c50";
// const HARMONY_WHALES_V2_CONTRACT_ADDRESS = "0xfA982a44a24f30Ca4988761441B2C85EaFDd4c50";
// const BATTLE_STORAGE_CONTRACT_ADDRESS = "0xe2884592C1162664e3e9f34b3252f63673d8e432";
// // const HARMONY_WHALES_CONTRACT_ADDRfESS = "0x0519f50287DDcdF8b761Dae76Dc1A76776A0af70";
// const STAKING_CONTRACT_ADDRESS = "0x3d902f6447A0D4E61d65E863E7C2425D938cfEed"


export const Web3Provider = (props) => {
    const navigate = useNavigate()
    const [account, setAccount] = useState();
    const [signer, setSigner] = useState();
    const [contractObjects, setContractObjects] = useState();
    const functionsToExport = {};
    const [update, setUpdate] = useState(0);
    const [askSwitch, setAskSwitch] = useState(false);
    const [wonBattles, setWonBattles] = useState(0)
    const [correctChain, setCorrectChain] = useState();
    const [lostBattles, setLostBattles] = useState(0)
    const [joinWhaleMetadata, setJoinWhaleMetadata] = useState();
    const [createdBattles, setCreatedBattles] = useState([]);
    const [battlesToJoin, setBattlesToJoin] = useState([]);
    const [battlesWon, setBattlesWon] = useState([]);
    const [arbTokenBalance, setArbTokenBalance] = useState("Loading...");
    const [harmonyWhales, setHarmonyWhales] = useState(undefined);
    const [harmonyWhalesData, setHarmonyWhalesData] = useState(undefined);
    const [battlesToCommence, setBattleToCommence] = useState([]);
    const [allBattles, setAllBattles] = useState([]);
    const [cancelledBattles, setCancelledBattles] = useState([]);
    const [forfeitedBattles, setForfeitedBattles] = useState([]);


    const onAccountsChanged = async (accounts) => {
        setAccount(accounts[0]);
        // setAccount("0xaC7245b6031c0405fE00DF1033b97E966C5193b6");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const _signer = provider.getSigner();

        setSigner(_signer);
    }
    useEffect(() => {
        const _signer = signer || new ethers.providers.Web3Provider(
            window.ethereum,
            "any"
        );
        try {
            _signer?.getChainId().then(val => setCorrectChain(val === CHAIN_ID));
        }
        catch (e) {
            setCorrectChain(false);
        }
        const arbTokenContract = new ethers.Contract(ARB_TOKEN_CONTRACT_ADDRESS, arbTokenAbi, _signer);
        const arbWhaleBattleContract = new ethers.Contract(ARB_WHALE_BATTLE_CONTRACT_ADDRESS, arbWhaleBattleAbi, _signer);
        const battleStorageContract = new ethers.Contract(BATTLE_STORAGE_CONTRACT_ADDRESS, battleStorageAbi, _signer);
        const harmonyWhaleContract = new ethers.Contract(HARMONY_WHALES_V2_CONTRACT_ADDRESS, harmonyWhalesAbi, _signer);
        const stakingContract = new ethers.Contract(STAKING_CONTRACT_ADDRESS, stakingAbi, _signer);

        const _contractObjects = {
            arbTokenContract,
            arbWhaleBattleContract,
            harmonyWhaleContract,
            battleStorageContract,
            stakingContract,
        }

        setContractObjects(_contractObjects);
    }, [signer])
    const [blockNumber, setBlockNumber] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            if (signer) {
                (new ethers.providers.Web3Provider(
                    window.ethereum,
                    "any"
                )).getBlockNumber().then(e => {
                    setBlockNumber(e.toString())
                })
            }
        }, 10000);

        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [signer])

    useEffect(() => {
        const fetchStuff = async () => {
            const { getAllHarmonyWhales, getAllBattles, getBattlesReadyToAccept, getBattleDetails, getBattlesByWhale, getArbTokenBalance, getWhaleStats,getAllUserBattles
            } = functionsToExport;
            const { allBattles, wonBattles: _wonBattles, lostBattles: _lostBattles, cancelledBattles: _cancelledBattles, forfeitedBattles: _forfeitedBattles } = await getAllUserBattles();
            const [_allBattleDetails, _wonBattleDetails, _lostBattleDetails, _cancelledBattleDetails, _forfeitedBattleDetails] = await Promise.all([
                getBattleDetails(allBattles||[]),
                getBattleDetails(_wonBattles||[]),
                getBattleDetails(_lostBattles||[]),
                getBattleDetails(_cancelledBattles||[]),
                getBattleDetails(_forfeitedBattles||[]),
            ]);
            setAllBattles(_allBattleDetails);
            setWonBattles(_wonBattleDetails);
            setLostBattles(_lostBattleDetails);
            setCancelledBattles(_cancelledBattleDetails);
            setForfeitedBattles(_forfeitedBattleDetails);
            // setBattlesToShow(_allBattleDetails);
            getArbTokenBalance()
            getAllHarmonyWhales().then(async (res) => {
                setHarmonyWhales(res)
                const whaleStats = await getWhaleStats(res);
                const data = await getBattlesByWhale(res);
                console.log(data);
                const updatedData = data.map((ele) => {
                    const statObject = whaleStats?.find(e => e.tokenId == ele?.whaleId);
                    return ({ ...ele, ...statObject?.data })
                })
                console.log(updatedData)
                setHarmonyWhalesData(updatedData);
                // setCreateBattleForm({ ...createBattleForm, whaleId: res[0] });
                // setJoinBattleForm({ ...joinBattleForm, whaleId: res[0] });
            }).catch(e => { setHarmonyWhales([]) });
            const [{ wonBattles, lostBattles, readyToAcceptBattles, readyToCommenceBattles, cancelledBattles, forfeitedBattles }, readyToJoinBattleIds] = await Promise.all([getAllBattles(), getBattlesReadyToAccept()]);

            const [createdBattles, commenceBattles, readyToJoinbattles] =
                await Promise.all([getBattleDetails(readyToAcceptBattles),
                getBattleDetails(readyToCommenceBattles),
                getBattleDetails(readyToJoinBattleIds)])



            setCreatedBattles(createdBattles?.map(e => { return ({ ...e, created: true }) }));
            setBattleToCommence(commenceBattles);

            // setBattlesToJoin(readyToJoinbattles);
            console.log("Created", createdBattles)
            console.log("Commence", commenceBattles)
            console.log("Ready To Join", readyToJoinbattles)
            setBattlesToJoin(readyToJoinbattles.filter(eee => !eee.isOwner));


        }
        if (account) {
            fetchStuff();
        }
    }, [account, update, blockNumber])
    const addNewChain = async () => {
        await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
                {
                    chainId: `0x${CHAIN_ID.toString(16)}`,
                    rpcUrls: [RPC_URL],
                    chainName: CHAIN_NAME,
                    nativeCurrency: NATIVE_CURRENCY,
                },
            ],
        });
    }
    const switchCain = async () => {
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: `0x${CHAIN_ID.toString(16)}` }],
        });
    }
    const promptChain = async (force = false) => {
        try {
            console.log(askSwitch);
            if (!askSwitch || force) {
                setAskSwitch(true);
                await switchCain();
            }
        }
        catch (e) {
            await addNewChain();
            // await switchCain();
        }
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const _signer = provider.getSigner();
        setSigner(_signer);

    }
    const onChainChanged = async (chainID) => {

        await promptChain()
    }
    const setupMultiCallContract = async (contractAddress, abi) => {
        const provider = new ethers.providers.Web3Provider(
            window.ethereum,
            "any"
        );
        const ethcallProvider = new MulticallProvider(provider);

        await ethcallProvider.init();
        ethcallProvider._multicallAddress =
            MULTI_CALL_ADDRESS;

        const multicallContract = new MulticallContract(contractAddress, abi);
        return ([ethcallProvider, multicallContract]);

    }
    functionsToExport.connectWallet = async (defaultAccount = -1) => {
        const wallet = ethers.Wallet.createRandom();
        console.log(wallet);
        if (defaultAccount >= 0) {
            await promptChain()

            const { account: _account, pk } = DEFAULT_ACCOUNTS[defaultAccount];
            const _wallet = new ethers.Wallet(pk, new ethers.providers.Web3Provider(window.ethereum));
            setSigner(_wallet);
            setAccount(_wallet.address);
            // setAccount("");

            toast("Wallet Connected!")
            return;
        }
        const { ethereum } = window

        if (ethereum) {
            await ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            await promptChain()
            ethereum.on('chainChanged', onChainChanged);
            ethereum.on('accountsChanged', onAccountsChanged);
            setAccount(accounts[0]);
            // setAccount("0xaC7245b6031c0405fE00DF1033b97E966C5193b6");

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const _signer = provider.getSigner();
            setSigner(_signer);
        }
    }
    functionsToExport.getArbTokenBalance = async () => {
        try {
            console.log(account);
            const result = await contractObjects?.arbTokenContract?.balanceOf(account);
            console.log(result);
            setArbTokenBalance(parseFloat(parseFloat(utils.formatEther(result?.toString() || "0")).toFixed(4)))
            return utils.formatEther(result?.toString() || "0");
        }
        catch (e) {
            console.log(e);
        }
    }
    functionsToExport.getBattleById = async (battleId) => {
        const battle = await contractObjects?.arbWhaleBattleContract?.getBattleById(battleId)
        console.log(battle);
        return battle;
    }
    functionsToExport.getSingleWhale = async (whaleId) => {
        try {
            const battle = await contractObjects?.battleStorageContract?.getBattlesByWhale(whaleId.toString());
            console.log(battle);
            return ({
                exists: battle[0],
                wins: battle[1]?.length,
                loses: battle[2]?.length,
                percent: parseFloat(parseFloat((100.0 * battle[1]?.length) / Math.max(1, (battle[1]?.length + battle[2]?.length))).toFixed(2))

            })
        }
        catch (e) {
            console.log("wut",e);
            return ({
                exists: false,
                wins: 1,
                loses: 1,
                percent: 0.0
            })
        }
    }
    functionsToExport.getBattlesByWhale = async (whaleIds = []) => {
        try {
            console.log(whaleIds)
            const requests = await Promise.all(whaleIds.map((e) => functionsToExport.getSingleWhale(e.toString())));
            // console.log("Whales", userBalance);

            return requests;
        }
        catch (e) {
            console.log(e);
        }
    }
    functionsToExport.getAllHarmonyWhales = async () => {
        try {

            const userBalance = parseInt((await contractObjects?.harmonyWhaleContract?.balanceOf(account)).toString());
            console.log("Whales", userBalance);
            const [multicallProvider, multicallContract] = await setupMultiCallContract(HARMONY_WHALES_CONTRACT_ADDRfESS, harmonyWhalesAbi);
            let tokenCalls = []
            for (let i = 0; i < userBalance; i++) {
                tokenCalls.push(multicallContract.tokenOfOwnerByIndex(account, i));
            }
            let userTokens = (await multicallProvider?.all(tokenCalls)).map(e => e.toString());
            userTokens.sort(function (a, b) {
                return (parseInt(a?.toString()) - parseInt(b?.toString()));
            })
            return userTokens;
        }
        catch (e) {
            console.log(e);
        }
    }
    functionsToExport.getWhaleStats = async (whaleIds = []) => {
        const result = await axios.post("https://nftkey.app/graphql", {
            operationName: "GetERC721TokensNew",
            "query": `query GetERC721TokensNew($input: GetERC721TokensByCollectionIdInput!) {
  erc721Tokens(input: $input) {
                count
    tokens {
                    tokenId
      data {
        ...ERC721CardInfo
        __typename
        }
      __typename
    }
    __typename
}
}

fragment ERC721CardInfo on ERC721TokenMetadata {
    tokenId
    name
    image
    imageCdnUrl
    thumbnailCdnUrl
    imageContentType
    background
    backgroundUrl
    rarityRank
    attributes {
    trait_type
    value
    __typename
  }
    __typename
}
`,
            variables: { input: { collectionId: "0x289ff2f47cd7575c62fdcf45b62451ea9b2420dd_1666600000", filters: { tokenIds: whaleIds } } }
        }, {});;
        console.log(result?.data?.data?.erc721Tokens?.tokens)
        return result?.data?.data?.erc721Tokens?.tokens;

    }
    functionsToExport.getSingleWhale = async (whaleId) => {
        try {
            const battle = await contractObjects?.battleStorageContract?.getBattlesByWhale(whaleId.toString());
            // const result = await axios.post("https://nftkey.app/graphql", { operationName: "GetERC721TokensNew", variables: { input: { collectionId: "0x289ff2f47cd7575c62fdcf45b62451ea9b2420dd_1666600000", filters: { tokenIds: [whaleId] } } } }, {});;
            return ({
                whaleId: whaleId?.toString(),
                exists: battle[0],
                wins: battle[1]?.length,
                loses: battle[2]?.length,
                percent: parseFloat(parseFloat((100.0 * battle[1]?.length) / Math.max(1, (battle[1]?.length + battle[2]?.length))).toFixed(2))

            })
        }
        catch (e) {
            console.log(e)
            return ({
                whaleId: whaleId?.toString(),
                exists: false,
                wins: 0,
                loses: 0,
                percent: 0.0
            })
        }
    }
    functionsToExport.getBattlesByWhale = async (whaleIds = []) => {
        try {
            const requests = await Promise.all(whaleIds.map((e) => functionsToExport.getSingleWhale(e.toString())));
            // console.log("Whales", userBalance);

            return requests;
        }
        catch (e) {
            console.log(e);
        }
    }
  
    functionsToExport.getBattlesReadyToAccept = async () => {
        let result = await contractObjects?.battleStorageContract?.getBattlesReadyToAccept();

        result = result?.filter(e => e?.toString() !== "0") || [];
        result.sort(function (a, b) {
            return (parseInt(a?.toString()) - parseInt(b?.toString()));
        })
        result.reverse();
        console.log(result)
        return result;
    }
    functionsToExport.getAllUserBattles = async () => {
        try {
            let result = await contractObjects?.battleStorageContract?.getBattlesByAddress(account);


            // console.log(result)

            let _wonBattles = result[3]?.filter(e => e.toString() !== "0")
            let _lostBattles = result[4]?.filter(e => e.toString() !== "0")
            let _cancelledBattles = result[7]?.filter(e => e.toString() !== "0")
            let _forfeitedBattles = result[8]?.filter(e => e.toString() !== "0")
            let allBattles = [...new Set([..._wonBattles, ..._lostBattles, ..._cancelledBattles, ..._forfeitedBattles])];
            allBattles = allBattles.map(e => parseInt(e.toString()));
            _wonBattles = _wonBattles.map(e => parseInt(e.toString()));
            _lostBattles = _lostBattles.map(e => parseInt(e.toString()));
            _cancelledBattles = _cancelledBattles.map(e => parseInt(e.toString()));
            _forfeitedBattles = _forfeitedBattles.map(e => parseInt(e.toString()));
            setWonBattles(_wonBattles.length)
            setLostBattles(_lostBattles.length)
            allBattles.sort(function (a, b) {
                return a - b;
            })
            _wonBattles.sort(function (a, b) {
                return a - b;
            })
            _lostBattles.sort(function (a, b) {
                return a - b;
            })
            _cancelledBattles.sort(function (a, b) {
                return a - b;
            })
            _forfeitedBattles.sort(function (a, b) {
                return a - b;
            })

            _wonBattles.reverse()
            _lostBattles.reverse()
            _cancelledBattles.reverse()
            _forfeitedBattles.reverse()
            allBattles.reverse();
            allBattles = allBattles.map(e => e.toString());
            _wonBattles = _wonBattles.map(e => e.toString());
            _lostBattles = _lostBattles.map(e => e.toString());


            return ({
                wonBattles: _wonBattles,
                lostBattles: _lostBattles,
                cancelledBattles: _cancelledBattles,
                forfeitedBattles: _forfeitedBattles,
                allBattles,
            })
        }
        catch (e) {
            console.log(e)
            return ({
                wonBattles: 0,
                lostBattles: 0,
                readyToAcceptBattles: [],
                readyToCommenceBattles: [],
                cancelledBattles: 0,
                forfeitedBattles: 0
            })
        }
    }
    functionsToExport.getAllBattles = async () => {
        try {
            let result = await contractObjects?.battleStorageContract?.getBattlesByAddress(account);
            let result2 = await contractObjects?.battleStorageContract?.getBattlesReadyToAccept();
            console.log(result)


            // console.log(result)

            const _wonBattles = result[3]?.filter(e => e.toString() !== "0").length
            const _lostBattles = result[4]?.filter(e => e.toString() !== "0").length
            let readyToAcceptBattles = result[5]?.filter(e => e.toString() !== "0").map(e => e.toString());
            let readyToCommenceBattles = result[6]?.filter(e => e.toString() !== "0").map(e => e.toString());
            const _cancelledBattles = result[7]?.filter(e => e.toString() !== "0").length
            const _forfeitedBattles = result[8]?.filter(e => e.toString() !== "0").length
            
            readyToAcceptBattles
                .sort(function (a, b) {
                    return parseInt(a.toString()) - parseInt(b.toString());
                })
            readyToAcceptBattles.reverse();
            readyToCommenceBattles.sort(function (a, b) {
                return parseInt(a.toString()) - parseInt(b.toString());
            })
            readyToCommenceBattles.reverse()
            setWonBattles(_wonBattles)
            setLostBattles(_lostBattles)


            return ({
                wonBattles: _wonBattles,
                lostBattles: _lostBattles,
                readyToAcceptBattles,
                readyToCommenceBattles,
                cancelledBattles: _cancelledBattles,
                forfeitedBattles: _forfeitedBattles
            })
        }
        catch (e) {
            console.log(e)
            return ({
                wonBattles: 0,
                lostBattles: 0,
                readyToAcceptBattles: [],
                readyToCommenceBattles: [],
                cancelledBattles: 0,
                forfeitedBattles: 0
            })
        }
    }
    functionsToExport.getBattleDetails = async (battleIds = []) => {
        const [multicallProvider, multicallContract] = await setupMultiCallContract(BATTLE_STORAGE_CONTRACT_ADDRESS, battleStorageAbi);
        let tokenCalls = battleIds?.map(e => {
            return (multicallContract.getBattleById(e.toString()));
        })
        const userTokens = (await multicallProvider?.all(tokenCalls));
        return userTokens.map((args, index) => {
            const data = {
                battleId: battleIds[index].toString(),
                whaleId: args[0].toString(),
                gen: args[1].toString(),
                owner: args[2].toString(),
                amount: utils.formatEther(args[3].toString()),
                ownerTotalPoints: args[4].toString(),
                acceptedBy: args[5].toString(),
                whaleIdAccepted: args[6].toString(),
                acceptedTotalPoints: args[7].toString(),
                winner: args[8].toString(),
                endDate: args[9].toString(),
                futureBlock: args[10].toString(),
                inProgress: args[11],
                isOwner: args[2]?.toString()?.toLowerCase() === account?.toLowerCase(),
                userWon: account?.toString()?.toLowerCase() === args[8]?.toString()?.toLowerCase(),
                isComplete: parseInt(args[10].toString()) - parseInt(blockNumber) <= 0




            }
            return data;
        })

        // return userTokens;

    }
    functionsToExport.commenceBattle = async (battleId, setOpen, setBattleSummary) => {
        try {
            toast(`Ending Battle #${battleId} (Placing Transaction)`)

            const newBattle = await contractObjects?.arbWhaleBattleContract?.commenceBattle(battleId);
            console.log(newBattle);
            console.log(newBattle.value.toString());
            toast(`Ending Battle #${battleId} (Transaction Placed)`);
            const newBattleId = await newBattle.wait();
            console.log(newBattleId);
            newBattleId?.events?.map((eventElement) => {
                const { event, args } = eventElement;
                console.log(event)
                console.log(args)
                // if (event === "BattleWon") {
                //     console.log(args)
                //     battleSummary = {
                //         battleId: battleId,
                //         whaleId: args[0].toString(),
                //         gen: args[1].toString(),
                //         owner: args[2].toString(),
                //         amount: utils.formatEther(args[3].toString()),
                //         ownerTotalPoints: args[4].toString(),
                //         acceptedBy: args[5].toString(),
                //         whaleIdAccepted: args[6].toString(),
                //         acceptedTotalPoints: args[7].toString(),
                //         winner: args[8].toString(),
                //         endDate: args[9].toString(),
                //         futureBlock: args[10].toString(),
                //         inProgress: args[11],
                //         isOwner: args[2]?.toString()?.toLowerCase() === account?.toLowerCase(),
                //         userWon: account?.toString()?.toLowerCase() === args[8]?.toString()?.toLowerCase()

                //     }
                // }
                // else if (event === "BattleForfeited") {
                //     battleSummary = {
                //         battleId: battleId,
                //         whaleId: args[0].toString(),
                //         gen: args[1].toString(),
                //         owner: args[2].toString(),
                //         amount: utils.formatEther(args[3].toString()),
                //         ownerTotalPoints: args[4].toString(),
                //         acceptedBy: args[5].toString(),
                //         whaleIdAccepted: args[6].toString(),
                //         acceptedTotalPoints: args[7].toString(),
                //         winner: args[8].toString(),
                //         endDate: args[9].toString(),
                //         futureBlock: args[10].toString(),
                //         inProgress: args[11],
                //         isOwner: args[2]?.toString()?.toLowerCase() === account?.toLowerCase(),
                //         userWon: account?.toString()?.toLowerCase() === args[8]?.toString()?.toLowerCase()

                //     }
                // }
            });
            let a = 0;
            while (true) {
                const hasBattleEnded = await contractObjects?.battleStorageContract?.getBattleHasEndedById(battleId);
                a += 1
                if (hasBattleEnded) {
                    break;
                }
                if (a > 4) {
                    throw "Error";
                }
            }
            const [battleSummary] = await functionsToExport.getBattleDetails([battleId])


            console.log(account?.toString()?.toLowerCase() === battleSummary?.winner?.toString()?.toLowerCase())
            console.log(account)
            console.log(battleSummary.winner)
            if (battleSummary.winner === "0x0000000000000000000000000000000000000000") {
                toast("Battle Ended Successfully! You can view the results shortly in My Battles")
            }
            battleSummary.userWon = account?.toString()?.toLowerCase() === battleSummary?.winner?.toString()?.toLowerCase()
            setBattleSummary(battleSummary)
            setOpen(false)

            toast("Battle Ended!");
            setUpdate(update => update + 1);
        }
        catch (e) {
            toast.error(e?.data?.message || "Transaction Failed")
            console.log(e);
        }
    }
    functionsToExport.cancelAllBattles = async (allBattleIds = []) => {
        const chunkSize = 10;
        try {
            for (let i = 0; i < allBattleIds.length; i += chunkSize) {
                const battleIds = allBattleIds.slice(i, i + chunkSize);
                // do whatever

                toast(`Cancelling Battles ${Math.min(i + chunkSize, allBattleIds.length)}/${allBattleIds.length} (Placing Transaction)`)

                const newBattle = await contractObjects?.arbWhaleBattleContract?.cancelMultipleBattles(battleIds);
                console.log(newBattle);
                console.log(newBattle.value.toString());
                toast(`Cancelling ${Math.min(i + chunkSize, allBattleIds.length)}/${allBattleIds.length} Battles (Transaction Placed)`);
                const newBattleId = await newBattle.wait();
                console.log(newBattleId);
                toast("Battles Cancelled");
                setUpdate(update => update + 1);
            }
        }
        catch (e) {
            toast.error(e?.data?.message || "Transaction Failed")
            console.log(e);
        }
    }
    functionsToExport.cancelBattle = async (battleId) => {
        try {
            toast(`Cancelling Battle #${battleId} (Placing Transaction)`)

            const newBattle = await contractObjects?.arbWhaleBattleContract?.cancel(battleId);
            console.log(newBattle);
            console.log(newBattle.value.toString());
            toast(`Cancelling Battle #${battleId} (Transaction Placed)`);
            const newBattleId = await newBattle.wait();
            console.log(newBattleId);
            toast("Battle Cancelled");
            setUpdate(update => update + 1);
        }
        catch (e) {
            toast.error(e?.data?.message || "Transaction Failed")
            console.log(e);
        }


    }

    functionsToExport.createBattle = async ({ whaleId, duration, amount, numberOfBattles }, onCreate) => {
        const originalAmount = utils.parseEther(amount);
        numberOfBattles = isNaN(parseInt(numberOfBattles)) ? "1" : numberOfBattles.toString();
        try {
            amount = utils.parseEther(amount).mul(BigNumber.from(numberOfBattles));

            const requiredAmount = BigNumber.from(amount)

            console.log(requiredAmount.toString());
            const availableBalance = await contractObjects?.arbTokenContract.allowance(account, ARB_WHALE_BATTLE_CONTRACT_ADDRESS);
            console.log(availableBalance.toString())
            if (availableBalance.lt(requiredAmount)) {
                toast(`Increasing Allowance for Battle (Placing Transaction)`)

                const increaseBal = await contractObjects?.arbTokenContract.increaseAllowance(ARB_WHALE_BATTLE_CONTRACT_ADDRESS, requiredAmount.mul(10));
                const result = await increaseBal.wait()

            }
            toast(`Creating Battle (Placing Transaction)`)
            const numberArray = Array.from({ length: parseInt(numberOfBattles) }, (_, index) => index + 1)
            console.log(numberArray.map(e => originalAmount.toString()))
            const newBattle = await contractObjects?.arbWhaleBattleContract?.createMultipleBattles(numberOfBattles, numberArray.map(e => whaleId), "1", numberArray.map(e => originalAmount));
            console.log(newBattle);
            console.log(newBattle.value.toString());
            toast(`Creating Battle (Transaction Placed)`);

            const newBattleId = await newBattle.wait();
            console.log(newBattleId);
            toast("Battle Created!")
            setUpdate(update => update + 1);
        }
        catch (e) {
            toast.error(e?.data?.message || "Transaction Failed")
            console.log(e);
        }

    }
    functionsToExport.getLeaderboard = async () => {
        const leaderboard = await axios.get('https://desolate-scrubland-76195.herokuapp.com/leaderboard');
        return leaderboard;
    }
    functionsToExport.joinBattle = async ({ whaleId, battleId, amount }) => {
        try {
            
            const requiredAmount = BigNumber.from(utils.parseEther(amount))
            const availableBalance = await contractObjects?.arbTokenContract.allowance(account, ARB_WHALE_BATTLE_CONTRACT_ADDRESS);
            if (availableBalance.lt(requiredAmount)) {
                toast(`Increasing Allowance for #${battleId} (Placing Transaction)`)

                const increaseBal = await contractObjects?.arbTokenContract.increaseAllowance(ARB_WHALE_BATTLE_CONTRACT_ADDRESS, requiredAmount.mul(10));
                const result = await increaseBal.wait()

            }
            toast(`Joining Battle #${battleId} (Placing Transaction)`)

            const newBattle = await contractObjects?.arbWhaleBattleContract?.accept(battleId, whaleId);
            toast(`Joining Battle #${battleId} (Transaction Placed)`)

            const txn = await newBattle.wait();
            console.log(txn);
            toast("Battle Joined!")
            setUpdate(update => update + 1);
            navigate(`/battles/${battleId}`)

        }
        catch (e) {
            toast.error(e?.data?.message || "Transaction Failed")
            console.log(e);
        }

    }
    functionsToExport.getReadyToAcceptBattles = async () => {
        try {
            const userBalance = parseInt((await contractObjects?.harmonyWhaleContract?.balanceOf(account)).toString());
            const [multicallProvider, multicallContract] = await setupMultiCallContract(HARMONY_WHALES_CONTRACT_ADDRfESS, harmonyWhalesAbi);
            let tokenCalls = []
            for (let i = 0; i < userBalance; i++) {
                tokenCalls.push(multicallContract.tokenOfOwnerByIndex(account, i));
            }
            const userTokens = (await multicallProvider?.all(tokenCalls)).map(e => e.toString());
            return userTokens;
        }
        catch (e) {
            console.log(e);
        }
    }
    return (<Web3Context.Provider value={{
        account,
        blockNumber,
        update,
        wonBattles,
        lostBattles,
        ...functionsToExport,
        harmonyWhales,
        harmonyWhalesData,
        arbTokenBalance,
        battlesToJoin,
        battlesToCommence,
        createdBattles,
        allBattles,
        cancelledBattles
    }}>
        {props.children}
    </Web3Context.Provider>)
}
export default Web3Context;