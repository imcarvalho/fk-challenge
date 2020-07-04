/// <reference types="cypress" />

context("Recording Piano", () => {
    beforeEach(() => {
        cy.removeSongs();
    });

    it("starts recording and stopwatch runs", () => {
        cy.visitPianoPage();

        cy.get("[data-cy=button-record]").should("be.visible");
        cy.get("[data-cy=button-stop]").should("not.exist");
        cy.get("[data-cy=stopwatch]").contains("00:00");

        cy.get("[data-cy=button-record]").click();
        cy.get("[data-cy=button-stop]").should("be.visible");

        cy.wait(1000);

        cy.get("[data-cy=stopwatch]")
            .contains("00:00")
            .should("not.exist");

        cy.get("[data-cy=button-stop]").click();
    });

    it("should show the save dialog after hitting record and playing piano keys", () => {
        cy.visitPianoPage();

        cy.get("[data-cy=button-record]").click();

        cy.get(".ReactPiano__Key")
            .first()
            .click();

        cy.get("[data-cy=button-stop]").click();
    });

    it("should have a song and play it", () => {
        cy.addSong({
            title: "My Amazing Song",
            keyStrokes: [
                { midiNumber: 54, startTime: 875, endTime: 980 },
                { midiNumber: 59, startTime: 1175, endTime: 1299 },
                { midiNumber: 52, startTime: 1476, endTime: 1594 },
                { midiNumber: 57, startTime: 1771, endTime: 1790 },
                { midiNumber: 59, startTime: 1782, endTime: 1887 },
                { midiNumber: 53, startTime: 2042, endTime: 2174 },
                { midiNumber: 57, startTime: 2327, endTime: 2455 },
                { midiNumber: 55, startTime: 2628, endTime: 2776 },
            ],
        });

        cy.visitPianoPage();
    });
});
