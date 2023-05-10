import React from 'react'
import { useState } from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'

function Exam() {

    const prevSlide = () => {

    };

    const nextSlide = () => {

    };


    return (
        <div className="h-full w-full m-auto py-16 px-4 relative">
            <div class="pl-8">hello world pl-4</div>
            <div className='group-hover:block absolute top-[30%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactLeft onClick={prevSlide} />
            </div>
            <div className='group-hover:block absolute top-[30%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactRight onClick={nextSlide} size={30} />
            </div>
        </div >
    )
}

export default Exam;