import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Song from "./Song";
import Alert from "./shared/Alert";
import Loading from "./shared/Loading";
import { SongType } from "./shared/types";

const SongList = () => {
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
            {data && data.length === 0 && <p>You don't have any recorded songs yet.</p>}
            {data &&
                data.songs.map((song: SongType) => (
                    <Song key={song._id} title={song.title} keyStrokes={song.keyStrokes} />
                ))}
        </>
    );
};

export default SongList;
