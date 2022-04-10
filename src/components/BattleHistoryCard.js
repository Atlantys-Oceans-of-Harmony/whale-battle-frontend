const BattleProgressCard = ({ handleClick, hideWin, battleId, amount, whaleId = 7, whaleIdAccepted = -1, isComplete, ownerTotalPoints, acceptedTotalPoints, userWon }) => {
    return (<>
        <div className="px-2 pt-4 m-2 border-2 rounded-md">

            {!hideWin && <div className="font-bold text-2xl my-3 cursor-pointer text-white text-center mx-auto">{whaleIdAccepted?.toString() == "0" ? "Battle Cancelled" : ownerTotalPoints?.toString() === acceptedTotalPoints?.toString() && ownerTotalPoints?.toString() == "0" ? <>Battle Forfeited</> : <> You {userWon ? "Won" : "Lost"}</>}</div>}

            <div className="flex w-full justify-center items-center">

                <img onClick={handleClick} className=" mx-2 w-24 rounded-lg cursor-pointer" src={`https://harmony-whales-meta.herokuapp.com/token/image/${whaleId}`} alt="" />
                {whaleIdAccepted > 0 && <><div className="text-xl text-white px-1 font-bold">VS</div>
                    <img onClick={handleClick} className=" mx-2 w-24 rounded-lg cursor-pointer" src={`https://harmony-whales-meta.herokuapp.com/token/image/${whaleIdAccepted}`} alt="" />
                </>}
            </div>


            <div className="font-bold text-xl cursor-pointer text-white text-center mx-auto">Battle #{battleId}</div>
            <div className="font-semibold text-lg cursor-pointer text-white text-center mx-auto">Amount {parseFloat(parseFloat(amount)?.toFixed(4))} AQUA</div>
            <div
                className="h-32 mx-auto  w-60 relative text-md tracking-tight font-extrabold text-white text-xl flex items-center wallet-btn ">
                <button
                    onClick={() => handleClick()}
                    className="w-full font-extrabold cursor-pointer flex items-center justify-center px- py-3 mb-3 "
                >
                    View Details
                </button>
            </div>
        </div>
    </>)
}
export default BattleProgressCard