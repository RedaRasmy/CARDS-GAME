
export type PowerType = '+3' | 'JUDGE' | 'SKIP'
export type Color = 'red' | 'yellow' | 'green' | 'blue' | 'black'

export type CardType ={
    id:number,
    color:Color ,
    number?: number,
    power?: PowerType 
}

export type Turn = {
    player : 0 | 1 | 2 | 3 ,
    action: '-Card' | '+Card'
    cardId : number ,
}