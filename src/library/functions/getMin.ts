export default function getMin(hands:number[][]) {
    let min = hands[0].length
    let playerWithMin = 0
    let i = 0
    for (const hand of hands) {
        if (hand.length < min) {
            min = hand.length
            playerWithMin = i
        }
        i++
    }
    return [min,playerWithMin]
}