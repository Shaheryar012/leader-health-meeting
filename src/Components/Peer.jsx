/* eslint-disable react/prop-types */
import { MicOffIcon } from "@100mslive/react-icons";
import {
  selectIsPeerAudioEnabled,
  selectIsPeerVideoEnabled,
  useVideo,
  useHMSStore,
} from "@100mslive/react-sdk";

const Peer = ({ peer }) => {
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });

  const isPeerVideoEnabled = useHMSStore(selectIsPeerVideoEnabled(peer.id));
  const isPeerAudioEnabled = useHMSStore(selectIsPeerAudioEnabled(peer.id));

  return (
    <div className="peer-container">
      {!isPeerAudioEnabled && (
        <div className="audio-off-icon">
          <MicOffIcon height={16} width={16} />
        </div>
      )}
      <div className="user-email-absolute">
        {peer.name} {peer.isLocal ? "(You)" : ""}
      </div>
      <video
        ref={videoRef}
        className={`peer-video ${peer.isLocal ? "local" : ""} ${
          !isPeerVideoEnabled ? "hide" : ""
        }`}
        autoPlay
        muted
        playsInline
      />
      {!isPeerVideoEnabled && (
        <div className="video-placeholder">
          <div className="avatar-circle">
            {peer.name.charAt(0).toUpperCase()}
          </div>
          <div className="video-status">
            <span className="status-icon">🎥</span>
            <span className="status-text">Camera Off</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default Peer;
