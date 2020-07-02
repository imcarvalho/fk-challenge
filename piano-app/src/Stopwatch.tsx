import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { RecordingContext } from "./shared/Contexts";
import { Spacings } from "./shared/types";
import { formatTime } from "./shared/utils";

const StopwatchContainer = styled.div`
    padding: ${Spacings.L};
`;

const Stopwatch = () => {
    const { isRecording, startingTime } = useContext(RecordingContext);
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

    return <StopwatchContainer data-cy="stopwatch">{formatTime(currentTime)}</StopwatchContainer>;
};

export default Stopwatch;
