describe('Fitur Login OrangeHRM', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  it('TC_01: Login Berhasil Menggunakan Intercept', () => {
    
    cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('loginSuccess');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    
    
    cy.wait('@loginSuccess').then((interception) => 
        {expect(interception.response.statusCode).to.be.oneOf([200, 302]);
    });
    
    cy.url().should('include', '/dashboard');
    cy.get('.oxd-topbar-header-title').should('contain', 'Dashboard');
  });

  it('TC_02: Login dengan password salah Menggunakan Intercept', () => {
    
    cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('loginWrongPass');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin12');
    cy.get('button[type="submit"]').click();

    
    cy.wait('@loginWrongPass').then((interception) => 
        {expect(interception.response.statusCode).to.be.oneOf([200, 302]);
    });

    cy.get('.oxd-alert-content').should('be.visible').and('contain', 'Invalid credentials');
  });

  it('TC_03: Login dengan username tidak terdaftar Menggunakan Intercept', () => {
    
    cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('loginUnknownUser');

    cy.get('input[name="username"]').type('silvy');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginUnknownUser').its('request.body').should('include', 'username=silvy');
    cy.get('.oxd-alert-content').should('be.visible').and('contain', 'Invalid credentials');
  });

  it('TC_04: Login dengan field kosong Menggunakan Intercept', () => {
    
    cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('loginAttempt');

    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-group__message').should('be.visible').and('contain', 'Required');
    cy.get('@loginAttempt.all').should('have.length', 0);
  });

  it('TC_05: Login dengan Username Case Sensitive (ADMIN) Menggunakan Intercept', () => {
    
    cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('loginUpperCase');

    cy.get('input[name="username"]').type('ADMIN');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginUpperCase').its('request.body').should('include', 'username=ADMIN');
    cy.url().should('include', '/dashboard');
  });

  it('TC_06: Verifikasi tipe input password Menggunakan Intercept', () => {
    
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login').as('getMessages');
    
    cy.wait('@getMessages');

    cy.get('input[name="password"]').should('be.visible').and('have.attr', 'type', 'password');
  });

  it('TC_07: Klik tautan Lupa Password Menggunakan Intercept', () => {
    
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode').as('goToResetPage');

    cy.get('.orangehrm-login-forgot-header').click();

    cy.wait('@goToResetPage').then((interception) => 
        {expect(interception.response.statusCode).to.equal(200);
    });

    cy.url().should('include', '/requestPasswordResetCode');
    cy.get('.orangehrm-forgot-password-title').should('contain', 'Reset Password');
  });

});