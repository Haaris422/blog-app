import { animationCalss } from "../Home/Constants/Data";
import { Button } from "./Button";

export function ActionButton({children, className,...props}:ButtonProps) {
    return (
        <Button {...props} 
            className={`${animationCalss} relative bg-black h-full group border border-white hover:border-black text-white overflow-hidden`}>
            <span className={`${animationCalss} relative z-10 group-hover:text-black transition-colors duration-300`}>{children}</span>

            <div className={`${animationCalss} absolute top-0 left-0 h-full bg-white w-0 group-hover:w-full transition-all duration-300 z-0`} />
        </Button>
    )
}