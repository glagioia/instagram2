import React from 'react'
import {
    SearchIcon,
    PlusCircleIcon,

    UserGroupIcon,
    HeartIcon,
    PaperAirplaneIcon,
    MenuIcon,
} from "@heroicons/react/outline"

import { HomeIcon } from '@heroicons/react/solid'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { modalState } from '../atoms/modalAtom'
import {useRecoilState} from 'recoil'

function Header() {

    const { data: session, status } = useSession()
    const [open, setOpen] = useRecoilState(modalState)
    const router = useRouter()




    return (
        <div className='shadow-sm border-b bg-white sticky top-0 z-50'>
            <div className='flex justify-between max-w-6xl mx-5 xl:mx-auto'>

                <div onClick={() => router.push("/")} className='relative hidden lg:inline-grid w-24 mt-2  cursor-pointer'>
                    <img src="/instagram.png" layout="fill" />
                </div>
                <div onClick={() => router.push("/")} className='relative lg:hidden flex-shrink-0  w-8  mt-3  cursor-pointer'>
                    <img src="/logo.png" layout="fill" />
                </div>


                {/* {middle-search} */}
                <div className='max-w-xs'>
                    <div className='relative p-3 rounded-md'>
                        <div className='absolute inset-y-0  pl-3 flex items-center pointer-events-none'>
                            <SearchIcon className='h-5 w-5 text-gray-500 ' />
                        </div>
                        <input className="bg-gray-100 block w-full pl-10 h-8 sm:text-sm border-none focus:ring-black focus:border-black rounded-md"
                            type="text"
                            placeholder='search' />
                    </div>
                </div>


                {/* {right} */}
                <div>
                    <div className='flex items-center justify-end space-x-4'>
                        <HomeIcon  onClick={() => router.push("/")} className='navBtn mt-2 ' />
                        {/* <MenuIcon className='w-6 h-6 mt-2 md:hidden cursor-pointer' /> */}

                        {session ? (
                        <>    
                        <div className='relative navBtn'>
                            <PaperAirplaneIcon className='navBtn rotate-45' />
                            <div className='absolute -top-1 -right-2 text-xs w-5 h-5 bg-gonza-violet-600 rounded-full flex items-center justify-center  animate-pulse text-white'>
                                45</div>
                        </div>
                        <PlusCircleIcon onClick={() => setOpen(true)} className='navBtn' />
                        <UserGroupIcon className='navBtn' />
                        <HeartIcon className='navBtn' />

                        <img onClick={() => router.push("/profile")} src={session?.user?.image} alt='profile pic' className='rounded-full w-8 h-8 mt-2 cursor-pointer' />
                        </>

                        ) : (
                            <button className="text-md font-bold text-gonza-violet-500 mt-2 hover:text-gonza-violet-700"onClick={signIn}>Sign In</button>

                        )}


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
