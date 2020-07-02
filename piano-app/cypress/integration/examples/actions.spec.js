/// <reference types="cypress" />

context("Recording Piano", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
    });

    it("starts recording and stopwatch runs", () => {
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

    it.only("starts recording and stopwatch runs", () => {
        cy.get("[data-cy=button-record]").click();

        cy.get(".ReactPiano__Key")
            .first()
            .click();

        cy.get("[data-cy=button-stop]").click();
    });
});
