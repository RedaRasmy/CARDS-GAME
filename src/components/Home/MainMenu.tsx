// import React, { ReactNode } from 'react'

export default function MainMenu() {
    return (
        <div className='overflow-y-hidden'>
            <div 
            className='w-[300px] py-8 rounded-lg flex justify-center flex-col items-center gap-3
            bg-sky-950'
            >
                <button 
                onClick={()=>(document.getElementById('playModal') as HTMLDialogElement).showModal()}
                className="btn btn-outline btn-warning btn-wide">PLAY</button>
                <button className="btn btn-outline btn-warning btn-wide">ABOUT</button>
                <button className="btn btn-outline btn-warning btn-wide">SETTINGS</button>

                
            </div>
            <dialog id="playModal" className="modal">
                <div className="modal-box">
                    hello
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}

