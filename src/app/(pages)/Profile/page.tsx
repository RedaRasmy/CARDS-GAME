'use client'
import Image from 'next/image'
import useEffectGetData from '@/library/firebase/useEffectGetData'

export default function Page() {
    const userInfos = useEffectGetData()
    return (
        <div className='p-5'>
            <div className='flex gap-4 items-center'>
                <Image 
                className='border-red-800 border-2 rounded-full'
                alt='' 
                src={userInfos.avatar || '/images/default-avatar.png'}
                width={100} height={100} />
                username : {userInfos.username}
            </div>
            <div className='mt-4'>
                <p>Games played : {userInfos.gamesPlayed}</p>
                <p>Wins : {userInfos.wins}</p>
            </div>
        </div>
    )
    return <h1 className='text-center h-full'>You should signIn</h1>
}
