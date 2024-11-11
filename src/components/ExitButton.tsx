import useGame from '@/library/redux/slices/useGame'
import React, { useRef } from 'react'


export default function ExitButton() {
    const {quitGame,gameIsOn} = useGame()
    const dialogRef = useRef<HTMLDialogElement>(null)
    function handleClick() {
        dialogRef.current?.showModal()
    }
    function handleQuit() {
        dialogRef.current?.close()
        quitGame()
    }
    if (gameIsOn) return (
        <>
            <button onClick={handleClick}>
                <i className='bx bxs-exit text-white text-4xl ' />
            </button>

            <dialog 
            ref={dialogRef} 
            className='w-[clamp(200px,50%,500px)] min-h-40 h-1/5 rounded-md p-2 bg-amber-950'>
                <div className='flex flex-col items-center justify-around h-full'>
                    <p className='font-bold'>DO YOU WANT TO QUIT THE GAME ?</p>
                    <button 
                    onClick={handleQuit}
                    className='px-8 py-2 btn btn-error btn-outline'
                    >
                        Quit !
                    </button>
                </div>
            </dialog>
        </>
    )
}

