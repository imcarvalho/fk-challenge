import React, { useContext } from "react";
import { NotesContext } from "./shared/Context";

const SongList = () => {
    const { notes } = useContext(NotesContext);

    return <pre>{JSON.stringify(notes)}</pre>;
};

export default SongList;
