import Web3Context from "contexts/Web3Context";
import { useContext } from "react";

const Home = ()=>{
    const {account, connectWallet} = useContext(Web3Context);
    return(    <>{account?account:<button onClick={connectWallet}>Connect Wallet</button>}
        </>)
}
export default Home;