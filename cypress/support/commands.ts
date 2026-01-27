/// <reference types="cypress" />

Cypress.Commands.add('getByDataTest', (selector, ...args) => {
    return cy.get(`[data-test=${selector}]`, ...args) as unknown as Cypress.Chainable<Element>;
});