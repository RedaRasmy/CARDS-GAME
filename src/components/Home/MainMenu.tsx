// import React, { ReactNode } from 'react'

import { ReactNode } from "react"
import PlayOptions from "./PlayOptions"

export default function MainMenu() {
    function handlePlay() {
        (document.getElementById('playModal') as HTMLDialogElement).showModal()
    }
    function handleAccount(){
        // check if already signed in

        // if no : register/sign in pop up

        // else : go to profile page
        console.log('clicked')
    }
    function handleSettings() {
        (document.getElementById('settingsModal') as HTMLDialogElement).showModal()
    }
    return (
        <div className=''>
            <div 
            className='w-[300px] py-8 rounded-lg flex justify-center flex-col items-center gap-3'
            >
                <MainMenuButton
                onClick={handlePlay}>
                    PLAY
                </MainMenuButton>
                <MainMenuButton 
                onClick={handleAccount}>
                    ACCOUNT
                </MainMenuButton>
                <MainMenuButton onClick={handleSettings}>
                    SETTINGS
                </MainMenuButton>
                {/* <MainMenuButton >ABOUT </MainMenuButton> */}
            </div>
            <Modal id="playModal"><PlayOptions/></Modal>
            <Modal id="settingsModal">...</Modal>
            <Modal id="signModal">...</Modal>
        </div>
    )
}


type ModalPorps = {
    id:string,
    children : ReactNode
}
function Modal({id,children}:ModalPorps) {
    return (
        <dialog 
        id={id} className="modal">
            <div className="modal-box">
                {children}
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

type MainMenuButtonProps = {
    onClick:()=>void
    children?:ReactNode
}
function MainMenuButton({children,onClick}:MainMenuButtonProps) {
    return (
        <button 
        onClick={onClick}
        className="btn btn-outline btn-info btn-wide ">
            {children}
        </button>
    )
}

