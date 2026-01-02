interface ModalBackdropProps {
  onClose: () => void;
}

const ModalBackdrop = ({ onClose }: ModalBackdropProps) => {
  return (
    <div 
      className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    />
  );
};

export default ModalBackdrop;
