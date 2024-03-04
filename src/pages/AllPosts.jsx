import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import {getPostsLoading,getPostsLoaded,getPostsFailed} from '../store/postSlice'

function AllPosts() {
    const posts = useSelector((state) => state.posts.posts)
    console.log(posts)
    const status = useSelector((state) => state.posts.status)
    const dispatch = useDispatch()
    // useEffect(() => {
    //     appwriteService.getPosts([]).then((posts) => {
    //     if (posts) {
    //         dispatch(getPostsLoaded(posts.documents))
    //         dispatch(getPostsLoading(false))
    //         // console.log(posts) obj mila
    //     } else {
    //         dispatch(getPostsFailed())
    //     }
    // })
    // .catch((error) => 
    //     console.log(error), 
    //     dispatch(getPostsFailed())    
    // )
    // }, [status])
    
   if(posts){
    return  <div className='w-full py-8'>
            <Container>
                <div className='flex flex-col md:grid grid-cols-4 gap-0 auto-rows-auto text-center'>
                    {posts.map((post) => (
                        post.map((pst) => (
                            <div key={pst.$id} className='p-0'>
                            <PostCard {...pst} />
                            {console.log({...pst})}
                        </div>
                        ))
                    )
                    , console.log(posts))
                    }
                </div>
                </Container>
        </div>
    }
}

export default AllPosts