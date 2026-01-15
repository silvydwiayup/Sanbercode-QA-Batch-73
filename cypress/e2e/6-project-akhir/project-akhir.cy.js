import paLoginPageOrange from "../../support/PageObjects/project-akhir/pa-loginPage-orange";
import paDirectoryPage from "../../support/PageObjects/project-akhir/pa-directoryPage";
import paDashboardPage from "../../support/PageObjects/project-akhir/pa-dashboardPage";

describe('OrangeHRM Comprehensive Test Suite', () => {

  beforeEach(() => {
    paLoginPageOrange.visit();
  });

  // --- LOGIN ---
  context('Fitur Login', () => {
    it('TC_01: Login Berhasil', () => {
      cy.intercept('POST', '**/auth/validate').as('apiLogin');
      paLoginPageOrange.submitLoginOrange('Admin', 'admin123');
      cy.wait('@apiLogin').its('response.statusCode').should('be.oneOf', [200, 302]);
      paDashboardPage.elements.dashboardTitle().should('contain', 'Dashboard');
    });

    it('TC_02: Login Gagal - Password Salah', () => {
      cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('apiLoginFail');
      paLoginPageOrange.submitLoginOrange('Admin', 'salah123');
      
      cy.wait('@apiLoginFail');
      paLoginPageOrange.elements.errorMessage().should('be.visible').and('contain', 'Invalid credentials');
    });

    it('TC_03: Login Gagal - Field Kosong', () => {
      
      cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('noApi');
      paLoginPageOrange.elements.loginBtn().click();
      
      paLoginPageOrange.elements.requiredMsg().should('be.visible').and('contain', 'Required');
      cy.get('@noApi.all').should('have.length', 0);
    });
  });

  // --- FORGOT PASSWORD ---
  context('Fitur Forgot Password', () => {
    it('TC_04: Navigasi ke Halaman Reset Password', () => {
      cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode').as('apiResetPage');
      paLoginPageOrange.elements.forgotPasswordLink().click();
      
      cy.wait('@apiResetPage').its('response.statusCode').should('eq', 200);
      cy.get('.orangehrm-forgot-password-title').should('contain', 'Reset Password');
    });
  });

  // --- DIRECTORY ---
  context('Fitur Directory (Dashboard)', () => {
    beforeEach(() => {
      paLoginPageOrange.submitLoginOrange('Admin', 'admin123');
      cy.url().should('include', '/dashboard/index');
      cy.get('.oxd-loading-spinner').should('not.exist');
    });

    it('TC_05: Verifikasi Pemuatan Widget Dashboard via API', () => {

        cy.intercept('GET', '**/api/v2/dashboard/employees/time-at-work*').as('apiTimeWork');
        cy.intercept('GET', '**/api/v2/dashboard/shortcuts*').as('apiShortcuts');

        paDashboardPage.elements.dashboardTitle().should('contain', 'Dashboard');

        paDashboardPage.verifyDashboardLayout();

        cy.wait(['@apiTimeWork', '@apiShortcuts']).then(([timeWork, shortcuts]) => {
            expect(timeWork.response.statusCode).to.eq(200);
            expect(shortcuts.response.statusCode).to.eq(200);
        });
    });


    it('TC_06: Memuat Daftar Directory (GET API)', () => {
      
      cy.intercept('GET', '**/api/v2/directory/employees*').as('apiLoadDirectory');
      
      paDirectoryPage.goToDirectory();
      
      cy.wait('@apiLoadDirectory').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.response.body.data).to.be.an('array');
      });
      paDirectoryPage.elements.headerTitle().should('contain', 'Directory');
    });

    it('TC_07: Pencarian Karyawan Tanpa Filter', () => {
      paDirectoryPage.goToDirectory();

      cy.intercept('GET', '**/api/v2/directory/employees*').as('apiSearch');
      
      paDirectoryPage.elements.searchBtn().click();
      
      cy.wait('@apiSearch');
      paDirectoryPage.elements.resultCards().should('have.length.at.least', 1);
    });
  });
});