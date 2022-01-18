import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { collection, onSnapshot, query, orderBy } from '@firebase/firestore'
import { db } from '../firebase'
import {
    ViewGridIcon,
    PlayIcon,
    BookmarkIcon,
    UserIcon,
    StarIcon
} from "@heroicons/react/outline"



function ProfileHeader() {
    const { data: session } = useSession()
    const [posts, setPosts] = useState()
    const [userPosts, setUserPosts] = useState([])



    useEffect(
        () =>
            onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
                (snapshot) => {
                    setPosts(snapshot.docs)

                }

            ),
        [db]
    );


    useEffect(
        () => {
            if (posts !== undefined)
                setUserPosts(posts?.filter(post => post.data().username === session?.user?.username))
        }
        ,
        [posts]
    );



    // const userPosts =  posts?.filter(post => post.data().username === session?.username) 







    return (
        <div className="max-w6xl mx-5 p-10 xl:mx-auto" >
            <div className='grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto border-b-2'>
                <div>
                    <img className='rounded-full h-32 w-32 border ' src={session?.user?.image} alt='' />
                </div>
                <div>
                    <div className='flex'>
                    <h2 className="text-[42px] font-light text-gray-500">{session?.user?.username}</h2>
                    <button className='mt-4 ml-4 h-10 w-32 rounded-[8px] text-center font-bold p-2 border-solid bg-gray-200 '>Editar</button>

                    </div>
                    <div className='flex justify-between'>
                        <h3 className='font-semibold text-[18px] text-gray-800 mt-4'>{userPosts.length}<p className='font-normal'> posts</p></h3>
                        <h3 className='font-semibold text-[18px] text-gray-800 mt-4'>858 <p className='font-normal'>followers</p></h3>
                        <h3 className='font-semibold text-[18px] text-gray-800 mt-4'>1177 <p className='font-normal'>follows</p></h3>

                    </div>
                    <h3 className='mt-3 mb-4 font-semibold text-zinc-700 '>{session?.user?.name}</h3>
                </div>

            </div>
            {/*secciones*/}
            <div className='h-32 p-8'>
                <div className='mr-10 ml-10 flex  items-center justify-center '>

                    <div className='flex cursor-pointer lg:mr-20  text-gray-500 hover:text-black'>
                        <ViewGridIcon className='lg:h-4 sm:h-8 text-gray' />
                        <p className='text-sm lg:visible invisible'>PUBLICACIONES</p>
                    </div>

                    <div className='flex cursor-pointer lg:mr-20  text-gray-500 hover:text-black'>
                        <StarIcon className='lg:h-4 sm:h-8 text-gray' />
                        <p className='text-sm lg:visible invisible'>RELLS</p>
                    </div>

                    <div className='flex cursor-pointer lg:mr-20  text-gray-500 hover:text-black'>
                        <PlayIcon className='lg:h-4 sm:h-8 text-gray' />
                        <p className='text-sm lg:visible invisible'>VIDEOS</p>
                    </div>

                    <div className='flex cursor-pointer lg:mr-20 text-gray-500 hover:text-black '>
                        <BookmarkIcon className='lg:h-4 sm:h-8 text-gray' />
                        <p className=' text-sm lg:visible invisible'>GUARDADO</p>
                    </div>

                    <div className='flex cursor-pointer lg:mr-20  text-gray-500 hover:text-black'>
                        <UserIcon className='lg:h-4 sm:h-8 text-gray' />
                        <p className='text-sm lg:visible invisible'>ETIQUETAS</p>
                    </div>
                </div>

            </div>

            {/*galeria de posts*/}
            <div className='flex justify-center items-center '>
                <div className='grid grid-cols-3 gap-1 sm:gap-5'>
                    {userPosts.map(post => (
                        <img src={post.data().image} alt='post img' className='lg:h-64 h-32 w-full object-cover overflow-hidden cursor-pointer' />
                    ))}

                </div>
            </div>

        </div>
    )
}





export default ProfileHeader
