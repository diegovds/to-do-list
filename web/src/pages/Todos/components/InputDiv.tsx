import { HTMLAttributes } from "react";
import { cn } from "../../../libs/utils";

type InputDivProps = HTMLAttributes<HTMLDivElement>;

const InputDiv = ({ children, className, ...props }: InputDivProps) => {
  return (
    <div className={cn("grid grid-cols-inputDiv w-full items-center gap-2 lg:flex lg:flex-1", className)} {...props}>
      {children}
    </div>
  );
};

export default InputDiv;
