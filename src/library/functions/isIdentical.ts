import { cards } from "../../../public/cards"
import { Requirements } from "./requirements"

export default function isIdentical(id1:number,requirements:Requirements):boolean {
    // INIT
    const {color,number} = cards[id1]
    const requiredColor = (requirements[0] as string).toLowerCase()
    const requiredNumber = requirements[1]? (requirements[1] as number) : undefined
    let sameNumber = false
    let sameColor = false
    // TEST COLOR
    if (requiredColor === color) {
        sameColor = true
    }
    // TEST NUMBER
    if ((number && requiredNumber) && (number === requiredNumber)) { 
        // the two numbers shoudn't be undefined and they must be equel
        sameNumber = true
    }
    // RETURN 
    return sameColor || sameNumber
}




    // // check if there is a number
    // // let withNumber:boolean = true
    // // if (id1%10 > 6 || id2%10 > 6) {
    // //     withNumber = false
    // // }

    // // test the numbers
    // if (id1 % 10 === id2 % 10){
    //     sameNumber = true
    // }

    // // test the colors
    // if (id1<10 && id2<10 ) {sameColor = true}
    // else if((id1<20 && id1>=10) && (id2<20 && id2>=10)) {sameColor = true}
    // else if((id1<30 && id1>=20) && (id2<30 && id2>=20)) {sameColor = true}
    // else if((id1<40 && id1>=30) && (id2<40 && id2>=30)) {sameColor = true}