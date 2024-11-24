import React from 'react'

function Spinner() {
  return (
    <div className='w-full flex justify-center items-center gap-4'>
      <div className='rounded-full size-10 border-t-4 border-x-4 animate-spin border-secondary'></div>
    </div>
  )
}

export default Spinner