import { animationCalss } from "../Home/Constants/Data";

interface DividerProps {
  className?: string;
  variant?: "horizontal" | "vertical";
  color?: string;
}

export function Divider({
  className,
  variant = "horizontal",
  color = "gray-300",
}: DividerProps) {
  const isVertical = variant === "vertical";
  const baseClass = isVertical ? " w-[1px] animate-grow-y" : " h-[1px] animate-grow-x";
  const colorClass = `bg-${color}`;
  const transformClass = "transform"; // needed for scale animations

  const animationStyle = {
    animation: `var(--animate-${isVertical ? "grow-y" : "grow-x"})`,
  } as React.CSSProperties;

  return (
    <div
      className={` ${animationCalss} ${className} ${baseClass} ${colorClass} ${transformClass}`}
    />
  );
}
