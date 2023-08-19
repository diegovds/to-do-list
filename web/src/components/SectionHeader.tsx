import { HTMLAttributes } from "react";
import { cn } from "../libs/utils";

type SectionHeaderProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  description: string;
};

const SectionHeader = ({
  children,
  className,
  title,
  description,
  ...props
}: SectionHeaderProps) => {
  return (
    <div className={cn("flex flex-col items-center", className)} {...props}>
      <h1 className="text-4xl mb-3">{title}</h1>
      <p className="text-base text-gray-300">{description}</p>
      {children}
    </div>
  );
};

export default SectionHeader;
