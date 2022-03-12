const BattleProgressCard = ({handleClick, battleId, amount, whaleId=7,whaleIdAccepted=9, isComplete})=>{
    return(<>
      <div className="px-4 pt-8 m-8 border-2 rounded-md">
          <div className="flex w-full justify-center items-center">
          <img onClick={handleClick} className=" mx-2 w-1/3 flex-1 rounded-lg cursor-pointer" src={`https://harmony-whales-meta.herokuapp.com/token/image/${whaleId}`} alt="" />
          <div className="text-xl text-white px-1 font-bold">VS</div>
          <img onClick={handleClick} className=" mx-2 flex-1 w-1/3 rounded-lg cursor-pointer" src={`https://harmony-whales-meta.herokuapp.com/token/image/${whaleIdAccepted}`} alt="" />
          </div>
            

                <div className="font-bold text-2xl cursor-pointer text-white text-center mx-auto">Battle #{battleId}</div>
                <div className="font-semibold text-xl cursor-pointer text-white text-center mx-auto">Amount {amount} ARB</div>
                {isComplete?
            <div
                            className="h-32 mx-auto  w-80 relative text-md tracking-tight font-extrabold text-white sm:text-xl md:text-2xl flex items-center wallet-btn ">
                            <button
                            onClick = {()=>handleClick()}
                               className="w-full font-extrabold cursor-pointer flex items-center justify-center px- py-3 mb-3 "
                            >
                                End Battle
                            </button>
                        </div>
:<div className="text-center font-bold text-xl text-white my-4">Battle in Progress...</div>}
            </div>
    </>)
}
export default BattleProgressCard