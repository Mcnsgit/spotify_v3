import AudioControls from "./AudioControls";
import { CurrentTrack } from "./CurrentlyPlaying";
import Volume from "./Volume";
import {Container} from 'react-bootstrap';

export default function AudioComponent() {
    return (
        <div>
            <Container>
            <AudioControls />
            <CurrentTrack />
            <Volume />
            </Container>
        </div>
    );
}