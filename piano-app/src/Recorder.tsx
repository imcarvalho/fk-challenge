import React, { useContext, useState } from "react";
import styled from "styled-components";
import Button from "./shared/Button";
import Stopwatch from "./Stopwatch";
import SaveSong from "./SaveSong";
import SongList from "./SongList";
import { NotesContext } from "./shared/Context";
import { Spacings } from "./shared/types";

const RecordStatusContainer = styled.div`
    padding-top: ${Spacings.L};
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Recorder = () => {
    const { isRecording, setIsRecording, setStartingTime } = useContext(NotesContext);

    const [showSave, setShowSave] = useState(false);

    const handleStartRecording = () => {
        setStartingTime(Date.now());
        setIsRecording(true);
    };

    const handleStopRecording = () => {
        setIsRecording(false);
        setShowSave(true);
    };

    return (
        <>
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
        </>
    );
};

export default React.memo(Recorder);
