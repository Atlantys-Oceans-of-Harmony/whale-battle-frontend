import { useContext, useEffect, useState } from "react";

import PrimaryButton from "components/Buttons/Primary";
import { Link } from "react-router-dom";

import { Disclosure, Menu, Transition } from '@headlessui/react'

import Web3Context from "contexts/Web3Context";

const Navbar = () => {
    const { connectWallet, account } = useContext(Web3Context);

    const [navbar, setNavbar] = useState(false);
    const [open, setOpen] = useState(false);
    const changeBackground = () => {
        if (window.scrollY >= 4) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    };



    useEffect(() => {
        window.addEventListener("scroll", changeBackground);
    }, []);


    const ConnectToWalletButton = ({ id = -1 }) => {


        return (
            <div onClick={!account ? () => connectWallet(id) : () => { }} className="rounded-md shadow">
                <div
                    href="#"
                    className="text-white w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-midNightBlue bg-mintGreen hover:bg-emerald-400 md:py-2 md:text-md md:px-4"
                >
                    {account || ("Connect to Wallet " + (id > -1 ? (id + 1).toString() : ""))}
                </div>
            </div>
        );

    };
    return (
        <>
            <div
                className={`sticky top-0 z-50 ${navbar ? "bg-slate-800 shadow-md" : "bg-slate-800 no-navbar-background"
                    }`}
            >
                <Disclosure
                    as="nav"
                    className={`flex items-center justify-between py-3 flex-wrap   container px-4 mx-auto`}
                >
                    {({ open }) => (<>

                        <div className="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 pb-2 lg:pb-0">
                            <Link
                                to="/"
                                className="flex items-center flex-shrink-0 text-gray-800 mr-16"
                            >
                                <h1 className="text-md tracking-tight font-extrabold text-white sm:text-xl md:text-2xl">
                                    <span className="block xl:inline">Harmony</span>{' '}
                                    <span className="block text-mintGreen xl:inline">Whales</span>
                                </h1>
                            </Link>
                            <div className="block lg:hidden ">

                                <Disclosure.Button
                                    id="nav"
                                    className="flex items-center px-3 py-2  rounded text-white "
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
                        </div>


                        <div className="hidden menu w-full lg:flex lg:items-center lg:w-auto lg:px-3 px-8">

                            <div className="flex">
                                {!account &&
                                    <ConnectToWalletButton id={0} />}
                                {!account &&
                                    <ConnectToWalletButton id={1} />}
                                <ConnectToWalletButton />
                            </div>

                        </div>
                    </>
                    )}

                </Disclosure>
            </div>
        </>
    );
};
export default Navbar;
