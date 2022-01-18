import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon,
} from "@heroicons/react/outline";

import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import {
    addDoc,
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    deleteDoc
} from '@firebase/firestore'
import { db } from '../firebase'
import Moment from 'react-moment';
import { useRouter } from 'next/router'


function Post({ id, username, userImg, img, caption }) {

    const { data: session } = useSession()
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);
    const router = useRouter()


    useEffect(
        () =>
            onSnapshot(
                query(collection(db, 'posts', id, 'comments'),
                    orderBy('timestamp', 'desc')
                ),
                (snapshot) => setComments(snapshot.docs)
            ),
        [db, id]
    )

    useEffect(() => onSnapshot(collection(db, 'posts', id, 'likes'),
        (snapshot) => setLikes(snapshot.docs)

    ),
        [db, id]
    )

    useEffect(()=>{
        setHasLiked( likes.findIndex((like) =>  like.id === session?.user.id) !== -1 )
    },[likes])


    const likePost = async () => {
        if (hasLiked) {
            await deleteDoc(doc(db, 'posts', id, 'likes', session.user.id))
        } else {
            await setDoc(doc(db, 'posts', id, 'likes', session.user.id), {
                username: session.user.username
            })
        }
    }


    const sendComment = async (e) => {
        e.preventDefault();

        const commentToSend = comment;
        setComment('');

        await addDoc(collection(db, 'posts', id, 'comments'), {
            comment: commentToSend,
            username: session.user.username,
            userImage: session.user.image,
            timestamp: serverTimestamp(),

        });
    }

    return (
        <div className="bg-white border rounded-sm my-7">

            {/*header*/}
            <div className="flex items-center p-5">
                <img onClick={() => router.push("/profile")} className="rounded-full h-12 w-12 object-cover border p-1 mr-3 cursor-pointer hover:scale-110 transition transform duration-200 east-out" src={userImg} alt="post user image" />
                <p className="flex-1 font-medium">{username}</p>
                <DotsHorizontalIcon className="h-5 cursor-pointer hover:scale-110 transition transform duration-200 ease-out " />
            </div>

            {/*img*/}
            <img src={img} className="objet-cover w-full" alt="" />

            {/*buttons*/}
            {session && (
                <div className="flex justify-between px-4 pt-4">
                    <div className="flex space-x-4">
                        {
                        hasLiked?(
                            <HeartIconFilled className="btn text-violet-700 " onClick={likePost} />

                            ):(
                            <HeartIcon onClick={likePost} className="btn" />

                        )
                    }
                        <ChatIcon className="btn" />
                        <PaperAirplaneIcon className="btn rotate-45" />
                    </div>
                    <BookmarkIcon className="btn" />
                </div>
            )}

            {/*caption*/}
            <p className="p-5 truncate">
                {likes.length > 0 && (
                    <p className="font-bold mb-1">{likes.length} likes</p>
                    
                )}
                <span className="font-medium mr-1">{username}</span>
                {caption}
            </p>

            {/*comments*/}
            {comments.length > 0 && (
                <div className="ml-10 h-20 overflow-scroll scrollbar-thumb-black scrollbar-thin">
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex items-center space-x-2 mb-3">
                            <img
                                className="h-7 rounded-full"
                                src={comment.data().userImage}
                                alt="user comment img" />
                            <p className="text-sm flex-1">
                                <span className="font-bold mr-2">
                                    {comment.data().username}
                                </span>
                                {comment.data().comment}
                            </p>

                            <Moment fromNow className="pr-5 text-xs">
                                {comment.data().timestamp?.toDate()}
                            </Moment>
                        </div>
                    ))}
                </div>
            )}


            {/*input box*/}
            {session && (
                <form className="flex items-center p-4">
                    <EmojiHappyIcon className="h-7 cursor-pointer" />
                    <input
                        type="text"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        className="flex-1 border-none focus:ring-0 outline-none p-2"
                        placeholder="Add a comment..." />
                    <button
                        type="submit"
                        disabled={!comment.trim()}
                        onClick={sendComment}
                        className="text-gonza-violet-500 hover:text-gonza-violet-700 font-bold py-2 px-4 rounded-sm">
                        Post
                    </button>
                </form>
            )}

        </div>
    )
}

export default Post
