import React from "react";
import { Note } from "./types";

export const NotesContext = React.createContext({
    notes: [],
    isRecording: false,
    startingTime: 0,
    setIsRecording: (isRecording: boolean) => {},
    setNotes: (notes: Note[]) => {},
    setStartingTime: (time: number) => {},
});
