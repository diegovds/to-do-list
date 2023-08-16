import { FormHTMLAttributes } from "react";
import { cn } from "../libs/utils";

type ButtonProps = FormHTMLAttributes<HTMLFormElement>;

const Form = ({ children, className, ...props }: ButtonProps) => {
  return (
    <form
      className={cn(
        "flex flex-col justify-center items-center gap-4 bg-card rounded-xl shadow-card w-96 h-96 p-4",
        className
      )}
      {...props}
    >
      {children}
    </form>
  );
};

export default Form;
