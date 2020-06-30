import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { Colors } from "./types";

const PlayButtonStyle = styled.button`
    color: #ffffff;
    background-color: ${Colors.Background};
    border: 1px solid ${Colors.Background};
    border-radius: 3px;
    box-sizing: border-box;
    width: 24px;
    height: 24px;
    font-size: 0.8em;
    cursor: pointer;
`;

type Props = {
    onClick: () => void;
    isPlaying: boolean;
};

const PlayButton = (props: Props) => (
    <PlayButtonStyle onClick={props.onClick} name={props.isPlaying ? "Stop" : "Play"}>
        {props.isPlaying ? <FontAwesomeIcon icon={faStop} /> : <FontAwesomeIcon icon={faPlay} />}
    </PlayButtonStyle>
);

export default PlayButton;
