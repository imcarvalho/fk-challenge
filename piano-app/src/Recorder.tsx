import React, { useContext } from "react";
import { NotesContext } from "./shared/Context";

function Recorder() {
    const { isRecording, setIsRecording } = useContext(NotesContext);

    const handleStartRecording = () => setIsRecording(true);

    const handleStopRecording = () => setIsRecording(false);

    return (
        <>
            {isRecording === false ? (
                <button onClick={handleStartRecording}>Record</button>
            ) : (
                <button onClick={handleStopRecording}>Stop recording!</button>
            )}
        </>
    );
}

export default Recorder;
