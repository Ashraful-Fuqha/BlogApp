import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import {getPostsLoading,getPostsLoaded,getPostsFailed} from '../store/postSlice'


function Home() {
    const posts = useSelector((state) => state.posts.posts)
    console.log(posts)
    const status = useSelector((state) => state.auth.status)
    const dispatch = useDispatch()
    useEffect(() => {
        if(posts.length === 0){
            appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                dispatch(getPostsLoaded(posts.documents))
                dispatch(getPostsLoading(false))
                // console.log(posts) obj mila
            } else {
                dispatch(getPostsFailed())
            }
        })
        .catch((error) => 
            console.log(error), 
            dispatch(getPostsFailed())    
        )
    }
    }, [posts])
    
    if(posts.length === 0){ 
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                {status? 'No Posts...' : 
                                'Login to read posts'}
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-col md:grid grid-cols-4 auto-rows-auto text-center'>
                {posts.map((post) => (
                        post.map((pst) => (
                            <div key={pst.$id} className='p-2'>
                            <PostCard {...pst} />
                            {console.log({...pst})}
                            </div>
                        ))
                ))}
            </div>
        </Container>
    </div>
)
}

export default Home