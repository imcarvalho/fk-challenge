import React from "react";
import styled, { keyframes } from "styled-components";
import { Colors } from "./types";

const spinningAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
  `;

const LoadingSpinner = styled.div`
    display: inline-block;
    width: 58px;
    height: 58px;

    &:after {
        content: " ";
        display: block;
        width: 32px;
        height: 32px;
        margin: 8px;
        border-radius: 50%;
        border: 6px solid ${Colors.Background};
        border-color: ${Colors.Background} transparent ${Colors.Background} transparent;
        animation: ${spinningAnimation} 1.2s linear infinite;
    }
`;

const Loading = () => <LoadingSpinner />;

export default Loading;
