/// <reference types="cypress" />

import './commands';

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      /**
       * Custom command to get elements by data-test attribute.
       * @example cy.getByDataTest('selector')
       */
      login(optionalUsername?: string, optionalPassword?: string): Chainable<Element>;
      getByDataTest(selector: string, ...args: any[]): Chainable<Element>;
      getById(selector: string, ...args: any[]): Chainable<Element>;
      verifyPriceSorting(sortOrder: 'lohi' | 'hilo'): Chainable<void>;
      verifyNameSorting(sortOrder: 'az' | 'za'): Chainable<void>;
    }
  }
}