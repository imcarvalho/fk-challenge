const padTime = (time: number) => (time < 10 ? `0${time}` : `${time}`);

export const formatTime = (time: number) => {
    const date = new Date(time);

    return `${padTime(date.getMinutes())}:${padTime(date.getSeconds())}`;
};
