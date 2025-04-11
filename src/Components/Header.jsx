import { ExitIcon } from "@100mslive/react-icons";
import {
  selectIsConnectedToRoom,
  selectLocalPeer,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import logo from "../assets/logo.png";
import toast from "react-hot-toast";

function Header() {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const localPeer = useHMSStore(selectLocalPeer);
  const hmsActions = useHMSActions();

  const handleLeaveRoom = () => {
    const userName = localPeer?.name || "";
    console.log(`User ${userName} has left the room.`);

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
