import {
  selectPeers,
  selectPeersScreenSharing,
  useHMSStore,
} from "@100mslive/react-sdk";
import Peer from "./Peer";
import { ScreenTile } from "./ScreenTile";

const Conference = () => {
  const peers = useHMSStore(selectPeers);
  const presenters = useHMSStore(selectPeersScreenSharing);

  return (
    <div className={`conference-section `}>
      {presenters.length > 0 ? (
        <div className="screen-share-video">
          {presenters.map((peer) => (
            <ScreenTile key={"screen" + peer.id} peer={peer} />
          ))}
        </div>
      ) : null}
      <div className="peers-container">
        {peers.map((peer) => (
          <Peer key={peer.id} peer={peer}></Peer>
        ))}
      </div>
    </div>
  );
};
export default Conference;
