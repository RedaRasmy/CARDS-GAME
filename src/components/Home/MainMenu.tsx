import React from 'react'

export default function MainMenu() {
    return (
        <div 
        className='w-[300px] py-8 rounded-lg flex justify-center flex-col items-center gap-3
        bg-sky-950'
        >
            <button className="btn btn-outline btn-warning btn-wide">PLAY</button>
            <button className="btn btn-outline btn-warning btn-wide">ABOUT</button>
            <button className="btn btn-outline btn-warning btn-wide">SETTINGS</button>
        </div>
    )
}

