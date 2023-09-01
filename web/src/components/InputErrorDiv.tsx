import { HTMLAttributes } from "react";
import { cn } from "../libs/utils";

type InputErrorDivProps = HTMLAttributes<HTMLDivElement> & {
  errorMessage?: string;
};

const InputErrorDiv = ({
  children,
  className,
  errorMessage,
  ...props
}: InputErrorDivProps) => {
  return (
    <div className={cn("w-full flex flex-col gap-2", className)} {...props}>
      {children}
      <p
        className={cn(
          "text-red-500 text-xs tracking-wider",
          errorMessage ? "visible" : "invisible"
        )}
      >
        {errorMessage ? errorMessage : "0"}
      </p>
    </div>
  );
};

export default InputErrorDiv;
