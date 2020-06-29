import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { NotesContext } from "./shared/Context";

const StopwatchContainer = styled.div`
    padding: 20px;
`;

const padTime = (time: number) => (time < 10 ? `0${time}` : `${time}`);
const formatTime = (minutes: number, seconds: number) => `${padTime(minutes)}:${padTime(seconds)}`;

function Stopwatch() {
    const { isRecording, startingTime } = useContext(NotesContext);
    const [currentTime, setCurrentTime] = useState(0);

    let interval: number;

    useEffect(() => {
        isRecording ? startTimer() : stopTimer();

        return () => clearInterval(interval);
    }, [isRecording]);

    const startTimer = () => {
        interval = setInterval(() => {
            setCurrentTime(Date.now() - startingTime);
        }, 1000);
    };

    const stopTimer = () => setCurrentTime(0);

    const currentDate = new Date(currentTime);

    return (
        <StopwatchContainer>
            {formatTime(currentDate.getMinutes(), currentDate.getSeconds())}
        </StopwatchContainer>
    );
}

export default React.memo(Stopwatch);
