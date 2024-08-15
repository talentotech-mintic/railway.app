describe('Vitrina Comercial', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('displays products', () => {
        cy.contains('Nuestra Colección');
        cy.get('.grid').should('exist');
        cy.get('.grid > div').should('have.length.gt', 0);
    });

    it('opens product modal', () => {
        cy.contains('Ver detalles').first().click();
        cy.get('.fixed').should('be.visible');
        cy.contains('Añadir al carrito').should('be.visible');
    });

    it('adds product to cart', () => {
        cy.contains('Añadir al carrito').first().click();
        cy.contains('Carrito (1)').should('be.visible');
    });

    it('opens cart modal', () => {
        cy.contains('Añadir al carrito').first().click();
        cy.contains('Carrito (1)').click();
        cy.get('.fixed').should('be.visible');
        cy.contains('Carrito de Compras').should('be.visible');
    });

    it('searches for products', () => {
        const searchTerm = 'Mochila';
        cy.get('input[type="text"]').type(searchTerm);
        cy.get('.grid > div').each(($el) => {
            cy.wrap($el).should('contain', searchTerm);
        });
    });

    it('logs in as admin', () => {
        cy.contains('Iniciar sesión').click();
        cy.get('#username').type('admin');
        cy.get('#password').type('123');
        cy.get('button').contains('Iniciar Sesión').click();
        cy.contains('Añadir Producto').should('be.visible');
    });
});