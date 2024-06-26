import React, { ButtonHTMLAttributes } from "react";
import { ButtonProps } from "../../types/button";

const Button: React.FC<ButtonProps> = ({
    disabled,
    isLoading,
    ...props
}: ButtonProps) => {
  return (
    <button disabled={disabled} className={
        disabled ?
        'cursor-not-allowed bg-slate-600 text-white p-2 bg-indigo-500 shadow-lg rounded-md'
        :'hover:cursor-pointer hover:bg-fuchsia-400 hover:-translate-y-1 duration-300 p-2 bg-indigo-500 shadow-lg shadow-indigo-500/50 rounded-md'}
        {...props}
    >
        {isLoading ? 'Blinking...' : 'Blink it!'}
    </button>
  );
}

export default Button;
