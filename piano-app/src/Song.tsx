import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import PlayButton from "./shared/PlayButton";
import { PlayContext } from "./shared/Context";
import { Note, Spacings } from "./shared/types";
import { formatTime } from "./shared/utils";

const ListItem = styled.li`
    list-style: none;
    margin: 0;
    padding-bottom: ${Spacings.M};
`;

const SongTitle = styled.span`
    margin-left: ${Spacings.S};
`;

type Props = {
    title: string;
    keyStrokes: Note[];
};

const getLastNoteTime = (keyStrokes: Note[]) => keyStrokes[keyStrokes.length - 1].timestamp;

const Song = (props: Props) => {
    const { playNote, stopNote } = useContext(PlayContext);
    const [isPlaying, setIsPlaying] = useState(false);
    const [startingTime, setStartingTime] = useState(0);

    let interval: number;

    useEffect(() => {
        isPlaying && startTimer();

        return () => clearInterval(interval);
    }, [isPlaying]);

    const startTimer = () => {
        const lastNoteTime = getLastNoteTime(props.keyStrokes);

        interval = setInterval(() => {
            const timeElapsed = Date.now() - startingTime;

            props.keyStrokes.forEach(keyStroke => {
                if (
                    timeElapsed > keyStroke.timestamp - 100 &&
                    timeElapsed < keyStroke.timestamp + 100
                ) {
                    console.log("play that note", keyStroke.midiNumber);
                    playNote(keyStroke.midiNumber);
                } else {
                    stopNote(keyStroke.midiNumber);
                }
            });

            if (timeElapsed > lastNoteTime) {
                handlePlayClick();
            }
        }, 1);
    };

    const handlePlayClick = () => {
        if (isPlaying) {
            setStartingTime(0);
            setIsPlaying(false);
            return;
        }

        setStartingTime(Date.now());
        setIsPlaying(true);
    };

    const getSongLength = () => formatTime(getLastNoteTime(props.keyStrokes));

    return (
        <ListItem>
            <PlayButton onClick={handlePlayClick} isPlaying={isPlaying} />
            <SongTitle>
                {props.title} ({getSongLength()})
            </SongTitle>
        </ListItem>
    );
};

export default Song;
