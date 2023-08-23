import { LabelHTMLAttributes } from "react";
import { cn } from "../../../libs/utils";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

const Label = ({ children, className, ...props }: LabelProps) => {
  return (
    <label className={cn("w-[100px] lg:w-fit", className)} {...props}>
      {children}
    </label>
  );
};

export default Label;
