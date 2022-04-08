/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState, useContext, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import Web3Context from 'contexts/Web3Context';


export default function BattleProgressModal({ battleId = 24, amount = 555, handleClick, handelClick, whaleId = 7, owner = "0xxx", open, setOpen, whaleData, isComplete }) {
  const cancelButtonRef = useRef(null);
  const [battleSummary, setBattleSummary] = useState();//battle Summary would contain the win/lose results. If this is has a value, the battle has ended and show user the popup instead of video
  useEffect(() => {
    if (!open) {
      setBattleSummary();
    }
  }, [open])
  const { commenceBattle } = useContext(Web3Context);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            {!battleSummary ?
              <div className="relative py-8 px-8 z-50 inline-block align-bottom bg-black bg-opacity-70 rounded-lg text-center transform transition-all sm:my-8 sm:align-middle ">
                <video width="750" height="500" playsInline autoPlay muted loop style={{ pointerEvents: "none" }} >

                  <source src="/BattleProgress.mp4" type="video/mp4" />
                </video>
                {isComplete ?
                  <div
                    className="h-32 mx-auto  w-60 relative text-md tracking-tight font-extrabold text-white text-xl flex items-center wallet-btn ">
                    <button
                      onClick={() => commenceBattle(battleId, setOpen, setBattleSummary)}

                      className="w-full font-extrabold cursor-pointer flex items-center justify-center px- py-3 mb-3 "
                    >
                      End Battle
                    </button>
                  </div>
                  : <div className="text-center font-bold text-xl text-white my-4">Battle in Progress...</div>}
              </div> : <>
                <div className="font-semibold text-xl cursor-pointer text-white text-center mx-auto">Winner: {battleSummary?.winner?.slice(0, 4)}...{battleSummary?.winner?.slice(-4)}</div>
                <div className="font-semibold text-xl cursor-pointer text-white text-center mx-auto">Winnings: {battleSummary?.amount} AQUA</div>
                <div className="font-semibold text-xl cursor-pointer text-white text-center mx-auto">Battle Host: {battleSummary?.owner?.slice(0, 4)}...{battleSummary?.owner?.slice(-4)}</div>
                <div className="font-semibold text-xl cursor-pointer text-white text-center mx-auto">Challenger: {battleSummary?.acceptedBy?.slice(0, 4)}...{battleSummary?.acceptedBy?.slice(-4)}</div>
                <br />

                <div className="font-semibold text-xl cursor-pointer text-white text-center mx-auto">Game Points</div>
                <div className="font-semibold text-xl cursor-pointer text-white text-center mx-auto">Host: {battleSummary?.ownerTotalPoints}</div>
                <div className="font-semibold text-xl cursor-pointer text-white text-center mx-auto">Challenger: {battleSummary?.acceptedTotalPoints}</div>

              </>
            }
          </Transition.Child>
        </div>
      </Dialog >
    </Transition.Root >
  )
}