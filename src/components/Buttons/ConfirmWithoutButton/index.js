import ConfirmButtonImage from "../../../assets/confirm_without_button.png";

const ConfirmWithoutButton = ({ handleConfirm, className }) => {
  return (
    <div className="confirm-button self-center mb-32 z-10">
      <img
        src={ConfirmButtonImage}
        className="h-36 mt-8 hover:cursor-pointer hover:opacity-75"
        onClick={handleConfirm}
      />
    </div>
  );
};
export default ConfirmWithoutButton;
