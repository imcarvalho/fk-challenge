import React from "react";
import { Note } from "./types";

export const NotesContext = React.createContext({
    notes: [],
    isRecording: false,
    setIsRecording: (isRecording: boolean) => {},
    setNotes: (notes: Note[]) => {},
});
