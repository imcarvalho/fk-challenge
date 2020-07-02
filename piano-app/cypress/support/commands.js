// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("visitPianoPage", () => {
    cy.visit("http://localhost:3000/");
});

Cypress.Commands.add("removeSongs", () => {
    return cy.request({
        method: "POST",
        url: "http://localhost:4000",
        body: {
            operationName: "RemoveSong",
            variables: {},
            query: "mutation RemoveSong { removeSongs }",
        },
    });
});

Cypress.Commands.add("addSong", song => {
    return cy.request({
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
    });
});
