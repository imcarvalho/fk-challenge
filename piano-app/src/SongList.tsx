import React, { useContext } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Song from "./Song";
import Alert from "./shared/Alert";
import Loading from "./shared/Loading";
import { RecordingContext } from "./shared/Contexts";
import { SongType, Spacings } from "./shared/types";

const SongListContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const SongListStyle = styled.ul`
    padding: 0;
    margin: 0 0 ${Spacings.L} 0;
    display: grid;
    column-gap: ${Spacings.L};
    grid-template-columns: repeat(4, 1fr);

    @media (max-width: 128px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;

const SongList = () => {
    const { newSongs } = useContext(RecordingContext);

    const { loading, error, data } = useQuery(gql`
        query {
            songs {
                _id
                title
                keyStrokes {
                    midiNumber
                    startTime
                    endTime
                }
            }
        }
    `);

    if (loading) {
        return (
            <SongListContainer>
                <h2>My Songs</h2>
                <Loading />
            </SongListContainer>
        );
    }

    if (error) {
        return (
            <SongListContainer>
                <h2>My Songs</h2>
                <Alert text="An error ocurred while loading the songs." />
            </SongListContainer>
        );
    }

    const songsDisplay = data ? [...data.songs, ...newSongs] : newSongs;

    return (
        <SongListContainer>
            <h2>My Songs</h2>
            {songsDisplay.length === 0 ? (
                <p>You don't have any recorded songs yet.</p>
            ) : (
                <SongListStyle>
                    {songsDisplay.map((song: SongType) => (
                        <Song key={song._id} title={song.title} keyStrokes={song.keyStrokes} />
                    ))}
                </SongListStyle>
            )}
        </SongListContainer>
    );
};

export default SongList;
