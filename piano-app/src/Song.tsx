import React from "react";
import styled from "styled-components";
import Button from "./shared/Button";
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
    const handlePlay = () => {
        console.log("how to play?");
    };

    const getSongLength = () => {
        const lastTimestamp = props.keyStrokes[props.keyStrokes.length - 1].timestamp;

        return formatTime(lastTimestamp);
    };

    return (
        <ListItem>
            <Button name="play" onClick={handlePlay}>
                Play
            </Button>
            <SongTitle>
                {props.title} ({getSongLength()})
            </SongTitle>
        </ListItem>
    );
};

export default Song;
