export type Note = { midiNumber: number; startTime: number; endTime: number };

export type SongType = { _id: string; title: string; keyStrokes: Note[] };

export enum Colors {
    ButtonBackground = "#565379",
    ButtonDisabled = "#8985A2",
    AlertBackground = "#FCE5E8",
    AlertForeground = "#CE0009",
}

export enum Spacings {
    S = "5px",
    M = "10px",
    L = "20px",
    XL = "25px",
}
