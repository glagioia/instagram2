

function Story({ img, username }){
    //no uso la img porque el faker no funciona
    return (
        <div>
            <img className="h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 cursor-pointer object-cover hover:scale-110 transition transform duration-200 east-out" 
            src="https://images.pexels.com/photos/38554/girl-people-landscape-sun-38554.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
             alt="user story image"
             />
            <p className="text-xs w-14 truncate text-center font-medium">{username}</p>
        </div>
    )
}

export default Story
