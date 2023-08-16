import { InputHTMLAttributes } from "react";
import { cn } from "../libs/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = ({ children, className, ...props }: InputProps) => {
  return (
    <input
      className={cn(
        "focus: h-14 w-full rounded-lg bg-darker p-4 text-gray-50 outline-none ring-darker placeholder:text-gray-400 focus:ring-2",
        className
      )}
      {...props}
    >
      {children}
    </input>
  );
};

export default Input;
