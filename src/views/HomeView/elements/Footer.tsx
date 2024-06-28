import React from "react";
import { Linkedin, Github } from "lucide-react";

function Footer() {
  return (
    <div className='flex flex-col gap-3 items-center items-center p-5 text-sm lg:text-md'>
        <p className='font-bold'>Made with 💖 by <span className='text-[#FAD810] mx-1'>fathanadhitama</span></p>
        <div className='flex gap-5'>
          <a href='https://linkedin.com/in/fathanadhitama/' target='_blank'
          className='hover:bg-[#FAD810] hover:text-black hover:border-[#FAD810] border-2 p-2 rounded-[50%] flex justify-center items-center'>
            <Linkedin size={16} />
          </a>
          <a href='https://github.com/fathanadhitama/' target='_blank'
          className='hover:bg-[#FAD810] hover:text-black hover:border-[#FAD810] border-2 p-2 rounded-[50%] flex justify-center items-center'>
            <Github size={16} />
          </a>
        </div>
      </div>
  )
}

export default Footer;
