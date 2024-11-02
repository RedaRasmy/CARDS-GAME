import { cards } from "../../../../public/cards"


export default function colorChangingProb(CTP:number,KC:number[],ECN:number) {
    let p1 = 0 , p2 = 0
    const JudgeCardWithCTPcolor = cards.filter(
        card=>((card.power === 'JUDGE') && (card.color === cards[CTP].color))
    )[0].id
    if (!KC.includes(JudgeCardWithCTPcolor)){
        p1 = ECN/(40-KC.length)
    }
    if (cards[CTP].number) {
        const Exception = KC.filter(
            card=>( (cards[card].number === cards[CTP].number) && (card!==CTP) )
        ).length
        p2 = ECN/(40-KC.length)*(3-Exception)
    }
    return p1 + p2
}
