import React, { useContext } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Song from "./Song";
import Alert from "./shared/Alert";
import Loading from "./shared/Loading";
import { NewSongsContext } from "./shared/Context";
import { SongType, Spacings } from "./shared/types";

const SongsContainer = styled.ul`
    flex-direction: column;
    justify-content: center;
    padding: 0;
    margin: 0 0 ${Spacings.L} 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: ${Spacings.L};
`;

const SongList = () => {
    const { newSongs } = useContext(NewSongsContext);

    const { loading, error, data } = useQuery(gql`
        query {
            songs {
                _id
                title
                keyStrokes {
                    midiNumber
                    timestamp
                }
            }
        }
    `);

    return (
        <>
            <h2>My Songs</h2>
            {loading && <Loading />}
            {error && <Alert text="An error ocurred while loading the songs." />}
            {data && data.length === 0 ? (
                <p>You don't have any recorded songs yet.</p>
            ) : (
                <SongsContainer>
                    {data &&
                        data.songs.map((song: SongType) => (
                            <Song key={song._id} title={song.title} keyStrokes={song.keyStrokes} />
                        ))}
                    {newSongs.map((song: SongType) => (
                        <Song key={song._id} title={song.title} keyStrokes={song.keyStrokes} />
                    ))}
                </SongsContainer>
            )}
        </>
    );
};

export default SongList;
