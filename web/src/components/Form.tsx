import { FormHTMLAttributes } from "react";
import { cn } from "../libs/utils";

type FormProps = FormHTMLAttributes<HTMLFormElement>;

const Form = ({ children, className, ...props }: FormProps) => {
  return (
    <form
      className={cn(
        "flex flex-col justify-center items-center gap-4 bg-card rounded-xl shadow-card w-full md:w-7/12 lg:w-96 min-h-[24rem] p-6",
        className
      )}
      {...props}
    >
      {children}
    </form>
  );
};

export default Form;
