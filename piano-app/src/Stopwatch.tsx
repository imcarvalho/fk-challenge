import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { NotesContext } from "./shared/Context";
import { Spacings } from "./shared/types";
import { formatTime } from "./shared/utils";

const StopwatchContainer = styled.div`
    padding: ${Spacings.L};
`;

const Stopwatch = () => {
    const { isRecording, startingTime } = useContext(NotesContext);
    const [currentTime, setCurrentTime] = useState(0);

    let interval: number;

    useEffect(() => {
        isRecording && startTimer();

        return () => stopTimer();
    }, [isRecording]);

    const startTimer = () => {
        interval = setInterval(() => {
            setCurrentTime(Date.now() - startingTime);
        }, 1000);
    };

    const stopTimer = () => {
        setCurrentTime(0);
        clearInterval(interval);
    };

    return <StopwatchContainer>{formatTime(currentTime)}</StopwatchContainer>;
};

export default Stopwatch;
