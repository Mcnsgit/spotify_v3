import AudioControls from "./AudioControls";
import { CurrentTrack } from "./CurrentlyPlaying";
import Volume from "./Volume";

export default function AudioComponent() {
    return (
        <div>
            <AudioControls />
            <CurrentTrack />
            <Volume />
        </div>
    );
}