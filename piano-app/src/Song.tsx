import React from "react";
import { Note } from "./shared/types";

type Props = {
    title: string;
    keyStrokes: Note[];
};

const Song = (props: Props) => {
    return <>{props.title}</>;
};

export default Song;
