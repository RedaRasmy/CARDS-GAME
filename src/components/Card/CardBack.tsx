import { takeCard } from "@/library/slices/cardsLeftSlice"
import { addCard } from "@/library/slices/playerCardsSlice"
import { useAppDispatch, useAppSelector} from "@/library/store"


export default function CardBack() {
    const dispatch = useAppDispatch()
    const cardsLeft = useAppSelector(state=>state.cardsLeft)



    // pick random number (cardId)
    const randomIndex = Math.floor(cardsLeft.length*Math.random())
    const randomId = cardsLeft[randomIndex]
    //
    function handlePickCard(){
        if (cardsLeft.length>0) {
            dispatch(addCard(randomId))
            dispatch(takeCard(randomId))            
        }

    }
    return (
        <div 
        onClick={handlePickCard}
        className={`bg-card-back bg-cover bg-center p-[2px] w-[72px] h-[104px]
        rounded-[4px] flex justify-center items-center flex-col 
        shadow-md shadow-slate-800  border-black border-opacity-15
        `}>
        </div>
    )
}
