import React, { useContext, useState } from "react";
import styled from "styled-components";
import Button from "./shared/Button";
import Stopwatch from "./Stopwatch";
import SaveSong from "./SaveSong";
import SongList from "./SongList";
import { NotesContext, PlayContext, NewSongsContext } from "./shared/Context";
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

type Props = {
    isLoading: boolean;
    playNote: () => void;
    stopNote: () => void;
};

const Recorder = (props: Props) => {
    const { isRecording, setIsRecording, setStartingTime, notes } = useContext(NotesContext);

    const [showSave, setShowSave] = useState(false);
    const [newSongs, setNewSongs] = useState([]);

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
            <NewSongsContext.Provider value={{ newSongs, setNewSongs }}>
                {showSave && <SaveSong onSave={handleSongSave} />}
                <PlayContext.Provider
                    value={{
                        isLoading: props.isLoading,
                        playNote: props.playNote,
                        stopNote: props.stopNote,
                    }}
                >
                    <SongList />
                </PlayContext.Provider>
            </NewSongsContext.Provider>
        </RecordContainer>
    );
};

export default React.memo(Recorder);
