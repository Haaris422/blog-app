import { RxCross2 } from "react-icons/rx";
import { Button } from "./Button";

interface FeedbackState {
  open: boolean;
  status: boolean;
  message: string;
}

interface DialogProps {
  feedback: FeedbackState;
  setFeedback: React.Dispatch<React.SetStateAction<FeedbackState>>;
  children?: React.ReactNode;
  className?: string;
}

export function Dialog({ feedback, setFeedback, children, className }: DialogProps) {
  if (!feedback.open) return null;

  const handleClose = () => {
    setFeedback(prev => ({ ...prev, open: false }));
  };

  return (
    <div className="fixed inset-0 z-[100] text-black h-screen w-screen flex items-center justify-center bg-black/70 backdrop-blur-md">
      <div className={`relative w-full max-w-[650px] max-h-[90vh] overflow-hidden bg-white rounded-xl shadow-lg ${className}`}>
        <Button
          onClick={handleClose}
          className="absolute top-2 right-2 text-black hover:text-red-500"
        >
          <RxCross2 size={24} />
        </Button>
        <div className="p-4 mt-12 overflow-y-auto max-h-[calc(100vh-2rem)]">
          {children}
        </div>
      </div>
    </div>
  );
}
