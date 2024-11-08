
import PlayOptions from './PlayOptions'


export default function PreGame() {
    return (
        <div className='rounded-md flex justify-center flex-col items-center gap-2 w-[90%]
        max-w-[500px] py-10 border-white border-opacity-10 '>
            {/* add blue snake animation */}
            <div className='bg-gray-700 p-2 rounded-md w-full'>
                <PlayOptions/>
            </div>
        </div>
    )
}


