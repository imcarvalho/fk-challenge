# fk-challenge

A challenge involving recording a piano song 🎹⏺

## Running the app

Before hitting `npm i && npm start` on both `piano-app` and `graphql-server`, you'll also need to add an `.env` file at the root of the `piano-app`, with the Apollo Client URL like this:

`REACT_APP_APOLLO_URL=<the actual URL>`

## TODO list

- [x] Provide a button to start/stop recording a sequence of keys played on the Piano UI
- [x] Add a stopwatch
- [x] Store the timestamp for each note
- [x] Define a song title when storing a song on stop recording
- [x] When defining a song name, do not play notes - turned out as do not allow interaction with the piano unless we're recording
- [x] Also store the amount of time the note should be played
- [x] Reload Song list when a new one is saved
- [x] Show a list of stored songs with title
- [x] Enable replaying stored songs with a small play button next to the title (with correct timing of replayed keys!)
- [x] URL for the Apollo client should come from a config file
- [ ] Write tests
- [x] Write the documentation

## Technical discussion

I did not refactor the whole project, as I believe it was out of the scope of this challenge; however, if this was a real life situation, I would've converted everything into Typescript.
I also did not update the package versions of the pre-included project.

I tried to keep the changes to a minimal to the original components, but I had to mainly update `SoundfontProvider` in order to save all the notes being played and their timings inside the methods `playNote` and `stopNote`. I also updated the GraphQL schema, so a Song would be composed of a `miniNumber`, a `startTime` (when that key was pressed), and an `endTime` (when the key was released).
The `Piano` component was also updated, in order to provide the context for the application and make use of the functions that the `SoundfontProvider` was providing.

I ended up creating two contexts: the `RecordingContext`, which contains data regarding:

- if we're recording
- the notes being recorded and their timings
- new songs added in this session

The new songs part was added in order to not retrigger a new query to Apollo to get the whole list of songs, but rather add those new ones to the list to be displayed.

The `Recorder` component contains the recording button itself, a stopwatch, and the saving dialog.

The `SongList` is a sibling of the `Recorder` component, and displays a list of Songs. Each `Song` will manage the playing of the recorded song, which was done by using `setInterval` and checking the timings recorded at the `SoundfontProvider` level.

## Further improvements

Besides the unticked items on the above TODO list, if I had more time I would also consider the following:

- Adding a delete function
- Full conversion to Typescript
