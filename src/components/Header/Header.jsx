import React, { useState } from 'react'
import {Container, Logo, LogoutBtn, } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector(state => state.auth.status);
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]

  return (
    <header className='py-3 shadow text-white'>
        <Container>
          <nav className='flex bg-[#65868A] justify-between rounded-xl mx-3 px-5 py-2'>
            <div className='mr-4 self-start'>
              <Link to={'/'}>
                <Logo width='40px'/>
              </Link>
            </div>
            <div className="block self-end md:hidden">
              <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center px-3 py-2 rounded text-black hover:text-gray-200"
              >
                <svg
                className={`fill-current h-6 w-6 ${isOpen ? "hidden" : "block"}`}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
                <svg
                className={`fill-current h-6 w-6 ${isOpen ? "block" : "hidden"}`}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                </svg>
              </button>

              <div className={`${isOpen ? 'block' : 'hidden'}`}>  
              <ul className='flex flex-col justify-center items-center ml-auto'>
                {navItems.map((item) => 
                  item.active ? (
                    <li key={item.name}>
                      <button onClick={() => navigate(item.slug)}
                              className='inline-block px-6 py-2 duration-200 hover:bg-[#12474a] rounded-full'
                      >{item.name}</button>
                    </li>
                  ) : null  
                )}

                {authStatus && (
                  <li>
                    <LogoutBtn/>
                  </li>
                )}
              </ul>
            </div>
            </div>
            <div className='md:block hidden'>  
              <ul className='flex ml-auto'>
                {navItems.map((item) => 
                  item.active ? (
                    <li key={item.name}>
                      <button onClick={() => navigate(item.slug)}
                              className='inline-block px-6 py-2 duration-200 hover:bg-[#12474a] rounded-full'
                      >{item.name}</button>
                    </li>
                  ) : null  
                )}

                {authStatus && (
                  <li>
                    <LogoutBtn/>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </Container>
    </header>
  )
}

export default Header

