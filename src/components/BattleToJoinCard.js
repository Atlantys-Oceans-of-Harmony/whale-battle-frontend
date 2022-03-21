const BattleToJoinCard = ({ handleClick, handleDetail, battleId, amount, whaleId, join }) => {
    return (<>
        <div className="px-3 pt-4 m-2 border-2 rounded-md">
            <img
                onClick={() => handleClick()}
                className="w-full mx-auto rounded-lg cursor-pointer" src={`https://harmony-whales-meta.herokuapp.com/token/image/${whaleId}`} alt="" />

            <div onClick={() => handleDetail()}
                className="font-bold text-xl cursor-pointer text-white text-center mx-auto">Battle #{battleId}</div>
            <div className="font-semibold text-lg cursor-pointer text-white text-center mx-auto">Amount {amount} AQUA</div>
            <div
                className="h-32 mx-auto  w-60 relative text-md tracking-tight font-extrabold text-white text-xl flex items-center wallet-btn ">
                <button
                    onClick={() => handleClick()}
                    className="w-full font-extrabold cursor-pointer flex items-center justify-center px- py-3 mb-3 "
                >
                    {join ? "Join" : "Cancel"} Battle
                </button>
            </div>
        </div>
    </>)
}
export default BattleToJoinCard