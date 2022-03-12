const BattleToJoinCard = ({handleClick, handleDetail, battleId, amount, whaleId,join})=>{
    return(<>
      <div className="px-8 pt-8 m-8 border-2 rounded-md">
            <img                             
            onClick = {()=>handleClick()}
 onClick={handleDetail} className="w-full mx-auto rounded-lg cursor-pointer" src={`https://harmony-whales-meta.herokuapp.com/token/image/${whaleId}`} alt="" />

                <div                             onClick = {()=>handleDetail()}
 className="font-bold text-2xl cursor-pointer text-white text-center mx-auto">Battle #{battleId}</div>
                <div className="font-semibold text-xl cursor-pointer text-white text-center mx-auto">Amount {amount} ARB</div>
            <div
                            className="h-32 mx-auto  w-80 relative text-md tracking-tight font-extrabold text-white sm:text-xl md:text-2xl flex items-center wallet-btn ">
                            <button
                            onClick = {()=>handleClick()}
                               className="w-full font-extrabold cursor-pointer flex items-center justify-center px- py-3 mb-3 "
                            >
                                {join?"Join":"Cancel"} Battle
                            </button>
                        </div>
            </div>
    </>)
}
export default BattleToJoinCard