import { RxCross2 } from "react-icons/rx"; 
import { Button } from "./Button";

export function Dialog({ children, className, open, setOpen }: DialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] text-black h-screen w-screen flex items-center justify-center bg-black/70 backdrop-blur-md">
      <div className={`relative w-full max-w-[650px] max-h-[90vh] bg-white rounded-xl shadow-lg ${className}`}>
        <Button
          onClick={() => setOpen(false)}
          className="absolute top-2 right-2 text-black hover:text-red-500"
        >
          <RxCross2 size={24} />
        </Button>
        <div className="p-4 overflow-auto max-h-[calc(100vh-2rem)]">
          {children}
        </div>
      </div>
    </div>
  );
}
