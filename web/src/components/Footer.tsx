import { HTMLAttributes } from "react";
import { IoMdHeart } from "react-icons/io";
import { cn } from "../libs/utils";

type FooterProps = HTMLAttributes<HTMLElement>;

const Footer = ({ children, className, ...props }: FooterProps) => {
  return (
    <footer
      className={cn(
        "flex w-full items-center justify-center bg-card",
        className
      )}
      {...props}
    >
      <span className="flex items-center gap-1.5">
        Feito com
        <IoMdHeart size={13} className="text-red-600" />
        por
        <strong className="font-medium">Diego Viana</strong>
      </span>
      {children}
    </footer>
  );
};

export default Footer;
