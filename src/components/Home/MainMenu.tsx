
import Link from "next/link"
import { ReactNode, useEffect, useRef, useState } from "react"
import SignModalContent from "./Signing/SignModalContent"
import {onAuthStateChanged, User} from 'firebase/auth'
import {auth} from '../../library/firebase/firebaseConfig'
import { useRouter } from "next/navigation"


export default function MainMenu() {
    const signRef = useRef<HTMLDialogElement>(null)
    // const [user,setUser] = useState<User|null>(null)
    // useEffect(() => {
    //     onAuthStateChanged(auth, (user) => { setUser(user); });
    // }, []);
    const router = useRouter()
    function handleAccount(){
        // check if already signed in
        if (auth.currentUser) {
            router.push('/Profile')
        } else {
            // if no : register/sign in pop up
            signRef.current?.showModal()
        }
    }
    function handleSettings() {
        (document.getElementById('settingsModal') as HTMLDialogElement).showModal()
    }
    
    return (
        <div className=''>
            <dialog 
            className=" modal"
            ref={signRef}>
                <div className="modal-box">
                    <SignModalContent/>
                </div>
                <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
            </dialog>
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

