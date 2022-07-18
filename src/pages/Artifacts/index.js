import { useContext, useEffect, useState } from "react";
import Web3Context from "contexts/Web3Context";
import {
  Navigate,
  useNavigate,
} from "../../../node_modules/react-router-dom/index";
import FadeB from "assets/ListFadeB.png";
import Navbar from "../../components/NavbarV2";
import Container from "components/Container/index";

export default function Artifacts() {
  const { account, getArtifacts } = useContext(Web3Context);

  const navigate = useNavigate();
  const [artifacts, setArtifacts] = useState(null);
  useEffect(() => {
    if (!account) {
      navigate("/connect", { state: { from: "/artifacts" } });
    }
    UserArtifacts();
  }, [account]);

  const UserArtifacts = async () => {
    await getArtifacts().then((tokens) => setArtifacts([...tokens]));
  };

  return (
    <>
      <div className="w-full flex flex-col mb-10">
        <Navbar active="ARTIFACTS" />

        <div className="grid gap-x-6 gap-y-14 lg:grid-cols-6 md:grid-cols-4 py-10 px-16">
          {artifacts?.map((art) => {
            return (
              <div
                className="relative h-56 flex w-full"
                style={{
                  backgroundImage: `url(https://gateway.pinata.cloud/ipfs/QmTxbjT8GJCQ8YEHzPCKSa8tjjaSTPLDsA41xh2XQssxHk)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                }}
              >
                <img src={FadeB} className="absolute bottom-0" />
                <h4 className="absolute left-1/2 bottom-6  -translate-x-2/4 text-white">
                  Token #{art}
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
