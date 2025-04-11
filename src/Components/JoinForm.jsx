import { useHMSActions, useHMSStore, selectPeers } from "@100mslive/react-sdk";
import { useState } from "react";
import logo from "../assets/logo.png";
import toast from "react-hot-toast";
import { isValidEmail } from "../utils/emailValidation";

const JoinForm = () => {
  const hmsActions = useHMSActions();
  const peers = useHMSStore(selectPeers);
  const [inputValues, setInputValues] = useState({
    name: "",
    token: "",
  });
  const maxUsers = 2;

  const handleInputChange = (e) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name = "", roomCode = "" } = inputValues;

    if (!isValidEmail(name)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (peers.length >= maxUsers) {
      alert("Room is full. Maximum 2 users allowed.");
      return;
    }

    try {
      const authToken = await hmsActions.getAuthTokenByRoomCode({
        roomCode: roomCode,
      });

      await hmsActions.join({
        userName: name,
        authToken,
        settings: {
          isAudioMuted: false,
          isVideoMuted: false,
        },
      });
      toast.success("Room Joined successfully!");
    } catch (error) {
      toast.error("Error joining the room. Please try again.");
      console.error("Error while joining the room:", error);
    }
  };
  return (
    <div className="container">
      <img className="logo" src={logo} alt="logo" />
      <form onSubmit={handleSubmit}>
        <h2>Join Room</h2>
        <div className="input-container">
          <input
            required
            id="name"
            type="text"
            name="name"
            value={inputValues.name}
            onChange={handleInputChange}
            placeholder="Your Email"
          ></input>
        </div>
        <div className="input-container">
          <input
            required
            id="room-code"
            type="text"
            name="roomCode"
            onChange={handleInputChange}
            placeholder="Room Code"
          ></input>
        </div>
        <button className="btn-primary" disabled={peers.length >= maxUsers}>
          {peers.length >= maxUsers ? "Room Full" : "Join"}
        </button>
      </form>
    </div>
  );
};
export default JoinForm;
