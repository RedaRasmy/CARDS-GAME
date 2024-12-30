// import Image from 'next/image'
import {InputHTMLAttributes} from 'react'
import useFirebaseAuth from '@/library/Hooks/useFirebaseAuth'

export default function RegisterForm({onToggle}:{
    onToggle:()=>void
}) {
    const {register,handleChangeRegisterData,registerData,registerStatus} = useFirebaseAuth()

    return (
        <form 
        onSubmit={register}
        className='flex flex-col items-center '>
            <div className='w-full flex justify-end'>
                <button 
                className=' underline opacity-30 mb-2' 
                onClick={onToggle}>
                    Sign In
                </button>
            </div>
            <div className='flex items-center flex-col gap-4 w-[85%]'>
                <div className='flex items-center gap-2 w-full -mb-3'>
                    {/* <ImageInput name='avatar' onChange={handleImageChange} img={avatarSrc}/> */}
                    <Input required name='username' placeholder='Username' onChange={handleChangeRegisterData} value={registerData.username}/>
                </div>
                <Input  required type='email' name='email' placeholder='Email' onChange={handleChangeRegisterData} value={registerData.email}/>
                <Input required type='password' name='password' placeholder='Password' onChange={handleChangeRegisterData} value={registerData.password}/>
                <button disabled={registerStatus==='loading'} className='btn btn-accent btn- w-full'>register</button>
            </div>
        </form>
    )
}




/// mini-components :

// function ImageInput({img,...props}:{img:string|null} & InputHTMLAttributes<HTMLInputElement>){
//     return (
//         <label>
//             <div className="avatar cursor-pointer ">
//                 <div className="w-16 h-16 rounded-full overflow-hidden ">
//                     <Image 
//                     className='object-cover w-full h-full' 
//                     alt=''
//                     width={500}
//                     height={500}
//                     src={img || "/images/default-avatar.png"} />
//                 </div>
//             </div>
//             <input {...props} type='file' className='hidden' />
//         </label>
//     )
// }

export function Input(props:InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input 
        className='input w-full input-accent'
        {...props} />
    )
}