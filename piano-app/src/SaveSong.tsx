import React, { useState } from "react";
import styled from "styled-components";
import Button from "./shared/Button";
import { Status } from "./shared/types";

const SaveContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 3px;
`;

const Label = styled.label`
    font-size: 0.8em;
`;

const SaveSong = () => {
    const [songTitle, setSongTitle] = useState("");
    const [status, setStatus] = useState(Status.Idle);

    //@TODO: how to not trigger a play note when entering the song title

    const handleTitleUpdate = (e: React.ChangeEvent<HTMLInputElement>) =>
        setSongTitle(e.target.value);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        setStatus(Status.Loading);
        // @TODO: do the save here
        console.log("save");
    };

    return (
        <form onSubmit={handleSave}>
            <SaveContainer>
                <InputContainer>
                    <Label htmlFor="songTitle">Song title</Label>
                    <input
                        required
                        type="text"
                        value={songTitle}
                        onChange={handleTitleUpdate}
                        name="song title"
                        id="songTitle"
                    />
                </InputContainer>
                <Button name="save" type="submit" disabled={status === Status.Loading}>
                    Save
                </Button>
            </SaveContainer>
        </form>
    );
};

export default SaveSong;
