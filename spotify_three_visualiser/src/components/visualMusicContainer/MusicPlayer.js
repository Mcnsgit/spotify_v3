import AudioComponent from "../audioControls/AudioComponent";

export default function MusicPlayer() {
  return (
    <>
    <div className="musicplayer">
    <div>
      <h1>MusicPlayer</h1>
      <div className="playercontrola">
        <AudioComponent />
    </div>
    </div>
    </div>
    </>
  );
}