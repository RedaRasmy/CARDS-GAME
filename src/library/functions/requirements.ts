

export type Requirements = (string | number)[]

export default function requirements(id:number) {
    const output:Requirements = []
    // color 
    if (id<10){
        output.push('Yellow')
    }else if (id<20) {
        output.push('Blue')
    }else if (id<30) {
        output.push('Red')
    }else if (id<40) {
        output.push('Green')
    }
    //number 
    if (id%10 < 7) {
        output.push(id%10 +1)
    }
    return output
}