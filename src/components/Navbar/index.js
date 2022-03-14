import { useEffect, useState, useContext } from "react";
import Web3Context from "contexts/Web3Context";
import "./style.css";

import { Link } from "react-router-dom";

import { Disclosure, Menu, Transition } from '@headlessui/react'
// import Logo from "assets/logo.png"


const links = [
    { title: "Breeding", to: "/breeding" },
    { title: "Battle", to: "/battle" },
    { title: "Podracing", href: "https://race.atlantys.one" },
    { title: "Land", href: "https://land.atlantys.one" },
    { title: "Arb", to: "/arb" },
    // { title: "Connect Wallet" },
]
const Navbar = () => {

    const [navbar, setNavbar] = useState(false);
    const [open, setOpen] = useState(false);
    const [arbBalance, setArbBalance] = useState(0)
    const changeBackground = () => {
        if (window.scrollY >= 4) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    };
    const { connectWallet, account, getArbTokenBalance, userExperience, update, today, wonBattles, lostBattles } = useContext(Web3Context);
    useEffect(() => {
        getArbTokenBalance().then(e => setArbBalance(parseFloat(e || "0").toFixed(3)));
    }, [account, update])



    useEffect(() => {
        window.addEventListener("scroll", changeBackground);
        connectWallet()
    }, []);


    const ConnectToWalletButton = () => {


        return (
            <div
                onClick={() => connectWallet()}
                className="h-32 relative z-10 text-md tracking-tight font-extrabold text-white sm:text-xl md:text-2xl flex items-center wallet-btn ">
                <button
                    href="#"
                    className="w-full font-extrabold cursor-pointer flex items-center justify-center px-16 py-3 mb-3 "
                >
                    {account ? `${account?.slice(0, 5)}...${account?.slice(-5)}` : "Connect Wallet"}
                </button>
            </div>
        );

    };
    return (
        <>
            <div
                className={` max-w-7xl mx-auto `}
            >
                <Disclosure
                    as="nav"
                    className={`flex items-center justify-between flex-wrap   container  mx-auto`}
                >
                    {({ open }) => (<>

                        <div className="flex flex-grow navbar-background h-32 justify-between items-center lg:justify-start lg:w-auto w-full lg:border-b-0 ">
                            <Link
                                to="/"
                                className="flex items-center flex-shrink-0 text-gray-800  ml-16 mb-3"
                            >
                                {/* <img src={Logo} className="w-56" alt="" /> */}
                                <h1 className="text-md tracking-tight font-extrabold text-white sm:text-xl md:text-2xl">
                                    <span className="block xl:inline">Whale Battles</span>{' '}
                                    <span className="block text-mintGreen xl:inline"></span>
                                </h1>
                            </Link>
                            <div className="block lg:hidden mb-4 mr-8">

                                <Disclosure.Button
                                    id="nav"
                                    className="flex relative z-20 items-center px-3 py-2  rounded text-white "
                                >
                                    <svg
                                        className="fill-current h-6 w-6"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title>Menu</title>
                                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                                    </svg>
                                </Disclosure.Button>

                            </div>
                            <div className="hidden mb-4 menu w-full lg:flex  lg:items-center lg:w-auto lg:px-3 px-8 mr-16">
                                <div className="text-md relative z-10 lg:flex justify-between w-full font-extrabold text-white sm:text-xl md:text-2xl">
                                    {account && <>
                                        <div
                                            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-mintGreen px-4 py-2 rounded  mr-2"
                                        >
                                            Wins vs Loses: {wonBattles}/{lostBattles}
                                        </div>

                                        <div
                                            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-mintGreen px-4 py-2 rounded  mr-2"
                                        >
                                            Arb: {arbBalance}
                                        </div>
                                    </>}
                                    {/* {links.map((e) => {
                                        if (e.to) {
                                            return (<Link
                                                to={e.to || "/"}
                                                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-mintGreen px-4 py-2 rounded  mr-2"
                                            >
                                                {e.title}
                                            </Link>)
                                        }
                                        else if (e.href) {
                                            return (<a
                                                href={e.href || "/"}
                                                target="_blank"
                                                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-mintGreen px-4 py-2 rounded  mr-2"
                                            >
                                                {e.title}
                                            </a>)
                                        }

                                    })} */}


                                </div>
                            </div>
                        </div>
                        <Disclosure.Panel className="lg:hidden w-full">
                            <div className=" w-full mx-auto lg:flex lg:items-center lg:w-auto lg:px-3 px-8">
                                <div className="text-md font-bold mx-auto text-white  ">
                                    <Disclosure.Button
                                        className={`dropdown-bg relative z-10 w-full text-center h-36 block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 `}
                                        style={{}}

                                    >

                                        <Link as="div" to={"/"} className="mb-4 font-bold text-xl"> Home</Link>
                                        {account && <>
                                            <div
                                                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-mintGreen px-4 py-2 rounded  mr-2"
                                            >
                                                Wins vs Loses: {wonBattles}/{lostBattles}
                                            </div>

                                            <div
                                                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-mintGreen px-4 py-2 rounded  mr-2"
                                            >
                                                Arb: {arbBalance}
                                            </div>
                                        </>}
                                    </Disclosure.Button>

                                    {/* {links.map((e, index) => {
                                        if (e.to) {
                                            return (<Disclosure.Button
                                                className={`dropdown-bg-${index + 1} w-full text-center h-36 block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 ${index > 0 ? `relative` : ""}`}
                                                style={{ "top": `-${84 * index}px` }}

                                            >

                                                <Link as="div" to={e.to || "/"} className="mb-4 font-bold text-xl"> {e.title}</Link>
                                            </Disclosure.Button>)
                                        }
                                        else if (e.href) {
                                            return (<Disclosure.Button
                                                className={`dropdown-bg-${index + 1} w-full text-center h-36 block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 ${index > 0 ? `relative` : ""}`}
                                                style={{ "top": `-${84 * index}px` }}

                                            >

                                                <a target={"_blank"} href={e.href || "/"} className="mb-4 font-bold text-xl"> {e.title}</a>
                                            </Disclosure.Button>)
                                        }
                                    })
                                    } */}
                                    <Disclosure.Button


                                    >
                                        <ConnectToWalletButton />

                                    </Disclosure.Button>


                                </div>

                            </div>
                        </Disclosure.Panel>


                        <div className="hidden lg:block">
                            <ConnectToWalletButton />
                        </div>
                    </>
                    )}

                </Disclosure>
            </div>
        </>
    );
};
export default Navbar;
