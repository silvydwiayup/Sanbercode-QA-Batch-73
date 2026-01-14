import { loginPage } from "../../support/PageObjects/loginpom";

describe('TC_Login: Validasi dengan Page Object Model', () => {

  beforeEach(() => {
    loginPage.visit();
  });

  it('TC_01: Login Berhasil', () => {
    cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('loginSuccess');

    loginPage.submitLogin('Admin', 'admin123');

    cy.wait('@loginSuccess').its('response.statusCode').should('eq', 302);
    loginPage.elements.dashboardHeader().should('contain', 'Dashboard');
  });

  it('TC_02: Login dengan password salah', () => {
    cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('loginWrongPass');

    loginPage.submitLogin('Admin', 'admin12');

    cy.wait('@loginWrongPass');
    loginPage.elements.errorMessage().should('be.visible').and('contain', 'Invalid credentials');
  });

  it('TC_03: Login dengan Username Tidak Terdaftar', () => {
    
    cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('loginUnknownUser');

    loginPage.submitLogin('user_palsu', 'admin123');

    cy.wait('@loginUnknownUser').its('request.body').should('include', 'username=user_palsu');
    loginPage.elements.errorMessage().should('be.visible').and('contain', 'Invalid credentials');
  });

  it('TC_04: Login dengan Field Kosong', () => {
    
    cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('loginAttempt');

    loginPage.elements.loginBtn().click();

    loginPage.elements.requiredLabel().should('be.visible').and('contain', 'Required');
    cy.get('@loginAttempt.all').should('have.length', 0);
  });

  it('TC_07: Klik tautan Lupa Password', () => {
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode').as('goToResetPage');

    loginPage.clickForgotPassword();

    cy.wait('@goToResetPage').its('response.statusCode').should('eq', 200);
    cy.url().should('include', '/requestPasswordResetCode');
  });

});