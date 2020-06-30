import React from "react";
import styled from "styled-components";
import { Colors } from "./types";

const ButtonStyle = styled.button`
    background-color: ${props => (props.disabled ? Colors.Disabled : Colors.Background)};
    border: 2px solid ${props => (props.disabled ? Colors.Disabled : Colors.Background)};
    color: #ffffff;
    padding: 5px 25px;
    border-radius: 3px;
    height: 2em;
`;

type Props = {
    onClick?: () => void;
    name: string;
    type?: "button" | "submit" | "reset" | undefined;
    disabled?: boolean;
    children: React.ReactNode;
};

const Button = (props: Props) => <ButtonStyle {...props}>{props.children}</ButtonStyle>;

export default Button;
