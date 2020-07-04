/// <reference types="cypress" />

context("Recording Piano", () => {
    beforeEach(() => {
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

        cy.wait(500);

        cy.get(".ReactPiano__Key")
            .first()
            .click();

        cy.wait(500);

        cy.getElement("button-stop").click();

        cy.getElement("save-form").should("exist");
    });

    it("should save a song", () => {
        cy.visitPianoPage();

        cy.getElement("button-record").click();

        cy.wait(500);

        cy.get(".ReactPiano__Key")
            .first()
            .click();

        cy.wait(500);

        cy.getElement("button-stop").click();

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
});
