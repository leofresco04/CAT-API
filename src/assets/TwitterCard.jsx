import { useState } from "react"
import { BookmarkSlashIcon } from '@heroicons/react/24/solid'

const TwitterCard=({userName, user, url, description, deleteFav, favId })=>{
const [follow, setFollow] = useState(true)
 const isFollow =()=>{
    return setFollow(!follow)
 }
    return(
 <article className="flex items-center gap-4 w-full">
    
    <img className="border rounded-full sm:w-20 sm:h-20  h-20 w-20 border border-black object-cover " src={url} alt="{description}" />
    
        <p className="flex flex-col overflow-hidden">
            <span className="text-white truncate">{user}</span>
            <span className="text-gray-400 mt-1 truncate overflow-hidden">{userName}</span>
        </p>
        
    <button  onClick={()=>deleteFav(favId)}
     className={` flex justify-center items-center rounded-lg text-black bg-white hover:bg-blue-400 w-20 h-auto ml-auto px-3 py-1 ml-auto `}><BookmarkSlashIcon className="w-5 h-5"/></button>
 </article>
       
        
    )
}

export default TwitterCard