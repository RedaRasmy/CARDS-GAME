
// Types 
// const size = '30px'

export function Money(){
    return (
        <div 
        className="w-4 h-4 bg-amber-950 rounded-full flex justify-center items-center 
        border border-black
        ">
            <i className='bx bx-bitcoin text-amber-400 ' ></i>
        </div>
    )
}

export function Time(){
    return (
        <div className="w-4 h-4 bg-amber-950 rounded-full flex justify-center items-center 
        border-2 border-black 
        ">
            <i className='bx bxs-time text-amber-400 '></i>
        </div>
    )
}

export function Star(){
    return (
        <div className="w-4 h-4 rounded-full flex justify-center items-center 
        ">
            <i className='bx bxs-star text-amber-400  rotate-[10deg]'></i>
        </div>
    )
}
export function Flag(){
    return (
        <div className="w-4 h-4  rounded-full flex justify-center items-center 
        ">
            <i className='bx bxs-flag-alt text-amber-400  '></i>
        </div>
    )
}


