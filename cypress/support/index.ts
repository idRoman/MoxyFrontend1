/// <reference types="cypress" />

import './commands';

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      /**
       * Custom command to get elements by data-test attribute.
       * @example cy.getByDataTest('selector')
       */
      getByDataTest(selector: string, ...args: any[]): Chainable<Element>;
    }
  }
}