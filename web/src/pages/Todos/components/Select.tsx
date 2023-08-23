import { RefObject, SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "../../../libs/utils";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

const Select = forwardRef(
  ({ children, className, ...props }: SelectProps, ref) => {
    return (
      <select
        className={cn(
          "focus: h-14 w-full rounded-lg bg-darker p-4 text-gray-50 outline-none ring-darker placeholder:text-gray-400 focus:ring-2",
          className
        )}
        ref={ref as RefObject<HTMLSelectElement>}
        {...props}
      >
        {children}
      </select>
    );
  }
);

export default Select;
