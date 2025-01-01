
import useFirebaseAuth from '@/library/Hooks/useFirebaseAuth'
import { Input } from './RegisterForm'
import Image from 'next/image'

export default function SignInForm({onToggle}:{
    onToggle:()=>void
}
) {
    const {signIn,handleChangeSignInData,signInData,handleGoogle,signInStatus} = useFirebaseAuth()

    return (
        <form 
        onSubmit={signIn}
        className='flex flex-col items-center'>
            <div className='w-full flex justify-end'>
                <button 
                className='underline opacity-30 mb-2' 
                onClick={onToggle}>
                    Register
                </button>
            </div>
            <div className='flex items-center flex-col gap-4 w-[85%]'>
                <Input  required type='email' name='email' placeholder='Email' onChange={handleChangeSignInData} value={signInData.email}/>
                <Input required type='password' name='password' placeholder='Password' onChange={handleChangeSignInData} value={signInData.password}/>
                <button disabled={signInStatus==='loading'} className='btn btn-accent w-full'>Sign In</button>
            </div>
            <button onClick={handleGoogle} className='border w-[85%] h-[3rem] mt-4 rounded-md bg-white flex justify-center items-center'>
                <Image src={'/images/google.png'} alt='' width={40} height={30} />
                {/* <p>Sign In With Google</p> */}
            </button>
        </form>
    )
}
