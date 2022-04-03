import ConfirmButtonImage from "../../../assets/confirm_button.png";

const ConfirmButton = ({ handleConfirm }) => {
  return (
    <div className="confirm-button self-center mb-32">
      <img
        src={ConfirmButtonImage}
        className="w-72 mt-8 hover:cursor-pointer hover:opacity-75"
        onClick={handleConfirm}
      />
    </div>
  );
};
export default ConfirmButton;
