export type Note = { midiNumber: number; timestamp: number };

export enum Colors {
    Background = "#565379",
    Disabled = "#8985A2",
    AlertBackground = "#FCE5E8",
    AlertForeground = "#CE0009",
}

export enum Status {
    Idle = "Idle",
    Loading = "Loading",
    ErrorSave = "ErrorSave",
    ErrorLoading = "ErrorLoading",
}
