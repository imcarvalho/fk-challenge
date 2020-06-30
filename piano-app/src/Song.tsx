import React, { useState } from "react";
import styled from "styled-components";
import PlayButton from "./shared/PlayButton";
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

const Song = (props: Props) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayClick = () => {
        if (isPlaying) {
            setIsPlaying(false);
            return;
        }

        console.log("how to play?");
        setIsPlaying(true);
    };

    const getSongLength = () => formatTime(props.keyStrokes[props.keyStrokes.length - 1].timestamp);

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
