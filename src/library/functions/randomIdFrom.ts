export default function randomIdFrom(ids:number[],idsNum=1) {
    if (idsNum===1){
        return ids[Math.floor(ids.length*Math.random())]
    }else {
        const output:number[] = []

        while (output.length < idsNum){
            const randomId = randomIdFrom(ids) as number
            if (!output.includes(randomId)){
                output.push(randomId)
            }
        }
        return output
    }
}
