import { ExitIcon } from "@100mslive/react-icons";
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import logo from "../assets/logo.png";
import toast from "react-hot-toast";

function Header() {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();

  const handleLeaveRoom = () => {
    hmsActions.leave();
    toast.success("Left the room successfully!");
  };

  return (
    <header>
      <img className="logo" src={logo} alt="logo" />
      {isConnected && (
        <button
          id="leave-btn"
          className="btn btn-danger"
          onClick={handleLeaveRoom}
        >
          <ExitIcon style={{ marginLeft: "0.25rem" }} /> Leave Room
        </button>
      )}
    </header>
  );
}

export default Header;
