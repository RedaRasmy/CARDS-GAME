

export default function getStackPos() {
    const stackPos = document.getElementById('stack')?.getBoundingClientRect()
    const grid = document.getElementById('grid')?.getBoundingClientRect()
    const Y = (stackPos && grid) &&  (-stackPos.y +grid.height*0.15 -104 ) 
    const X = (grid) &&  (-  grid.width/6 -36)
    return {X,Y}
}
