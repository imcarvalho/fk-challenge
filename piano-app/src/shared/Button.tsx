import React from "react";
import styled from "styled-components";
import { Colors, Spacings } from "./types";

const ButtonStyle = styled.button`
    color: #ffffff;
    background-color: ${props => (props.disabled ? Colors.Disabled : Colors.Background)};
    border: 1px solid ${props => (props.disabled ? Colors.Disabled : Colors.Background)};
    border-radius: 3px;
    padding: ${Spacings.S} ${Spacings.XL};
    height: 2em;
    cursor: pointer;
    font-weight: bold;
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
