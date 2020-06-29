import React, { useState } from "react";
import styled from "styled-components";
import Button from "./shared/Button";

const SaveContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const Recorder = () => {
    const [songTitle, setSongTitle] = useState("");

    //@TODO: how to not trigger a play note when entering the song title

    const handleTitleUpdate = (e: React.ChangeEvent<HTMLInputElement>) =>
        setSongTitle(e.target.value);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        // @TODO: do the save here
        console.log("save");
    };

    return (
        <SaveContainer>
            <form onSubmit={handleSave}>
                <label htmlFor="songTitle">Song title</label>
                <input
                    type="text"
                    value={songTitle}
                    onChange={handleTitleUpdate}
                    name="song title"
                    id="songTitle"
                />
                <Button name="save" type="submit">
                    Save
                </Button>
            </form>
        </SaveContainer>
    );
};

export default React.memo(Recorder);
