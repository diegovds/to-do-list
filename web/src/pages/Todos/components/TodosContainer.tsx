import { useAutoAnimate } from "@formkit/auto-animate/react";
import { HTMLAttributes } from "react";
import { cn } from "../../../libs/utils";

type TodosContainerProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
};

const TodosContainer = ({
  children,
  className,
  title,
  ...props
}: TodosContainerProps) => {
  const [animationParent] = useAutoAnimate({ duration: 300 });

  return (
    <div
      className={cn("bg-card shadow-card rounded-lg p-5", className)}
      {...props}
    >
      <h3 className="mb-5 text-center">{title}</h3>
      <div className="flex flex-col gap-3" ref={animationParent}>
        {children}
      </div>
    </div>
  );
};

export default TodosContainer;
