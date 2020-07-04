import React from "react";
import styled from "styled-components";

const SongListContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const SongsHeader = styled.h2`
    margin-bottom: 0;
`;

type Props = {
    children: React.ReactNode;
};

const SongListHeader = (props: Props) => (
    <SongListContainer>
        <SongsHeader>My Songs</SongsHeader>
        {props.children}
    </SongListContainer>
);

export default SongListHeader;
