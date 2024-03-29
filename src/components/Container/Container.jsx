import React from 'react'

function Container({children}, flex) {
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 ${flex}`}>{children}</div>
  )
}

export default Container