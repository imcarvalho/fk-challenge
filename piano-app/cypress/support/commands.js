Cypress.Commands.add("visitPianoPage", () => cy.visit("http://localhost:3000/"));

Cypress.Commands.add("removeSongs", () =>
    cy.request({
        method: "POST",
        url: "http://localhost:4000",
        body: {
            operationName: "RemoveSong",
            variables: {},
            query: "mutation RemoveSong { removeSongs }",
        },
    })
);

Cypress.Commands.add("addSong", song =>
    cy.request({
        method: "POST",
        url: "http://localhost:4000",
        body: {
            operationName: "AddSong",
            variables: song,
            query: `mutation AddSong($title: String!, $keyStrokes: [NoteInput]!) {
              addSong(title: $title, keyStrokes: $keyStrokes) {
                _id
                title
                keyStrokes {
                  midiNumber
                  startTime
                  endTime
                  __typename
                }
                __typename
              }
            }`,
        },
    })
);

Cypress.Commands.add("getElement", element => cy.get(`[data-cy=${element}]`));
