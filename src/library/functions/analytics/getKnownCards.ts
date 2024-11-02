import { Turn } from "@/library/types";


export default function getKnownCards(turns:Turn[],selfCards:number[],CC:number) {
    const output = [...selfCards,CC]
    if (turns.length === 0 ){
        return output
    }
    const reversedTurns = turns.slice().reverse()
    const enemey = reversedTurns[0].player
    for (const turn of reversedTurns) {
        if ((turn.player === enemey) && (turn.action === '+Card')){
            return output
        }else if (turn.cardId !== CC) {
            output.push(turn.cardId)
        }
    }
    return output
}
