import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

function MiniProfile() {
    const { data: session } = useSession()
    const router = useRouter()

    return (
        <div className="flex items-center justify-between mt-14 ml-10">
            <img className="rounded-full border p-[2px] w-16 h-16" src={session?.user?.image} alt="user miniprofile img" />

            <div className="flex-1 mx-4">
               <h2 onClick={() => router.push("/profile")} className="font-medium cursor-pointer">{session?.user?.username}</h2> 
               <h3 className="text-sm text-gray-400">{session?.user?.name}</h3>
            </div>

            <button className="text-gonza-violet-500 hover:text-gonza-violet-700 text-sm font-semibold" onClick={signOut}>Sign Out</button>
        </div>
    )
}

export default MiniProfile
