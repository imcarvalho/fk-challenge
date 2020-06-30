import React, { useState, useContext } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { NotesContext } from "./shared/Context";
import Button from "./shared/Button";
import Alert from "./shared/Alert";
import Loading from "./shared/Loading";

const SaveContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const SaveFormContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    padding-bottom: 15px;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 3px;
    padding-right: 15px;
`;

const Input = styled.input`
    padding: 4px;
`;

const Label = styled.label`
    font-size: 0.8em;
`;

const SaveSong = () => {
    const { notes } = useContext(NotesContext);
    const [addSong, { loading, error }] = useMutation(gql`
        mutation AddSong($title: String!, $keyStrokes: [NoteInput]!) {
            addSong(title: $title, keyStrokes: $keyStrokes) {
                _id
                title
                keyStrokes {
                    midiNumber
                    timestamp
                }
            }
        }
    `);
    const [songTitle, setSongTitle] = useState("");

    //@TODO: how to not trigger a play note when entering the song title

    const handleTitleUpdate = (e: React.ChangeEvent<HTMLInputElement>) =>
        setSongTitle(e.target.value);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        addSong({ variables: { title: songTitle, keyStrokes: notes } });
    };

    return (
        <SaveContainer>
            <form onSubmit={handleSave}>
                <SaveFormContainer>
                    <InputContainer>
                        <Label htmlFor="songTitle">Song title</Label>
                        <Input
                            required
                            type="text"
                            value={songTitle}
                            onChange={handleTitleUpdate}
                            name="song title"
                            id="songTitle"
                        />
                    </InputContainer>
                    <Button name="save" type="submit" disabled={loading}>
                        Save
                    </Button>
                </SaveFormContainer>
            </form>
            {loading && <Loading />}
            {error && <Alert text="An error occurred while saving the song." />}
        </SaveContainer>
    );
};

export default SaveSong;
