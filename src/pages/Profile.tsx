import Image from "next/image";
import useUserData from "@/library/Hooks/useUserData";

export default function Page() {
  const {data,status,error} = useUserData()
  if (status === 'loading') return <p>loading...</p>
  if (error) return <p>{error}</p>
  return (
    <div className="flex justify-center items-center p-5 h-[100dvh] w-full bg-[url('/images/profile-background.png')] bg-cover ">
      <div className="flex flex-col justify-center items-center rounded-lg w-[90%] h-[90%]">
        <div className="-space-y-8 w-1/3 flex flex-col items-center">
          <Image
            className="border-yellow-500 border-[5px] rounded-full"
            alt=""
            src={false || "/images/default-avatar.png"}
            width={200}
            height={100}
          />
          <div className="border-yellow-500 border-2 rounded-md w-full text-center bg-red-950 py-3 px-">
            <p className="uppercase tracking-widest font-extrabold text-yellow-500">{data.username}</p>
          </div>
        </div>
        <div className="h-1/3 w-full flex bg-yellow-500 rounded-lg">
          ...
        </div>
      </div>
    </div>
  );
  return <h1 className="text-center h-full">You should signIn</h1>;
}
