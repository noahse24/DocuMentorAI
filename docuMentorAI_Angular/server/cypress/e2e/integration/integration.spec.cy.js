describe('Integration Tests', () => {
    it('should allow a user to register, login, display documents, and search documents', () => {
        const user = `testuser${Date.now()}`;
        const email = `testuser${Date.now()}@example.com`;

        // Register a new user
        cy.visit('/login');  // Adjust this if the route is different, for example, '/login' and then switch to register
        //cy.get('button.toggle-button').click();  // Switch to register mode

        cy.get('input[formControlName="username"]').should('be.visible').type(user);
        cy.get('input[formControlName="email"]').should('be.visible').type(email);
        cy.get('input[formControlName="password"]').should('be.visible').type('newpassword');
        cy.get('button.submit-button').click();

        // Log out after registration
        cy.get('button.logout-button').scrollIntoView().should('be.visible').click();
        // Login with the new user
        cy.get('button.toggle-button').click();  // Switch to login mode
        cy.get('input[formControlName="email"]').should('be.visible').type(email);
        cy.get('input[formControlName="password"]').should('be.visible').type('newpassword');
        cy.get('button.submit-button').click();

        // Verify login was successful
        cy.url().should('include', '/dashboard');

        // Navigate to All Documents page
        cy.get('a[routerLink="/documents"]').click();


        // Randomly select two documents and toggle their content display
        cy.get('.card').then($cards => {
            const totalCards = $cards.length;
            if (totalCards < 2) {
                throw new Error('Not enough documents to test');
            }
            const indices = [];
            while (indices.length < 2) {
                const randomIndex = Math.floor(Math.random() * totalCards);
                if (!indices.includes(randomIndex)) {
                    indices.push(randomIndex);
                }
            }
            indices.forEach(index => {
                cy.wrap($cards[index]).within(() => {
                    // Toggle document content visibility
                    cy.get('button.btn-primary').click(); // Show document
                    cy.get('.card-text').should('be.visible');
                    cy.wait(2000); // Wait for 2 seconds
                    cy.get('button.btn-primary').click(); // Hide document
                    //cy.get('.card-text').should('not.be.visible');
                });
            });
        });
    
        // Navigate to Document Retrieval page
        cy.get('a[routerLink="/documentRetrieval"]').click();
        
        // Perform document search
        cy.get('input[placeholder="Enter your prompt"]').should('be.visible').type('UltraView');
        cy.get('button').contains('Retrieve Documents').click();

        // Select one found document and toggle its content display
        cy.get('.card').first().within(() => {
            cy.get('button.btn-primary').click(); // Show document
            cy.get('.card-text').should('be.visible');
            cy.wait(2000); // Wait for 2 seconds
            cy.get('button.btn-primary').click(); // Hide document
            //cy.get('.card-text').should('not.be.visible');
        });
    });    
});
