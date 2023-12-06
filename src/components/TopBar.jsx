import React from 'react';

const TopBar = (props) => {
  return (
    <div className='bg-black text-white text-xs px-2 py-3 lg:px-14 lg:block hidden'>
      <nav className='flex flex-col lg:flex-row justify-between items-center'>
        <h4 className='text-center lg:text-left mb-2 lg:mb-0 hidden md:block'>
          Want to explore Upcoming Deals on Weekends?
        </h4>
        <h4 className='text-center md:hidden'>Explore Deals</h4>
        <ul className='flex flex-col lg:flex-row lg:space-x-3 space-x-0 mt-2 lg:mt-0 justify-center items-center'>
          <li className='lg:block mb-2 lg:mb-0'>
            <span className='lg:hidden'>Email: </span>
            {props.email}
          </li>
          <li>
            <select
              name=''
              id=''
              className='bg-black px-2 py-1 focus:outline-none'
            >
              <option value='Eng'>English</option>
              <option value='Eng'>English</option>
              <option value='Eng'>English</option>
              <option value='Eng'>English</option>
              <option value='Eng'>English</option>
            </select>
          </li>
          <li>
            <select
              name=''
              id=''
              className='bg-black px-2 py-1 focus:outline-none'
            >
              <option value='Eng'>USD</option>
              <option value='Eng'>INR</option>
            </select>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TopBar;
