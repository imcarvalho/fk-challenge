/// <reference types="cypress" />

const DEFAULT_WAITING_NOTE = 600;

context("Recording Piano", () => {
    beforeEach(() => {
        cy.removeSongs();
        cy.server();
    });

    after(() => {
        cy.removeSongs();
    });

    it("starts recording and stopwatch runs", () => {
        cy.visitPianoPage();

        cy.getElement("button-record").should("be.visible");
        cy.getElement("button-stop").should("not.exist");
        cy.getElement("stopwatch")
            .contains("00:00")
            .should("exist");

        cy.getElement("button-record").click();
        cy.getElement("button-stop").should("be.visible");

        cy.wait(1000);

        cy.getElement("stopwatch")
            .contains("00:00")
            .should("not.exist");
    });

    it("should show the save dialog after hitting record and playing piano keys", () => {
        cy.visitPianoPage();

        cy.getElement("button-record").click();

        cy.wait(DEFAULT_WAITING_NOTE);

        cy.get(".ReactPiano__Key")
            .first()
            .click();

        cy.wait(DEFAULT_WAITING_NOTE);

        cy.getElement("button-stop").click();

        cy.wait(DEFAULT_WAITING_NOTE);

        cy.getElement("save-form").should("exist");
    });

    it("should save a song", () => {
        cy.visitPianoPage();

        cy.getElement("button-record").click();

        cy.wait(DEFAULT_WAITING_NOTE);

        cy.get(".ReactPiano__Key")
            .first()
            .click();

        cy.wait(DEFAULT_WAITING_NOTE);

        cy.getElement("button-stop").click();

        cy.wait(DEFAULT_WAITING_NOTE);

        cy.getElement("save-form").should("exist");

        const songTitle = "So much talent for music";

        cy.getElement("song-title-input").type(songTitle);

        cy.getElement("submit-song").click();

        cy.getElement("song-list").should("contain", songTitle);
    });

    it("should display a previously saved song, and be able to play it", () => {
        const songLength = 1887;

        cy.addSong({
            title: "My Amazing Song",
            keyStrokes: [
                { midiNumber: 54, startTime: 875, endTime: 980 },
                { midiNumber: 59, startTime: 1175, endTime: 1299 },
                { midiNumber: 52, startTime: 1476, endTime: 1594 },
                { midiNumber: 57, startTime: 1771, endTime: 1790 },
                { midiNumber: 59, startTime: 1782, endTime: songLength },
            ],
        });

        cy.visitPianoPage();

        cy.getElement("play-button")
            .first()
            .find("[data-icon='play']")
            .should("exist");

        cy.getElement("play-button")
            .first()
            .click();

        cy.wait(songLength / 2);

        cy.getElement("play-button")
            .first()
            .find("[data-icon='stop']")
            .should("exist");

        cy.wait(songLength);

        cy.getElement("play-button")
            .first()
            .find("[data-icon='play']")
            .should("exist");
    });

    it("should show an error message when there's a failure in getting the list of songs", () => {
        // a failing test
        cy.route({
            method: "POST",
            url: "http://localhost:4000/",
            status: 400,
            response: {},
        }).as("failGraphqlRequest");

        cy.visitPianoPage();

        cy.wait("@failGraphqlRequest");

        cy.getElement("song-list-container")
            .find("[data-cy=alert-message]")
            .should("exist");
    });

    it("should show an error message when it fails to save a song", () => {
        // a failing test
        cy.route({
            method: "POST",
            url: "http://localhost:4000/",
            status: 400,
            response: {},
        }).as("failGraphqlRequest");

        cy.visitPianoPage();

        cy.wait("@failGraphqlRequest");

        cy.getElement("button-record").click();

        cy.wait(DEFAULT_WAITING_NOTE);

        cy.get(".ReactPiano__Key")
            .first()
            .click();

        cy.wait(DEFAULT_WAITING_NOTE);

        cy.getElement("button-stop").click();

        cy.wait(DEFAULT_WAITING_NOTE);

        const songTitle = "So much talent for music";

        cy.getElement("song-title-input").type("A song doomed to be forgotten");

        cy.getElement("submit-song").click();

        cy.getElement("save-container")
            .find("[data-cy=alert-message]")
            .should("exist");
    });
});
