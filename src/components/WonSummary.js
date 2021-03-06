/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'

export default function WonSummary({ battleId = 24, hideWin, amount = 555, whaleId = 7, whaleIdAccepted = -1, ownerTotalPoints, acceptedTotalPoints, acceptedBy, owner = "0xxx", open, setOpen, userWon, winner }) {
  const cancelButtonRef = useRef(null)

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
            <div className="relative py-8 px-8 z-50 inline-block align-bottom bg-black bg-opacity-70 rounded-lg text-center transform transition-all sm:my-8 sm:align-middle max-w-3xl">
              <div className="font-bold text-3xl my-3 cursor-pointer text-white text-center mx-auto">Battle #{battleId} Summary</div>
              {!hideWin && < div className="font-bold text-3xl my-3 cursor-pointer text-white text-center mx-auto">{whaleIdAccepted?.toString() == "0" ? "Battle Cancelled" : ownerTotalPoints?.toString() === acceptedTotalPoints?.toString() && ownerTotalPoints?.toString() == "0" ? <>Battle Forfeited</> : <> You {userWon ? "Won" : "Lost"}</>}</div>}

              <div className="flex w-full justify-center items-center">
                <img className=" mx-2 w-1/3 flex-1 rounded-lg cursor-pointer" src={`https://harmony-whales-meta.herokuapp.com/token/image/${whaleId}`} alt="" />
                {whaleIdAccepted > 0 && <>
                  <div className="text-xl text-white px-1 font-bold">VS</div>
                  <img className=" mx-2 flex-1 w-1/3 rounded-lg cursor-pointer" src={`https://harmony-whales-meta.herokuapp.com/token/image/${whaleIdAccepted}`} alt="" />
                </>}

              </div>
              <br />
              <div className="font-semibold text-xl cursor-pointer text-white text-center mx-auto">Winner: {winner?.slice(0, 4)}...{winner?.slice(-4)}</div>
              <div className="font-semibold text-xl cursor-pointer text-white text-center mx-auto">Winnings: {amount} AQUA</div>
              <div className="font-semibold text-xl cursor-pointer text-white text-center mx-auto">Battle Host: {owner?.slice(0, 4)}...{owner?.slice(-4)}</div>
              <div className="font-semibold text-xl cursor-pointer text-white text-center mx-auto">Challenger: {acceptedBy?.slice(0, 4)}...{acceptedBy?.slice(-4)}</div>
              <br />

              <div className="font-semibold text-xl cursor-pointer text-white text-center mx-auto">Game Points</div>
              <div className="font-semibold text-xl cursor-pointer text-white text-center mx-auto">Host: {ownerTotalPoints}</div>
              <div className="font-semibold text-xl cursor-pointer text-white text-center mx-auto">Challenger: {acceptedTotalPoints}</div>

            </div>
          </Transition.Child>
        </div>
      </Dialog >
    </Transition.Root >
  )
}