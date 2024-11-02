import { cards } from "../../../../public/cards"


export default function numberChangingProb(CTP:number,KC:number[],ECN:number) {
    const UC = 40 - KC.length
    const color = cards[CTP].color
    const Exception = KC.filter(card=>((cards[card].color === color)&&(card!==CTP))).length
    return (ECN/UC)*(9-Exception)
}


// to do : the proba of changing the number to another specefic number