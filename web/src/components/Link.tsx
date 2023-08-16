import { ComponentProps } from "react";
import { Link as Link_ } from "react-router-dom";
import { cn } from "../libs/utils";

type linkProps = ComponentProps<typeof Link_>;

const Link = ({ className, children, ...props }: linkProps) => {
  return (
    <Link_
      className={cn(
        "flex items-center gap-2 text-base transition-colors hover:text-darker",
        className
      )}
      {...props}
    >
      {children}
    </Link_>
  );
};

export default Link;
