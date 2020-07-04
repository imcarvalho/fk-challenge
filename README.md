# fk-challenge

A challenge involving recording a piano song 🎹⏺

## Running the app

You'll need to add an `.env` file at the root of the `piano-app`, with the Apollo Client URL like this:

`REACT_APP_APOLLO_URL=<the actual URL>`

### With docker

`docker-compose up` on the root of the project.

### In the host machine

`npm i && npm start` on both `piano-app` and `graphql-server`.

## Running the tests

- `npm run cypress:open` - for the Cypress UI launch
- `npm run cypress:run` - for running in the command line

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
- [x] Write tests
- [x] Write the documentation

## Workflow

- You can interact with the Piano once you've hit Record
- After hitting Stop Recording, you'll be asked to input a song name
- The Song will be shown on a list below the Piano
- You can hit the Play button to listen to it
- Previously saved songs will show on this list upon page load

## Technical discussion

I did not refactor the whole project, as I believe it was out of the scope of this challenge; however, if this was a real life situation, I would've converted everything into Typescript.

I also did not update the package versions of the pre-included project.

What I did add was a docker compose configuration, which is an alternative way to run the project. This way, all dependencies are loaded on the containers with a single command, which is more practical than installing and starting the services manually.

On the UI and GraphQL server docker containers configuration, I used, on `command`, a shell script: this is due to `command` only allowing a single command, and I wanted to ensure that both install and run scripts were run at startup.

I also used styled-components for all the CSS I needed, instead of plain CSS like the original codebase used. I'm a fan of styled-components (and CSS-in-JS, generally speaking) because it scopes the CSS to that single component, avoiding common issues with "spilling" CSS.

### Updates to the existing codebase

I tried to keep the changes to a minimal to the original components, but I had to mainly update `SoundfontProvider` in order to save all the notes being played and their timings inside the methods `playNote` and `stopNote`.

I also updated the GraphQL schema, so a Song would be composed of a `miniNumber`, a `startTime` (when that key was pressed), and an `endTime` (when the key was released).

The `Piano` component was also updated, in order to provide the context for the application and make use of the functions that the `SoundfontProvider` was providing.

### React context creation

I ended up creating two Contexts: the `RecordingContext`, which contains data regarding:

- if we're recording
- the notes being recorded and their timings
- new songs added in this session

The new songs part was added in order to not retrigger a new query to Apollo to get the whole list of songs, but rather add those new ones to the list to be displayed.

### Brief architecture description

The `Recorder` component contains the recording button itself, a stopwatch, and the saving dialog.

The `SongList` is a sibling of the `Recorder` component, and displays a list of Songs.

Each `Song` will manage the playing of the recorded song, which was done by using `setInterval` and checking the timings recorded at the `SoundfontProvider` level.

I added a small time padding while checking for the timings, since dealing with `timestamp` precision could result in skipping the exact timestamp recorded.

### Testing

I've been eyeing Cypress for a while, and decided this challenge was the perfect way to test it out rather than use Jest and Enzyme as I've been doing.

Cypress allows end to end tests without having to worry about the actual component structures underneath. With Jest+Enzyme, being more focused on unit testing, in the event of code refactoring, the tests might stop working while the user flow is unaffected, which beats the purpose of the tests.

I did not, in the scope of this task, write the tests with Typescript. However, in a real world scenario, I would add the types so that all the tests can be typed.

## Further improvements

If I had more time I would also consider the following:

- Add a song removal functionality
- Full conversion to Typescript
- Also adding the types to Cypress and writing them in Typescript
