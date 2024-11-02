import { cards } from "../../../../public/cards"
import C from "./combination"


export default function colorChangingProb(CTP:number,KC:number[],ECN:number) {
    let p1 = 0 , p2 = 0
    const UN = 40 - KC.length
    const JudgeCardWithCTPcolor = cards.filter(
        card=>((card.power === 'JUDGE') && (card.color === cards[CTP].color))
    )[0].id
    if (!KC.includes(JudgeCardWithCTPcolor)){ 
        // p1 = ECN/(40-KC.length)*0.75
        p1 = (1 - C(UN-1,ECN)/C(UN,ECN))*0.75
    }
    if (cards[CTP].number) {
        const Exception = KC.filter(
            card=>( (cards[card].number === cards[CTP].number) && (card!==CTP) )
        ).length
        // p2 = ECN/(40-KC.length)*(3-Exception)
        const n = UN - (3-Exception)
        p2 = 1 - C(n,ECN)/C(UN,ECN)
    }
    return p1 + p2
}
