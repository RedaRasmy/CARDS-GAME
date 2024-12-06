import Image from 'next/image'
import React, { ChangeEvent, FormEvent, InputHTMLAttributes, useState } from 'react'
import {app,database} from '../../../library/firebase/firebaseConfig'
import {getAuth,createUserWithEmailAndPassword,} from 'firebase/auth'
import {  setDoc, doc } from 'firebase/firestore'

export default function RegisterForm({onToggle}:{
    onToggle:()=>void
}) {
    // values state
    const auth = getAuth(app)
    // const collectionRef = collection(database,'users')

    const [formValues,setFormValues] = useState({
        avatar: null as null | File,
        username:'',
        email:'',
        password:'',
    })
    // errors state
    // const [formErrors,setFormErrors] = useState<{
    //     username?:string,
    //     email?:string,
    //     password?:string,
    // }>({})
    // handle values's changing
    const [avatarSrc,setAvatarSrc] =useState('')
    const handleImageChange = (event:ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFormValues({...formValues, avatar : file});
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarSrc(reader.result as string)
            };
            reader.readAsDataURL(file);
        }
    }
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setFormValues({...formValues,[e.target.name]:e.target.value})
    }
    // handle submit
    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createUserWithEmailAndPassword(
            auth,
            formValues.email,
            formValues.password
        ).then((res)=>{
            console.log(res.user)
            // upload to database
            setDoc(doc(database,'users',res.user.uid), {
                uid:res.user.uid,
                username : formValues.username,
                avatar : formValues.avatar
            }).then(()=>{
                console.log('username and avatar added')
            }).catch((err)=>{
                alert(err.message)
            })
            // upload avatar file to storage
            if (formValues.avatar) {
                // const avatarRef = ref(storage,formValues.avatar.name)
                // const uploadTask = uploadBytesResumable(avatarRef,formValues.avatar)
                // uploadTask.on('state_changed',
                //     (snapshot)=>{
                //         const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
                //         console.log("Upload is "+progress+'% done')
                //     },
                //     (err) =>{
                //         console.log(err.message)
                //     },
                //     ()=>{
                //         getDownloadURL(uploadTask.snapshot.ref)
                //         .then((downloadUrl)=>{
                //             console.log('File available at',downloadUrl)
                //         })
                //     }
                // )
            }
        }).catch((err)=>{
            alert(err.message)
        })

        // I must check if the username have been already used
        // I must return a notification (toast) about the response,errors
    }

    return (
        <form 
        onSubmit={handleSubmit}
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
                    <ImageInput name='avatar' onChange={handleImageChange} img={avatarSrc}/>
                    <Input required name='username' placeholder='Username' onChange={handleChange} value={formValues.username}/>
                </div>
                <Input  required type='email' name='email' placeholder='Email' onChange={handleChange} value={formValues.email}/>
                <Input required type='password' name='password' placeholder='Password' onChange={handleChange} value={formValues.password}/>
                <button className='btn btn-accent btn- w-full'>register</button>
            </div>
        </form>
    )
}




/// mini-components :

function ImageInput({img,...props}:{img:string|null} & InputHTMLAttributes<HTMLInputElement>){
    return (
        <label>
            <div className="avatar cursor-pointer ">
                <div className="w-16 h-16 rounded-full overflow-hidden ">
                    <Image 
                    className='object-cover w-full h-full' 
                    alt=''
                    width={500}
                    height={500}
                    src={img || "/images/default-avatar.png"} />
                </div>
            </div>
            <input {...props} type='file' className='hidden' />
        </label>
    )
}

export function Input(props:InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input 
        className='input w-full input-accent'
        {...props} />
    )
}