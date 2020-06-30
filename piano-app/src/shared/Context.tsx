import React from "react";
import { Note, SongType } from "./types";

export const NotesContext = React.createContext({
    notes: [],
    isRecording: false,
    startingTime: 0,
    setIsRecording: (isRecording: boolean) => {},
    setNotes: (notes: Note[]) => {},
    setStartingTime: (time: number) => {},
});

export const NewSongsContext = React.createContext({
    newSongs: [],
    setNewSongs: (song: any) => {},
});

export const PlayContext = React.createContext({
    isLoading: false,
    playNote: (midinumber: number) => {},
    stopNote: (midinumber: number) => {},
});
