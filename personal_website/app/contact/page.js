import React from 'react'

const page = () => {
  return (
    <>
      <div className="w-[80vw] m-auto h-screen max-md:pt-16 max-md:pb-16 justify-center max-md:h-auto gap-10 max-md:w-[95vw] py-6 max-md:py-10 flex flex-col">
        <h1 className='font-extrabold text-4xl'>Contact Me</h1>
        <input type="text" className='border-[1px] p-2 w-1/2 border-black text-black placeholder:text-stone-700 rounded max-md:w-full' placeholder='Enter Your Name' />
        <input type="text" className='border-[1px] p-2 w-1/2 border-black text-black placeholder:text-stone-700 rounded max-md:w-full' placeholder='Enter Your Email' />
        <input type="text" className='border-[1px] p-2 w-1/2 border-black text-black placeholder:text-stone-700 rounded max-md:w-full' placeholder='Enter Your Address' />
        <input type="text" className='border-[1px] p-2 w-1/2 border-black text-black placeholder:text-stone-700 rounded max-md:w-full' placeholder='Enter Your Comment! ' />
        <button className='border-[1px] border-black rounded-lg p-2 text-sm w-1/2 max-md:w-full bg-black text-white'>Submit It!</button>
      </div>
    </>
  )
}

export default page