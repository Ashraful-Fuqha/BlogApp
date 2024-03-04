import React, { useEffect } from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({featuredImage,$id,title}) {
  if(featuredImage){
    return (
      <Link to={`/post/${$id}`}>
          <div className='w-full rounded-xl p-4 text-white mb-3 h-full flex flex-col' >
              <div className='w-full justify-center mb-4'>
                  <img src={appwriteService.getFilePreview(featuredImage)}  alt={title} className='rounded-xl w-full' />
              </div>
              <h2 
                  className='text-xl text-black font-bold justify-end'
              >{title}</h2>
          </div>
      </Link>
    )
  }

}

export default PostCard