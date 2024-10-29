import isIdentical from "./isIdentical";
import { Requirements } from "./requirements"

export type Mode = 'easy' | 'medium' | 'hard' | 'hacker'

export default function bot(cards:number[],requ:Requirements,mode:Mode){
    switch (mode) {
        case 'easy':
            for (const card of cards){
                if (isIdentical(card,requ)){
                    return card
                }
            }
            break;
        case 'medium' :

    }
}