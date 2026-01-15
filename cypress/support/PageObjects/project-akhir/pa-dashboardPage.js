class DashboardPage {
  elements = {
    dashboardTitle: () => cy.get('.oxd-topbar-header-title'),
    timeAtWorkCard: () => cy.contains('Time at Work'),
    myActionsCard: () => cy.contains('My Actions'),
    quickLaunchGrid: () => cy.get('.orangehrm-dashboard-widget').contains('Quick Launch'),
    buzzLatestPosts: () => cy.contains('Buzz Latest Posts')
  }

  verifyDashboardLayout() {
    this.elements.dashboardTitle().should('be.visible');
    this.elements.timeAtWorkCard().should('be.visible');
    this.elements.quickLaunchGrid().should('be.visible');
  }
}
export default new DashboardPage();