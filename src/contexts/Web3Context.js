import { createContext, useEffect, useState } from "react";
import { ethers } from 'ethers';


const Web3Context = createContext();

const RPC_URL = "https://api.s0.b.hmny.io";
const CHAIN_ID = 1666700000;
    const NATIVE_CURRENCY = {
        name: "one",
        symbol: "ONE", // 2-6 characters long
        decimals: 18,
    }
    const CHAIN_NAME = "";
const CONTRACT_ADDRESS = ""
export const Web3Provider = (props) => {
    
    const [account, setAccount] = useState();
    const [signer, setSigner] = useState();
    const [contractObject, setContractContract] = useState();
    const functionsToExport = {};

    const onAccountsChanged = async (accounts) => {
        setAccount(accounts[0]);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
            const _signer = provider.getSigner();
            setSigner(_signer);
    }
    useEffect(()=>{
        const _signer = signer || window.ethereum;
        const _contractObject = new ethers.Contract(CONTRACT_ADDRESS,)
    },[signer])
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

    functionsToExport. connectWallet = async () => {
        const { ethereum } = window

        if (ethereum) {
            await ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            await promptChain()
            ethereum.on('chainChanged',onChainChanged);
            ethereum.on('accountsChanged',onAccountsChanged);
            setAccount(accounts[0]);
            const provider = new ethers.providers.Web3Provider(window.ethereum);
                const _signer = provider.getSigner();
                setSigner(_signer);
        }
    }
     
    return (<Web3Context.Provider value={{ account,  ...functionsToExport }}>
        {props.children}
    </Web3Context.Provider>)
}
export default Web3Context;