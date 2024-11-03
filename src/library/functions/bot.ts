import getGoodCards from "./analytics/getGoodCards";
import requirements, { Requirements } from "./requirements"

export type Difficulty = 'easy' | 'medium' | 'hard' | 'hacker'

/**
 *
 * @param {number[]} cards - bot cards.
 * @param {Requirements} requ - The requirements of the current card in the board.
 * @param {Difficulty} diff - The game difficulty (easy,medium,...).
 * @param {number} PCN - player Cards Number
 * @returns {number|undefined} The card Id to play or undifined(to take card).
 */

export default function bot(
    cards:number[],
    requ:Requirements,
    diff:Difficulty,
    PCN:number
): number | undefined{
    ////////////////////////////////////////////////////////////////////////////
    let goodCards:number[]
    ///
    switch (diff) {
        ////////////////////////////
        ////////////////////// EASY
        case 'easy':
            const takeRate = Math.random() < 0.3 // 30% he will take card
            if (!takeRate) {
                return getGoodCards(cards,requ)[0]
            }
            return;
        //////////////////////////////
        ////////////////////// MEDIUM
        case 'medium' :
            /// get the good cards
            goodCards = getGoodCards(cards,requ)
            /// return undefined if empty
            if (goodCards.length ===0) {
                return;
            }
            /// choose the best color with maxColor()
            const colors:string[] = []
            for (const card of goodCards) {
                colors.push(requirements(card)[0] as string)
            }
            const bestColor =  maxColor(colors)
            /// return random card with the best color
            for (const card of goodCards) {
                if((requirements(card)[0] as string)===bestColor){
                    return card
                }
            }
        //////////////////////////////
        ////////////////////// HARD
        case 'hard' : 
            /// set the good cards
            goodCards = getGoodCards(cards,requ)
            ///
            const plus3Card = goodCards.filter(card=>card%10 ===7)[0]
            const JudgeCard = goodCards.filter(card=>card%10 ===8)[0]
            const SkipCard = goodCards.filter(card=>card%10 ===9)[0]
            /// if bot had 2 cards or less
            if (cards.length<3) {
                // check the win 
            }
            /// if player has 2 cards or less
            if (PCN<3) {
                if (plus3Card){
                    return plus3Card
                }else if(JudgeCard) {
                    return JudgeCard
                }else if(SkipCard) {
                    return SkipCard
                }else { // switch color by number
                    const requiredNumber = requ[1] as number
                    if (requiredNumber) {
                        for (const card of goodCards) {
                            if (card % 10 + 1 === requiredNumber) {
                                return card
                            }
                        }
                    }else { // if there is no number play as medium
                        return bot(cards,requ,'medium',PCN)
                    }
                }
            }
    }
}
// function isCardExist(cards,cardCondition)

export function botJudge(botCards:number[],diff:Difficulty){ // return color
    switch (diff) {
        case "easy": // random : 25% for each
            return ['Yellow',"Blue",'Red',"Green"][Math.floor(Math.random()*4)]
        case "medium":
            const colors:string[] = []
            for (const card of botCards) {
                colors.push(requirements(card)[0] as string)
            }
            return maxColor(colors) // return Capitalised Color
        case "hard":
        case "hacker":
    }
}

export function maxColor(colors:string[]){
    const colorsExist:string[] = []
    const counts:number[] = []
    for (const color of colors) {
        if (!colorsExist.includes(color)) {
            colorsExist.push(color)
            const count = colors.filter(clr=>clr===color).length
            counts.push(count)
        }
    }
    const maxCount = Math.max(...counts)
    const index = counts.findIndex(value=>value===maxCount)
    return colorsExist[index]
}

export function minColor(colors:string[]){
    const colorsExist:string[] = []
    const counts:number[] = []
    for (const color of colors) {
        if (!colorsExist.includes(color)) {
            colorsExist.push(color)
            const count = colors.filter(clr=>clr===color).length
            counts.push(count)
        }
    }
    const minCount = Math.min(...counts)
    const index = counts.findIndex(value=>value===minCount)
    return colorsExist[index]
}