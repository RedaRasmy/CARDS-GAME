
import Image from "next/image";
import useUserData from "@/library/Hooks/useUserData";
import useFirebaseAuth from "@/library/Hooks/useFirebaseAuth";
import { ReactNode, useState } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import useAuthListener from "@/library/Hooks/useAuthListener";

export default function Page() {
  useAuthListener()
  const {data,status,error,changeName} = useUserData()
  const {user,logout} = useFirebaseAuth()
  const [editMode,setEditMode] = useState(false)
  const [username,setUsername] = useState(data.username)

  function handleChangeUsername() {
    setEditMode(false)
    if (username !== data.username) {
      changeName(username)
    }
  }
  // const router = useRouter()
  // if (!user && (typeof window !== 'undefined')) {
  //   router.push('/')
  // }
  const loading = status ==='loading'
  const laodingStyle = loading ? 'blur-[5px]' : ""
  if (error) return <p>{error}</p>
  if (user) return (
    <div className="flex justify-center items-center p-5 h-[100dvh] w-full bg-center bg-[url('/images/history-background3.jpeg')] ">
      <div className={laodingStyle +" grid grid-rows-2 w-[clamp(200px,90%,700px)] min-h-[50%] p-2 bg-slate-950 rounded-xl border-2 border-white border-opacity-20"}>
        <Row>
          <Image
            className="border-black border-[2px] rounded-[20%]"
            alt=""
            src={user.photoURL || "/images/default-avatar.png"}
            width={90}
            height={90}
          />
          <div className="flex flex-col w-[50%]">
            <div className="flex gap-3 flex-col ">
              <div className="flex justify-between items-center ">
                {
                  !editMode?
                  <p className="uppercase w-[90%] text-[1.5rem] tracking-widest font-extrabold text-yellow-500">{data.username}</p>
                  : <input
                  autoFocus
                  maxLength={6}
                  onKeyDown={e=>{if(e.key=='Enter'){handleChangeUsername()}}}
                  type="text"
                  value={username}
                  onChange={e=>setUsername(e.target.value)} 
                  className="uppercase w-[90%] text-[1.5rem] tracking-widest font-extrabold
                  text-yellow-500 bg-transparent outline-none" />
                }
                <div className="tooltip tooltip-primary" data-tip="Edit">
                  <FontAwesomeIcon  onClick={()=>!loading && setEditMode(true)} icon={faPenToSquare} className="cursor-pointer" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p> <span className="badge badge-secondary mr-2">LVL 1</span ><span className="badge badge-accent">0 xp</span></p>
                <div className="tooltip tooltip-primary" data-tip="Logout!" >
                  <FontAwesomeIcon className="cursor-pointer" onClick={()=>!loading && logout()} icon={faArrowRightFromBracket} rotation={180} />
                </div>
              </div>
            </div>
          </div>
        </Row>
        <Row>
          <div className="stat text-center scale-150 overflow-hidden">
            <div className="stat-value">{data.gamesPlayed>0 ? (data.wins/data.gamesPlayed) : 0}%</div>
            <div className="stat-title">Win rate</div>
            <div className="stat-desc text-secondary">{data.gamesPlayed} games played</div>
          </div>
        </Row>
      </div>
    </div>
  );
}

const  Row = ({children}:{children?:ReactNode})=>{
  return <div className="flex items-center justify-center gap-8  overflow-hidden">
    {children}
  </div>
}


// const Spiner = () =>{
//   return (
//     <div 
//     className="animate-spin absolute size-10 blur-0 bg-transparent 
//     border-white border-l-2 border-b-2 rounded-full inset-auto "
//     />
//   )
// }