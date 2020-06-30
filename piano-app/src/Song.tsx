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

const SAFETY_INTERVAL = 50;

const getLastNoteTime = (keyStrokes: Note[]) => keyStrokes[keyStrokes.length - 1].timestamp;

const Song = (props: Props) => {
    const { playNote, stopNote } = useContext(PlayContext);
    const [isPlaying, setIsPlaying] = useState(false);
    const [startingTime, setStartingTime] = useState(0);

    let interval: number;

    useEffect(() => {
        isPlaying && play();

        return () => clearInterval(interval);
    }, [isPlaying]);

    const play = () => {
        const lastNoteTime = getLastNoteTime(props.keyStrokes);
        const unplayedNotes = [...props.keyStrokes];

        interval = setInterval(() => {
            const timeElapsed = Date.now() - startingTime;

            unplayedNotes.forEach(keyStroke => {
                if (
                    timeElapsed > keyStroke.timestamp - SAFETY_INTERVAL &&
                    timeElapsed < keyStroke.timestamp + SAFETY_INTERVAL
                ) {
                    playNote(keyStroke.midiNumber);
                    return;
                }

                // @TODO: this should be after the amount of time the key was pressed for
                if (timeElapsed > keyStroke.timestamp + SAFETY_INTERVAL) {
                    stopNote(keyStroke.midiNumber);

                    unplayedNotes.shift();
                    return;
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
