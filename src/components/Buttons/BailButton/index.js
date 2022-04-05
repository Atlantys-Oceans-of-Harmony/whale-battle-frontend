import BailButtonImage from "../../../assets/bail_button.png";

const BailButton = ({ handleConfirm }) => {
  return (
    <div className="confirm-button self-center">
      <img
        src={BailButtonImage}
        className="w-72 mt-8 hover:cursor-pointer hover:opacity-75"
        onClick={handleConfirm}
      />
    </div>
  );
};
export default BailButton;
