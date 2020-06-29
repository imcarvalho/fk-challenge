import React, { useContext, useState } from "react";
import styled from "styled-components";
import Button from "./shared/Button";
import Stopwatch from "./Stopwatch";
import SaveSong from "./SaveSong";
import SongList from "./SongList";
import { NotesContext } from "./shared/Context";

const RecordStatusContainer = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: row;
`;

/**
 * @TODO:
 * Define a song title when storing a song on stop recording
 * Show a list of stored songs with title
 * Enable replaying stored songs with a small play button next to the title (with correct timing of replayed keys!)
 */

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
