describe ('Fitur Login OrangeHRM', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  it('TC_01: Login Berhasil', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    
    cy.url().should('include', '/dashboard');
    cy.get('.oxd-topbar-header-title').should('contain', 'Dashboard');
  });

  it('TC_02: Login dengan password salah', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin12');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-alert-content').should('be.visible').and('contain', 'Invalid credentials');
  });

  it('TC_03: Login dengan username tidak terdaftar', () => {
    cy.get('input[name="username"]').type('silvy');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-alert-content').should('be.visible').and('contain', 'Invalid credentials');
  });

  it('TC_04: Login dengan field kosong', () => {
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-group__message').should('be.visible').and('contain', 'Required');
  });

  it('TC_05: Login dengan Username Case Sensitive (ADMIN)', () => {
    cy.get('input[name="username"]').type('ADMIN');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');
  });

  it('TC_06: Verifikasi tipe input password', () => {

    cy.get('input[name="password"]')
      .should('have.attr', 'type', 'password');
  });

  it('TC_07: Klik tautan Lupa Password', () => {
    cy.get('.orangehrm-login-forgot-header').click();

    cy.url().should('include', '/requestPasswordResetCode');
    cy.get('.orangehrm-forgot-password-title').should('contain', 'Reset Password');
  });

});