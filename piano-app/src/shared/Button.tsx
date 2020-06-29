import React from "react";
import styled from "styled-components";
import { Colors } from "./types";

const ButtonStyle = styled.button`
    background-color: ${Colors.Background};
    color: #ffffff;
    margin: 1em;
    padding: 0.25em 2em;
    border: 2px solid ${Colors.Background};
    border-radius: 3px;
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
