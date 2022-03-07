import { createContext, useEffect, useState } from "react";
import { ethers } from 'ethers';
import arbTokenAbi from "abis/arbToken.json";
import arbWhaleBattleAbi from "abis/arbWhaleBattle.json";
import harmonyWhalesAbi from "abis/harmonyWhales.json";
import { Provider as MulticallProvider, Contract as MulticallContract } from "ethers-multicall";
import { BigNumber } from "../../node_modules/ethers/lib/ethers";
import { toast } from 'react-toastify';


const DEFAULT_ACCOUNTS = [
    { account: "0x45ac855639318BE9c2CabFBCE810e6fc116C1F72", pk: "f9ead77dddc406d52f1bfe92f9044a54f6e3bd3f106a6c746edd815d20e0e6c4" },
    { account: "0x5A92257505518a59da9DdB4a06343A9402c432c2", pk: "20495af9f8965c3033f969122fd42058b9ad9fb67c4e06af882de828fda55969" },
    { account: "0xe38c48EC0a0F98BE297cDd12fA5923Bf79bFf089", pk: "f02297b225063890dac03cb91e0efc114872bb368552205e7ccd7482f7f9bfbb" },
]

const Web3Context = createContext();

const RPC_URL = "https://api.s0.b.hmny.io";
const CHAIN_ID = 1666700000;
const NATIVE_CURRENCY = {
    name: "one",
    symbol: "ONE", // 2-6 characters long
    decimals: 18,
}
const MULTI_CALL_ADDRESS = "0xd078799c53396616844e2fa97f0dd2b4c145a685";
const CHAIN_NAME = "Harmony Testnet";
const ARB_TOKEN_CONTRACT_ADDRESS = "0x73E49908E6ed030d4b66659D5a94260D4f97D402";
const ARB_WHALE_BATTLE_CONTRACT_ADDRESS = "0x23667c4Ab8fce9EA6689D58B5C11F12256E55b42";
const HARMONY_WHALES_CONTRACT_ADDRfESS = "0x0519f50287DDcdF8b761Dae76Dc1A76776A0af70";
// const HARMONY_WHALES_CONTRACT_ADDRfESS = "0x0519f50287DDcdF8b761Dae76Dc1A76776A0af70";
export const Web3Provider = (props) => {

    const [account, setAccount] = useState();
    const [signer, setSigner] = useState();
    const [contractObjects, setContractObjects] = useState();
    const functionsToExport = {};

    const onAccountsChanged = async (accounts) => {
        setAccount(accounts[0]);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const _signer = provider.getSigner();
        setSigner(_signer);
    }
    useEffect(() => {
        const _signer = signer || new ethers.providers.Web3Provider(
            window.ethereum,
            "any"
        );
        const arbTokenContract = new ethers.Contract(ARB_TOKEN_CONTRACT_ADDRESS, arbTokenAbi, _signer);
        const arbWhaleBattleContract = new ethers.Contract(ARB_WHALE_BATTLE_CONTRACT_ADDRESS, arbWhaleBattleAbi, _signer);
        const harmonyWhaleContract = new ethers.Contract(HARMONY_WHALES_CONTRACT_ADDRfESS, harmonyWhalesAbi, _signer);
        const _contractObjects = {
            arbTokenContract,
            arbWhaleBattleContract,
            harmonyWhaleContract
        }
        setContractObjects(_contractObjects);
    }, [signer])
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
    const promptChain = async () => {
        try {
            await switchCain();
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
    functionsToExport.connectWallet = async (defaultAccount = 1) => {
        const wallet = ethers.Wallet.createRandom();
        console.log(wallet);
        if (defaultAccount >= 0) {
            await promptChain()

            const { account: _account, pk } = DEFAULT_ACCOUNTS[defaultAccount];
            const _wallet = new ethers.Wallet(pk, new ethers.providers.Web3Provider(window.ethereum));
            setSigner(_wallet);
            setAccount(_wallet.address);
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
            return result.toString();
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
    functionsToExport.getAllHarmonyWhales = async () => {
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
    functionsToExport.listenToCreatedBattles = async (onCreated, ownerOnly = false) => {
        let filter = contractObjects?.arbWhaleBattleContract?.filters?.CreatedBattle(null, ownerOnly ? account : null);
        console.log(filter);
        contractObjects?.arbWhaleBattleContract?.on(filter, async (...args) => {
            const data = {
                battleId: args[0].toString(),
                creatorAddress: args[1],
                whaleId: args[2].toString(),
                amount: args[3].toString(),
                color: args[4].toString(),
                created: args[5].toString(),
            }
            console.log(args[0].toString());
            console.log("CreatedBattle");
            console.log(args)
            onCreated(data);
            toast(` Battle #${data.battleId} Added${ownerOnly ? "(by you)" : data.creatorAddress}`);

        })
    }
    functionsToExport.listenToAcceptedBattles = async (onAccepted) => {
        let filter = contractObjects?.arbWhaleBattleContract?.filters?.AcceptedBattle(null, account);
        contractObjects?.arbWhaleBattleContract?.on(filter, async (...args) => {
            const data = {
                battleId: args[0].toString(),
                creatorAddress: args[1],
                whaleId: args[2].toString(),
                amount: args[3].toString(),
                color: args[4].toString(),
                created: args[5].toString(),
            }
            console.log("AcceptedBattle");
            onAccepted(data);
            toast(`Battle #${data.battleId} Accepted!`)

        })
    }

    functionsToExport.listenToCanceledBattles = async (onCancelled) => {
        let filter = contractObjects?.arbWhaleBattleContract?.filters?.CanceledBattle();
        contractObjects?.arbWhaleBattleContract?.on(filter, async (...args) => {
            const data = {
                battleId: args[0].toString(),
                creatorAddress: args[1],
                whaleId: args[2].toString(),
                amount: args[3].toString(),
                color: args[4].toString(),
                created: args[5].toString(),
            }
            console.log(args[0].toString());
            console.log("CreatedBattle");
            console.log(args)
            onCancelled(data);
            toast(`Battle #${data.battleId} Canceled!`)


        })
    }
    functionsToExport.listenToWonBattles = async (onWin) => {
        let filter = contractObjects?.arbWhaleBattleContract?.filters?.BattleWon();
        contractObjects?.arbWhaleBattleContract?.on(filter, async (...args) => {
            const data = {
                battleId: args[0].toString(),
                creatorAddress: args[1],
                whaleId: args[2].toString(),
                whaleIdAccepted: args[3].toString(),
                ownerTotalPoints: args[4].toString(),
                acceptedTotalPoints: args[5].toString(),
                amount: args[6].toString(),
                created: args[7].toString(),
            }
            console.log(args[0].toString());
            console.log("WonBattle");
            console.log(args);
            onWin(data);
            toast(`Battle #${data.battleId} Won!`)


        })
    }
    functionsToExport.cancelBattle = async (battleId) => {
        toast(`Cancelling Battle #${battleId} (Placing Transaction)`)

        const newBattle = await contractObjects?.arbWhaleBattleContract?.cancel(battleId);
        console.log(newBattle);
        console.log(newBattle.value.toString());
        toast(`Cancelling Battle #${battleId} (Transaction Placed)`);
        const newBattleId = await newBattle.wait();
        console.log(newBattleId);


    }

    functionsToExport.createBattle = async ({ whaleId, duration, amount, color }, onCreate) => {

        const requiredAmount = BigNumber.from(amount)
        const availableBalance = await contractObjects?.arbTokenContract.allowance(account, ARB_WHALE_BATTLE_CONTRACT_ADDRESS);
        if (availableBalance.lt(requiredAmount)) {
            toast(`Increasing Allowance for Battle (Placing Transaction)`)

            const increaseBal = await contractObjects?.arbTokenContract.increaseAllowance(ARB_WHALE_BATTLE_CONTRACT_ADDRESS, requiredAmount.mul(10));
            const result = await increaseBal.wait()

        }
        toast(`Creating Battle (Placing Transaction)`)

        const newBattle = await contractObjects?.arbWhaleBattleContract?.create(whaleId, amount, color, duration);
        console.log(newBattle);
        console.log(newBattle.value.toString());
        toast(`Creating Battle (Transaction Placed)`);

        const newBattleId = await newBattle.wait();
        console.log(newBattleId);




    }
    functionsToExport.joinBattle = async ({ whaleId, battleId, amount }) => {

        const requiredAmount = BigNumber.from(amount)
        const availableBalance = await contractObjects?.arbTokenContract.allowance(account, ARB_WHALE_BATTLE_CONTRACT_ADDRESS);
        if (availableBalance.lt(requiredAmount)) {
            toast(`Increasing Allowance for #${battleId} (Placing Transaction)`)

            const increaseBal = await contractObjects?.arbTokenContract.increaseAllowance(ARB_WHALE_BATTLE_CONTRACT_ADDRESS, requiredAmount.mul(10));
            const result = await increaseBal.wait()

        }
        toast(`Joining Battle #${battleId} (Placing Transaction)`)

        const newBattle = await contractObjects?.arbWhaleBattleContract?.accept(battleId, whaleId);
        toast(`Joining Battle #${battleId} (Transaction Placed)`)

        const txn = newBattle.wait();
        console.log(txn);

    }
    return (<Web3Context.Provider value={{ account, ...functionsToExport }}>
        {props.children}
    </Web3Context.Provider>)
}
export default Web3Context;