import React, { useEffect, useState } from 'react'
import avatar from "../assets/avatar.jpeg";
import { Link } from 'react-router-dom';
import Form from './Form';
export const Home = ({existingDocument}) => {
    const [btnActive, setBtnActive] = useState(true);

    useEffect( () => {
    },[] )
    return (
        <div className='w-screen grid justify-center bg-lightWhite font-poppins  '>
        <div className='lg:w-[850px] md:w[750px] lg:pl-20 pl-10 md:px-[12rem] px-20 pt-2 grid justify-start bg-white border-x-[1px] border-t-[1px] border-borderColor'>
        <section className=' flex flex-col items-start'>
        <div className='profile-head flex  pt-6 pb-4 items-center'>
                <img className='w-20 rounded-full' src={avatar} />
                <div className='pl-10'>
                    <h2 className='font-bold pb-1'>{existingDocument ? existingDocument.name : 'Alex'}</h2>
                    <h4 className='pb-1 text-sm'>Full Stack Developer</h4>
                    <h4 className='pb-1 text-sm' >Bangladesh</h4>
                </div>
            </div>

            <navigator className='flex gap-6 pb-4'>
            <Link
                to={`/`}
                onClick={() => setBtnActive(true)}
                className={`rounded-[4px] font-medium text-sm ${btnActive ? 'bg-bgPrimary text-primary' : ''} hover:bg-primary hover:text-white px-5 py-1`}
            >
                Update
            </Link>
            <Link
                to={`/viewForm`}
                onClick={() => setBtnActive(false)}
                className={`rounded-[4px] font-medium text-sm ${btnActive ? '' : 'bg-bgPrimary text-primary'} hover:bg-primary hover:text-white px-5 py-1`}
            >
                Profile
            </Link>
            </navigator>

        </section>
        </div>
        </div>
    )
}
export default Home;
