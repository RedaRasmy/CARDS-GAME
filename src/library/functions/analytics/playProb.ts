
import playableCardsWith from "./playableCardsWith"

///// known cards : fct to create that return all the known cards
// all the played cards before the enemey take card are known
// the cards u have are known
// the current card is known
/// in other words : the known cards are the cards that we know they are not with the enemey

//// the unknown cards are the enemey cards and some of the leftCards : 40 - KC


export default function playProb(CTP:number,KC:number[],ECN:number):number {
    // check basic logic // to implement in fct ..
    if (!KC.includes(CTP)) {
        throw Error('the card to play (CTP) must be included in  "myCards" ')
    }
    if (ECN < 1 ) {
        throw Error('the enemey cards number can\'t be 0 or negative')
    }
    // if this proba equal 0  then 100% he will take card 
    // const CLN = 39 - myCards.length - ECN
    const UC = 40 - KC.length
    const PC = playableCardsWith(CTP)
    // playable and known cards :
    const PKCN = KC.filter(card=>PC.includes(card)).length
    return (ECN/UC)*(PC.length - PKCN)
}

