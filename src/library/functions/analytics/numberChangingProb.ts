import { cards } from "../../../../public/cards"
import C from "./combination"


export default function numberChangingProb(CTP:number,KC:number[],ECN:number) {
    const UC = 40 - KC.length
    const color = cards[CTP].color
    const Exception = KC.filter(card=>((cards[card].color === color)&&(card!==CTP))).length
    // return (ECN/UC)*(9-Exception)
    const n = UC - (9-Exception)
    return 1 - C(n,ECN)/C(UC,ECN)
}


// to do : the proba of changing the number to another specefic number