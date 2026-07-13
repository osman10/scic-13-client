import Login from '@/components/Login';
import React from 'react';

const page = () => {
    return (
        <div className='min-h-[70vh]  bg-[#F7F2E8] text-gray-700'>
           <div className="container mx-auto ">
                <Login redirect="/"/>
           </div>
        </div>
    );
};

export default page;