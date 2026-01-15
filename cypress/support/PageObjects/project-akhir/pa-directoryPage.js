class DirectoryPage {
  elements = {
    directoryMenu: () => cy.get('a[href*="viewDirectory"]'),
    headerTitle: () => cy.get('.oxd-topbar-header-title'),
    jobTitleDropdown: () => cy.get('.oxd-select-text').first(),
    searchBtn: () => cy.get('button[type="submit"]'),
    resultCards: () => cy.get('.orangehrm-directory-card'),
    firstResultName: () => cy.get('.orangehrm-directory-card-header > .oxd-text').first()
  }

  goToDirectory() {
    this.elements.directoryMenu().click();
  }
}
export default new DirectoryPage();