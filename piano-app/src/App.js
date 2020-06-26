import React, { useState } from "react";
import "./App.css";
import Piano from "./Piano";
import Recorder from "./Recorder";
import { NotesContext } from "./shared/Context";

function App() {
    const [notes, setNotes] = useState([]);
    const [isRecording, setIsRecording] = useState(false);

    return (
        <div className="App">
            <h1>React Piano Task</h1>

            <NotesContext.Provider
                value={{
                    notes,
                    isRecording,
                    setIsRecording,
                    setNotes,
                }}
            >
                <Piano />
                <Recorder />
            </NotesContext.Provider>
        </div>
    );
}

export default App;
