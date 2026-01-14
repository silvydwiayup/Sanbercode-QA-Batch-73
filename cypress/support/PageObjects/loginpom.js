class LoginPage {
    
  elements = {
    usernameInput: () => cy.get('input[name="username"]'),
    passwordInput: () => cy.get('input[name="password"]'),
    loginBtn: () => cy.get('button[type="submit"]'),
    errorMessage: () => cy.get('.oxd-alert-content'),
    forgotPasswordLink: () => cy.get('.orangehrm-login-forgot-header'),
    requiredLabel: () => cy.get('.oxd-input-group__message'),
    dashboardHeader: () => cy.get('.oxd-topbar-header-title')
  }

  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  submitLogin(username, password) {
    if (username) this.elements.usernameInput().type(username);
    if (password) this.elements.passwordInput().type(password);
    this.elements.loginBtn().click();
  }

  clickForgotPassword() {
    this.elements.forgotPasswordLink().click();
  }
}

export const loginPage = new LoginPage();