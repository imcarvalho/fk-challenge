import React from "react";
import styled from "styled-components";
import { Colors, Spacings } from "./types";

const AlertContainer = styled.div`
    padding: ${Spacings.S};
    margin-top: ${Spacings.L};
    background-color: ${Colors.AlertBackground};
    color: ${Colors.AlertForeground};
    border: 1px solid ${Colors.AlertForeground};
    border-radius: 4px;
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 0.8em;
`;

type Props = {
    text: string;
};

const Alert = (props: Props) => (
    <AlertContainer data-cy="alert-message">{props.text}</AlertContainer>
);

export default Alert;
