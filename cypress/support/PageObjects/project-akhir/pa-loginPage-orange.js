class LoginPageOrange {
  elements = {
    usernameField: () => cy.get('input[name="username"]'),
    passwordField: () => cy.get('input[name="password"]'),
    loginBtn: () => cy.get('button[type="submit"]'),
    forgotPasswordLink: () => cy.get('.orangehrm-login-forgot-header'),
    errorMessage: () => cy.get('.oxd-alert-content'),
    requiredMsg: () => cy.get('.oxd-input-group__message')
  }

  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  submitLoginOrange(username, password) {
    if (username) this.elements.usernameField().type(username);
    if (password) this.elements.passwordField().type(password);
    this.elements.loginBtn().click();
  }
}
export default new LoginPageOrange();