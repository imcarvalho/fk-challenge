import React from "react";
import styled from "styled-components";
import { Note, Spacings } from "./shared/types";

const SongContainer = styled.li`
    list-style: none;
    margin: 0;
    padding-bottom: ${Spacings.M};
`;

type Props = {
    title: string;
    keyStrokes: Note[];
};

const Song = (props: Props) => {
    return <SongContainer>{props.title}</SongContainer>;
};

export default Song;
