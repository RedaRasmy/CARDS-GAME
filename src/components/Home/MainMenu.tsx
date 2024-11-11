

import Link from "next/link"
import { ReactNode, useRef } from "react"
import SignModalContent from "./Signing/SignModalContent"


export default function MainMenu() {
    const signRef = useRef<HTMLDialogElement>(null)
    function handleAccount(){
        // check if already signed in

        // if no : register/sign in pop up
        signRef.current?.showModal()
        // else : go to profile page
        console.log('clicked')
    }
    function handleSettings() {
        (document.getElementById('settingsModal') as HTMLDialogElement).showModal()
    }
    return (
        <div className=''>
            <dialog 
            className="w-[clamp(250px,90%,1000px)] rounded-md"
            ref={signRef}><SignModalContent/></dialog>
            <div 
            className='w-[300px] py-8 rounded-lg flex justify-center flex-col items-center gap-3'
            >
                <Link href={'/Game'}>
                    <MainMenuButton>
                        PLAY
                    </MainMenuButton>
                </Link>
                <MainMenuButton 
                onClick={handleAccount}>
                    ACCOUNT
                </MainMenuButton>
                <MainMenuButton onClick={handleSettings}>
                    SETTINGS
                </MainMenuButton>
                {/* <MainMenuButton >ABOUT </MainMenuButton> */}
            </div>
            <Modal id="settingsModal">...</Modal>
            <Modal id="signModal">...</Modal>
        </div>
    )
}



////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////




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
    onClick?:()=>void
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

