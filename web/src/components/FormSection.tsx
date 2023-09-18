import { HTMLAttributes } from "react";
import { cn } from "../libs/utils";

type FormSectionProps = HTMLAttributes<HTMLDivElement>;

const FormSection = ({ children, className, ...props }: FormSectionProps) => {
  return (
    <section
      className={cn(
        "container flex flex-1 justify-center items-center py-10",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};

export default FormSection;
