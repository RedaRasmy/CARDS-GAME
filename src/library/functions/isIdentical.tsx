

export default function isIdentical(id1:number,id2:number):boolean {
    // init
    let sameNumber:boolean=true
    let sameColor:boolean=false

    // check if there is a number
    let withNumber:boolean = true
    if (id1%10 > 6 || id2%10 > 6) {
        withNumber = false
    }

    // test the numbers
    if(id1%10 !== id2%10 && withNumber) sameNumber=false

    // test the colors
    if (id1<10 && id2<10) sameColor = true
    else if(id1<20 && id2<20) sameColor = true
    else if(id1<30 && id2<30) sameColor = true
    else if(id1<40 && id2<40) sameColor = true

    return sameColor || sameNumber
}
