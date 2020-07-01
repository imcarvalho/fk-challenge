import React, { useContext, useState } from "react";
import styled from "styled-components";
import Button from "./shared/Button";
import Stopwatch from "./Stopwatch";
import SaveSong from "./SaveSong";
import { RecordingContext } from "./shared/Contexts";
import { Spacings } from "./shared/types";

const RecordContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const RecordStatusContainer = styled.div`
    padding-top: ${Spacings.L};
    display: flex;
    align-items: center;
`;

const Recorder = () => {
    const { isRecording, setIsRecording, setStartingTime, notes } = useContext(RecordingContext);
    const [showSave, setShowSave] = useState(false);

    const handleStartRecording = () => {
        setShowSave(false);
        setStartingTime(Date.now());
        setIsRecording(true);
    };

    const handleStopRecording = () => {
        setIsRecording(false);

        // do not allow to record empty songs
        if (notes.length > 0) {
            setShowSave(true);
        }
    };

    const handleSongSave = () => setShowSave(false);

    return (
        <RecordContainer>
            <RecordStatusContainer>
                {isRecording === false ? (
                    <Button onClick={handleStartRecording} name="record">
                        Record
                    </Button>
                ) : (
                    <Button onClick={handleStopRecording} name="stop recording">
                        Stop recording
                    </Button>
                )}
                <Stopwatch />
            </RecordStatusContainer>
            {showSave && <SaveSong onSave={handleSongSave} />}
        </RecordContainer>
    );
};

export default React.memo(Recorder);
