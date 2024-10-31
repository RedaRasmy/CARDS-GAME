import isIdentical from "./isIdentical";
import requirements, { Requirements } from "./requirements"

export type Mode = 'easy' | 'medium' | 'hard' | 'hacker'
/**
 *
 * @param {number[]} cards - bot cards.
 * @param {Requirements} requ - The requirements of the current card in the board.
 * @param {Mode} mode - The game difficulty (easy,medium,...).
 * @returns {number|undefined} The card Id to play or undifined(to take card).
 */
export default function bot(cards:number[],requ:Requirements,mode:Mode): number | undefined{
    ////////////////////////////////////////////////////////////////////////////
    switch (mode) {
        ////////////////////////////
        ////////////////////// EASY
        case 'easy':
            const takeRate = Math.random() < 0.3 // 30% he will take card
            if (!takeRate) {
                for (const card of cards){
                    if (isIdentical(card,requ)){
                        return card
                    }
                }
            }
            return;
        //////////////////////////////
        ////////////////////// MEDIUM
        case 'medium' :
            /// set the good cards
            const goodCards:number[] =[]
            for (const card of cards){
                if (isIdentical(card,requ)){
                    goodCards.push(card)
                }
            }
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
            //...
    }
}

export function botJudge(botCards:number[],mode:Mode){ // return color
    switch (mode) {
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