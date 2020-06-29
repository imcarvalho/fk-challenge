import React, { useState } from "react";
import "./App.css";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import Piano from "./Piano";
import Recorder from "./Recorder";
import { NotesContext } from "./shared/Context";

const client = new ApolloClient({
    // @TODO: define this URL on a configs file
    uri: "//localhost:4000",
});

function App() {
    const [notes, setNotes] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [startingTime, setStartingTime] = useState(0);

    return (
        <div className="App">
            <h1>React Piano Task</h1>

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
                <Piano />
                <ApolloProvider client={client}>
                    <Recorder />
                </ApolloProvider>
            </NotesContext.Provider>
        </div>
    );
}

export default App;
