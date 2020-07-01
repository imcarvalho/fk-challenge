import React from "react";
import { Note, SongType } from "./types";

export const RecordingContext = React.createContext({
    notes: [],
    isRecording: false,
    startingTime: 0,
    newSongs: [],
    setIsRecording: (isRecording: boolean) => {},
    setNotes: (notes: Note[]) => {},
    setStartingTime: (time: number) => {},
    setNewSongs: (songs: SongType[]) => {},
});

export const PlayContext = React.createContext({
    isLoading: false,
    playNote: (midiNumber: number) => {},
    stopNote: (midiNumber: number) => {},
});
