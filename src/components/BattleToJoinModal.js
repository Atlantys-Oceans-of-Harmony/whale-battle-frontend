/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'

export default function BattleToJoinModal({ battleId = 24, amount = 555, handleClick, handelClick, whaleId = 7, owner = "0xxx", open, setOpen, whaleData }) {
  console.log(open)
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
            <div className="relative py-8 px-8 z-50 inline-block align-bottom bg-black bg-opacity-70 rounded-lg text-center transform transition-all sm:my-8 sm:align-middle ">

              <img className="relative z-40 w-full mx-auto rounded-lg cursor-pointer" src={`https://harmony-whales-meta.herokuapp.com/token/image/${whaleId}`} alt="" />
              <br />
              <div className="font-bold text-2xl cursor-pointer text-white text-center mx-auto">Battle #{battleId}</div>
              <br />
              <div className="font-semibold text-xl cursor-pointer text-white text-center mx-auto">Amount {amount} AQUA</div>
              <div className="font-semibold text-xl cursor-pointer text-white text-center mx-auto">Battle Host: {owner?.slice(0, 4)}...{owner?.slice(-4)}</div>

            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}