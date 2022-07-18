import { useContext, useEffect, useState } from "react";
import Web3Context from "contexts/Web3Context";
import {
  Navigate,
  useNavigate,
} from "../../../node_modules/react-router-dom/index";
import FadeB from "assets/ListFadeB.png";
import Gem from "assets/Gem_placeholder.png";
import Navbar from "../../components/NavbarV2";
import Container from "components/Container/index";

export default function Artifacts() {
  const { account, getGems } = useContext(Web3Context);

  const navigate = useNavigate();
  const [gems, setGems] = useState(null);
  useEffect(() => {
    if (!account) {
      navigate("/connect", { state: { from: "/gems" } });
    }
    UserGems();
  }, [account]);

  const UserGems = async () => {
    await getGems().then((tokens) => setGems([...tokens]));
  };

  return (
    <>
      <div className="w-full flex flex-col mb-10">
        <Navbar active="GEMS" />

        <div className="grid gap-x-6 gap-y-14 lg:grid-cols-6 md:grid-cols-4 py-10 px-16">
          {gems?.map((gem) => {
            return (
              <div className="relative h-56 flex w-full">
                <img
                  src={Gem}
                  className="absolute bottom-0 h-full left-1/2 -translate-x-2/4"
                />
                <img src={FadeB} className="absolute bottom-0 px-6" />
                <h4 className="absolute left-1/2 bottom-2  -translate-x-2/4 text-white">
                  Token #{gem}
                </h4>
              </div>
            );
          })}

          {/* <div className="border-solid border-red border-2 h-36"></div>
          <div className="border-solid border-red border-2 h-36"></div>
          <div className="border-solid border-red border-2 h-36"></div>
          <div className="border-solid border-red border-2 h-36"></div>
          <div className="border-solid border-red border-2 h-36"></div>
          <div className="border-solid border-red border-2 h-36"></div>
          <div className="border-solid border-red border-2 h-36"></div>
          <div className="border-solid border-red border-2 h-36"></div>
          <div className="border-solid border-red border-2 h-36"></div>
          <div className="border-solid border-red border-2 h-36"></div>
          <div className="border-solid border-red border-2 h-36"></div> */}
        </div>
      </div>
    </>
  );
}
