describe('homepage', () => {
  it('loads and shows the title', () => {
    cy.visit('/');
    cy.contains(/chorechief/i);
  });
});
