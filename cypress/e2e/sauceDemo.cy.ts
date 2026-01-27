
describe('Moxymind Frontend Test', () => {
    
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', Cypress.config().baseUrl);
    });

    // Test case 1: Successful login with valid credentials is one of the most important tests
    it('Should login with valid credentials', () => {
        cy.login();
        cy.url().should('include', '/inventory.html');
        cy.getByDataTest('inventory-container').should('be.visible');
    });

    // Test case 2: Unsuccessful login with invalid credentials is also important for security reasons
    it('Shouldnt login and should display error message using invalid credentials', () => {
        cy.login('invalid_user', 'invalid_password');
        cy.getByDataTest('error').should('be.visible')
          .and('contain.text', 'Username and password do not match any user in this service');
    });

    // Test case 3: Logout functionality is crucial for user session management
    it('Should logout successfully', () => {
        cy.login();
        cy.url().should('include', '/inventory.html');
        cy.getById('react-burger-menu-btn').click();
        cy.getByDataTest('logout-sidebar-link').click();
        cy.url().should('eq', Cypress.config().baseUrl);
        cy.getByDataTest('login-button').should('be.visible');
    });

    // Test case 4: Adding and removing items from the cart is essential for eshops functionality
    it('Should add item to cart, verify added item and remove it', () => {
        cy.login();
        cy.url().should('include', '/inventory.html');
        cy.getByDataTest('add-to-cart-sauce-labs-backpack').click();
        // Cart badge should show 1 item
        cy.getByDataTest('shopping-cart-badge').should('contain.text', '1');
        cy.getByDataTest('shopping-cart-link').click();
        cy.url().should('include', '/cart.html');
        cy.getByDataTest('cart-contents-container').should('contain.text', 'Sauce Labs Backpack');
        // Remove item from cart
        cy.getByDataTest('remove-sauce-labs-backpack').click();
        cy.getByDataTest('cart-contents-container').should('not.contain.text', 'Sauce Labs Backpack');
    });

    // Test case 5: Completing a purchase is a key step for user flow and business
    it('Should complete a purchase successfully', () => {
        cy.login();
        cy.url().should('include', '/inventory.html');
        cy.getByDataTest('add-to-cart-sauce-labs-backpack').click();
        cy.getByDataTest('shopping-cart-link').click();
        cy.url().should('include', '/cart.html');
        cy.getByDataTest('checkout').click();
        cy.url().should('include', '/checkout-step-one.html'); 
        // Fill in checkout information
        cy.getByDataTest('firstName').type('Roman');
        cy.getByDataTest('lastName').type('Goodman');
        cy.getByDataTest('postalCode').type('777');
        cy.getByDataTest('continue').click();
        cy.url().should('include', '/checkout-step-two.html');
        // Finish checkout
        cy.getByDataTest('finish').click();
        cy.url().should('include', '/checkout-complete.html');
        cy.getByDataTest('checkout-complete-container').should('contain.text', 'Thank you for your order!');
    });

    // Test case 6: Sorting items by price and name is useful for user experience
    it('Should sort items by price low to high', () => {
        cy.login();
        cy.url().should('include', '/inventory.html');
        cy.verifyPriceSorting('lohi');
        cy.verifyPriceSorting('hilo');
        cy.verifyNameSorting('az');
        cy.verifyNameSorting('za');
    });
});