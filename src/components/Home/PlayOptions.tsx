import React from 'react'


export default function PlayOptions() {
    function handleStart() {

    }
    return (
        <div 
        style={{
            gridTemplateColumns:'1fr 100px 1fr'
        }}
        className='grid grid-cols-3 h-[200px]'>
            <OfflineSide/>
            <div className='relative'>
                <div 
                className='right-1/2 absolute border-l-2 border-sky-600 opacity-50 h-full'/>
                <div className='absolute top-[35%] left-[19%] w-[100px] first-letter:'>
                    <HomeStartButton onClick={handleStart} />
                </div>
            </div>
            <OnlineSide/>
        </div>
    )
}


function HomeStartButton({onClick}:{onClick:()=>void}) {
    return (
        <button 
        onClick={onClick}
        className='btn btn-circle w-[60px] h-[60px] btn-accent '>
            START
        </button>
    )
}

function OfflineSide() {
    return (
        <div className=''>
            <Title title='OFFLINE'/>
            <div className=' m-10'>
                
            </div>
        </div>
    )
}
function OnlineSide() {
    return (
        <div>
            <Title title='ONLINE'/>
        </div>
    )
}

function Title({title}:{title:string}){
    return (
        <h1
        className='font-bold bg-opacity-50 text-white bg-sky-500
        py-2 px-[15%] rounded-md text-center'
        >{title}</h1>
    )
}