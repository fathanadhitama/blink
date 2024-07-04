import React, { ButtonHTMLAttributes } from "react";
import { ButtonProps } from "../../types/button";
import { InfinitySpin } from "react-loader-spinner";

const Button: React.FC<ButtonProps> = ({
    disabled,
    isLoading,
    ...props
}: ButtonProps) => {
  return (
    <button disabled={disabled} className={
        disabled ?
        'cursor-not-allowed w-full flex justify-center bg-zinc-700 text-stone-500 p-2 shadow-lg rounded-md'
        :'hover:cursor-pointer w-full flex justify-center text-black hover:-translate-y-1 duration-300 font-bold p-2 bg-[#FAD810] rounded-md'}
        {...props}
    />
  );
}

export default Button;
