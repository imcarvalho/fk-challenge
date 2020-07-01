import React, { useState } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { Piano as ReactPiano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import SoundfontProvider from "./SoundfontProvider";
import "react-piano/dist/styles.css";
import Recorder from "./Recorder";
import { NotesContext } from "./shared/Contexts";

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = "https://d1pzp51pvbm36p.cloudfront.net";

const noteRange = {
    first: MidiNumbers.fromNote("c3"),
    last: MidiNumbers.fromNote("f4"),
};
const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: noteRange.first,
    lastNote: noteRange.last,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
});

const client = new ApolloClient({
    uri: "//localhost:4000",
});

function Piano() {
    const [notes, setNotes] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [startingTime, setStartingTime] = useState(0);

    return (
        <NotesContext.Provider
            value={{
                notes,
                isRecording,
                setIsRecording,
                setNotes,
                startingTime,
                setStartingTime,
            }}
        >
            <SoundfontProvider
                instrumentName="acoustic_grand_piano"
                audioContext={audioContext}
                hostname={soundfontHostname}
                render={({ isLoading, playNote, stopNote }) => {
                    return (
                        <div>
                            <ReactPiano
                                disabled={isLoading}
                                noteRange={noteRange}
                                playNote={playNote}
                                stopNote={stopNote}
                                width={1000}
                                keyboardShortcuts={keyboardShortcuts}
                            />
                            <ApolloProvider client={client}>
                                <Recorder
                                    isLoading={isLoading}
                                    playNote={playNote}
                                    stopNote={stopNote}
                                />
                            </ApolloProvider>
                        </div>
                    );
                }}
            />
        </NotesContext.Provider>
    );
}

export default Piano;
