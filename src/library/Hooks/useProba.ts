import colorChangingProb from "../functions/analytics/colorChangingProb";
import getKnownCards from "../functions/analytics/getKnownCards";
import numberChangingProb from "../functions/analytics/numberChangingProb";
import playProb from "../functions/analytics/playProb";
import { useAppSelector } from "../redux/store";

export default function useProba(CTP:number) {
    const turns = useAppSelector(state=>state.gameFlow.turns)
    const {playerCards,currentCardId,botCards} = useAppSelector(state=>state.cardsFlow)
    const KC = getKnownCards(turns,playerCards,currentCardId)
    const playProba = Number(playProb(CTP,KC,botCards.length).toFixed(2))*100
    const numberChangeProba = Number(numberChangingProb(CTP,KC,botCards.length).toFixed(2))*100
    const colorChangeProba = Number(colorChangingProb(CTP,KC,botCards.length).toFixed(2))*100

    return {
        playProba,
        numberChangeProba,
        colorChangeProba
    }
}

