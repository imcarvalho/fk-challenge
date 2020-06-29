export type Note = { midiNumber: number; timestamp: number };

export enum Colors {
    Background = "#565379",
    Disabled = "#8985A2",
}

export enum Status {
    Idle = "Idle",
    Loading = "Loading",
    ErrorSave = "ErrorSave",
    ErrorLoading = "ErrorLoading",
}
