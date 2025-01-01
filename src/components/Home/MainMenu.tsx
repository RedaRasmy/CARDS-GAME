
import Link from "next/link"
import { ReactNode,  useRef} from "react"
import SignModalContent from "./Signing/SignModalContent"
import { useRouter } from "next/navigation"
import useFirebaseAuth from "@/library/Hooks/useFirebaseAuth"


export default function MainMenu() {
    const signRef = useRef<HTMLDialogElement>(null)
    const {user} = useFirebaseAuth()
    const router = useRouter()
    function handleAccount(){
        // check if already signed in
        if (user) {
            try {
                router.push('/Profile')
            } catch (err) {
                console.log('failed to navigate to user profile : ',err)
            }
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
        className="btn border-black border-2 btn-warning btn-wide ">
            {children}
        </button>
    )
}

