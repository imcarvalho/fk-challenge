import React from "react";
import styled from "styled-components";

const SongListContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

type Props = {
    children: React.ReactNode;
};

const SongListHeader = (props: Props) => (
    <SongListContainer>
        <h2>My Songs</h2>
        {props.children}
    </SongListContainer>
);

export default SongListHeader;
