import React from 'react'

const Spinner = ({ color = "border-secondary" }) => {
  return (
    <div className='w-full flex justify-center items-center'>
      <div className={`rounded-full size-10 border-t-4 border-x-4 animate-spin ${color}`}></div>
    </div>
  )
}

export default Spinner