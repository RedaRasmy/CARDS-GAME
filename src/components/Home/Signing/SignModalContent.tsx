import SignInForm from "./SignInForm"
import RegisterForm from "./RegisterForm"
import { useState } from "react"

export default function SignModalContent() {
    const [status,setStatus] = useState<'sign-in' | 'sign-up'>('sign-in')
    function handleToggle() {
        if (status === 'sign-in')  {
            setStatus('sign-up')
        }else {
            setStatus('sign-in')
        }
    }
    return (
        <div className="w-">
            {status === 'sign-in'
            ? <SignInForm onToggle={handleToggle}/>
            : <RegisterForm onToggle={handleToggle}/>
            }
        </div>
    )
}
