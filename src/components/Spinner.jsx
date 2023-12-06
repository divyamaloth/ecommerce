import React from 'react'
import spinner from '../assets/spinner/loading.gif'

function Spinner() {
  return (
    <div className='h-[88vh] w-full flex justify-center items-center'>
        <img src={spinner} alt="" />
    </div>
  )
}

export default Spinner