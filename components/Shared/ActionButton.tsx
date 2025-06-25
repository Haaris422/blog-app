import { animationCalss } from "../Home/Constants/Data";
import { Button } from "./Button";

export function ActionButton({ children, alt = true, className = "", disabled = false, ...props }: ButtonProps & { disabled?: boolean, alt?:boolean }) {
  
  const buttonClass = !alt ? 'bg-black text-white border-white hover:border-black' 
  : 
  'bg-white text-black border-black hover:border-white';
  const spanClass = !alt ? 'group-hover:text-black': 'group-hover:text-white';
  const divClass = !alt ? 'bg-white': 'bg-black';
  return (
    <Button
      {...props}
      disabled={disabled}
      className={`
        ${animationCalss} ${className} relative h-full group overflow-hidden border 
        ${disabled 
          ? "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed" 
          : buttonClass
        }
        transition-transform
      `}
    >
      <span
        className={`
          ${animationCalss} relative z-10 transition-colors duration-300
          ${disabled ? "text-gray-500" : spanClass}
        `}
      >
        {children}
      </span>

      {!disabled && (
        <div
          className={`${animationCalss} absolute top-0 left-0 h-full ${divClass} w-0 group-hover:w-full transition-all duration-300 z-0`}
        />
      )}
    </Button>
  );
}
