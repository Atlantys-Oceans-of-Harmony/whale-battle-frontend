import ConnectButtonImage from "../../../assets/connect_button.png";

const ConnectButton = ({ handleConfirm }) => {
  return (
    <div className="confirm-button self-center">
      <img
        src={ConnectButtonImage}
        className="w-72 mt-8 hover:cursor-pointer hover:opacity-75"
        onClick={handleConfirm}
      />
    </div>
  );
};
export default ConnectButton;
