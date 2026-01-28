/// <reference types="cypress" />

Cypress.Commands.add('login', (optionalUsername: string, optionalPassword: string) => {
    const username = optionalUsername ?? Cypress.env('users').standard_user.username;
    const password = optionalPassword ?? Cypress.env('users').standard_user.password;
    cy.getByDataTest('username').type(username);
    cy.getByDataTest('password').type(password);
    cy.getByDataTest('login-button').click();
});

Cypress.Commands.add('getByDataTest', (selector: string, ...args: any[]) => {
    return cy.get(`[data-test=${selector}]`, ...args) as unknown as Cypress.Chainable<Element>;
});

Cypress.Commands.add('getById', (id: string, ...args: any[]) => {
    return cy.get(`#${id}`, ...args) as unknown as Cypress.Chainable<Element>;
});

Cypress.Commands.add('verifyPriceSorting', (sortOrder: 'lohi' | 'hilo') => {
    cy.get('.product_sort_container').select(sortOrder);
    cy.get('.inventory_item_price').then(($prices) => {
        const priceValues = Cypress._.map($prices, (el) => 
            parseFloat(el.innerText.replace('$', ''))
        );
        const sortedPrices = [...priceValues].sort((a, b) => 
            sortOrder === 'lohi' ? a - b : b - a
        );
        expect(priceValues).to.deep.equal(sortedPrices);
    });
});

Cypress.Commands.add('verifyNameSorting', (sortOrder: 'az' | 'za') => {
    cy.get('.product_sort_container').select(sortOrder);
    cy.get('.inventory_item_name').then(($names) => {
        const nameValues = Cypress._.map($names, (el) => el.innerText.trim());
        const sortedNames = [...nameValues].sort((a, b) => {
            return sortOrder === 'az' 
                ? a.localeCompare(b) // A to Z
                : b.localeCompare(a); // Z to A
        });
        expect(nameValues).to.deep.equal(sortedNames);
    });
});