import {
  MicOffIcon,
  MicOnIcon,
  ShareScreenIcon,
  VideoOffIcon,
  VideoOnIcon,
} from "@100mslive/react-icons";
import {
  useAVToggle,
  useHMSActions,
  useHMSStore,
  selectIsLocalScreenShared,
} from "@100mslive/react-sdk";

const Footer = () => {
  const { isLocalAudioEnabled, toggleAudio, isLocalVideoEnabled, toggleVideo } =
    useAVToggle();
  const amIScreenSharing = useHMSStore(selectIsLocalScreenShared);
  const actions = useHMSActions();
  return (
    <div className="control-bar">
      <button className="btn-control" onClick={toggleAudio}>
        {isLocalAudioEnabled ? (
          <MicOnIcon color="black" />
        ) : (
          <MicOffIcon color="black" />
        )}
      </button>
      <button className="btn-control" onClick={toggleVideo}>
        {isLocalVideoEnabled ? (
          <VideoOnIcon color="black" />
        ) : (
          <VideoOffIcon color="black" />
        )}
      </button>
      <button
        title="Screenshare"
        className={`btn-control ${amIScreenSharing ? "" : "highlight"}`}
        onClick={() => actions.setScreenShareEnabled(!amIScreenSharing)}
      >
        <ShareScreenIcon color="black" />
      </button>
    </div>
  );
};
export default Footer;
