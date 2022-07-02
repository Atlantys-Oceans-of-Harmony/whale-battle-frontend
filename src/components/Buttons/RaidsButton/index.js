import "./style.css";
const RaidsButton = ({ children, className, ...props }) => {
  return (
    <button {...props} className={`raids-button ${className}`}>
      {children}
    </button>
  );
};
export default RaidsButton;
