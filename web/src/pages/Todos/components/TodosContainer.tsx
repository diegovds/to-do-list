import { useAutoAnimate } from "@formkit/auto-animate/react";
import { HTMLAttributes } from "react";
import { cn } from "../../../libs/utils";

type TodosContainerProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  todoLength: number | undefined;
};

const TodosContainer = ({
  children,
  className,
  title,
  todoLength,
  ...props
}: TodosContainerProps) => {
  const [animationParent] = useAutoAnimate({ duration: 300 });

  return (
    <div
      className={cn("bg-card shadow-card rounded-lg p-5", className)}
      {...props}
    >
      <h3 className="text-center font-bold">{title}</h3>
      <div
        className={cn("flex flex-col gap-3", todoLength ? "mt-5" : "")}
        ref={animationParent}
      >
        {children}
      </div>
    </div>
  );
};

export default TodosContainer;
