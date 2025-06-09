interface HamburgerButtonProps {
  open: boolean;
  onClick: () => void;
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ open, onClick }) => {
  return (
    <div
      className={`menu-btn-1 ${open ? "active" : ""}`}
      onClick={onClick}
    >
      <span></span>
    </div>
  );
};

export default HamburgerButton;
