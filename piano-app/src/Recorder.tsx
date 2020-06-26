import React, { useContext } from "react";
import styled from "styled-components";
import { Colors } from "./shared/types";
import { NotesContext } from "./shared/Context";

const RecorderContainer = styled.div`
    padding: 20px;
`;

const Button = styled.button`
    background-color: ${Colors.Background};
    color: #ffffff;
    margin: 1em;
    padding: 0.25em 2em;
    border: 2px solid ${Colors.Background};
    border-radius: 3px;
`;

/**
 * @TODO:
 * Define a song title when storing a song on stop recording
 * Show a list of stored songs with title
 * Enable replaying stored songs with a small play button next to the title (with correct timing of replayed keys!)
 */

function Recorder() {
    const { isRecording, setIsRecording, notes, setStartingTime } = useContext(NotesContext);

    const handleStartRecording = () => {
        setStartingTime(Date.now());
        setIsRecording(true);
    };

    const handleStopRecording = () => setIsRecording(false);

    return (
        <RecorderContainer>
            {isRecording === false ? (
                <Button onClick={handleStartRecording}>Record</Button>
            ) : (
                <Button onClick={handleStopRecording}>Stop recording</Button>
            )}
            <pre>{JSON.stringify(notes)}</pre>
        </RecorderContainer>
    );
}

export default React.memo(Recorder);
