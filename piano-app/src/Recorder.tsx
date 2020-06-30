import React, { useContext, useState } from "react";
import styled from "styled-components";
import Button from "./shared/Button";
import Stopwatch from "./Stopwatch";
import SaveSong from "./SaveSong";
import SongList from "./SongList";
import { NotesContext } from "./shared/Context";
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
    const { isRecording, setIsRecording, setStartingTime, notes } = useContext(NotesContext);

    const [showSave, setShowSave] = useState(false);

    const handleStartRecording = () => {
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

    return (
        <RecordContainer>
            <RecordStatusContainer>
                {isRecording === false ? (
                    <Button onClick={handleStartRecording} name="record">
                        Record
                    </Button>
                ) : (
                    <Button onClick={handleStopRecording} name="stop record">
                        Stop recording
                    </Button>
                )}
                <Stopwatch />
            </RecordStatusContainer>
            {showSave && <SaveSong />}
            <SongList />
        </RecordContainer>
    );
};

export default React.memo(Recorder);
