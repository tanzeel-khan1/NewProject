// import React from 'react'

// const Nav = () => {
//     return (
//         <>
//             <nav className='p-0 h-12 w-full flex items-center'>
//                 <h1 className=' text-2xl font-semibold'>Hi! WellCome on 
                    
//                     <span className='text-blue-500 text-2xl font-semibold'>  Brand  </span></h1>
//             </nav>
//         </>
//     )
// }

// export default Nav
import React from "react";

const Nav = () => {
  return (
    <nav className="w-full bg-white  shadow-sm md:mb-0 mb-4">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center h-14">
        <h1 className="text-xl md:text-2xl font-semibold  text-center">
          Hi! Welcome on
          <span className="text-blue-600 font-bold"> Brand</span>
        </h1>
      </div>
    </nav>
  );
};

export default Nav;
