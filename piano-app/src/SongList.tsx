import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const SongList = () => {
    const { loading, error, data } = useQuery(gql`
        query {
            songs {
                _id
                title
                keyStrokes
            }
        }
    `);

    console.log("data", data);

    // @TODO: show loading spinner
    // @TODO: show error message
    // @TODO: show the song list, obviously

    return <pre>{JSON.stringify(data)}</pre>;
};

export default SongList;
