/// <reference types="cypress" />

/**
 * Комоновский класс с методами которіе используются сквозняком по всему приложению, это простенькие методы для каких то базовых операций, либо часто повторяющееся в рамка приложения
 */

class Common {

    open_page(page: string): Common {
		cy.visit(page);
		return this;
	}

    chekElementExist (elem: string, state: boolean): Common {
        if (state === false) {
            cy.get(elem).should('not.be.visible');
        } else {
            cy.get(elem).should('be.visible');
        }
        return this;
    }

    simpleCLick(elem: string): Common {
        cy.get(elem).click();
        return this;
    }

    fillField (elem: string, text: string) {
        cy.get(elem).type(text);
        return this;
    }

    sendForm (elem: string) {
        cy.get(elem).submit();
        return this;
    }

    checkUrl(expect, state?: boolean) {
		if (state === false) {
			cy.url().should('not.include', expect);
		} else {
			cy.url().should('include', expect);
		}
		return this;
	}

    checkEmptyFieldHighlight(elem: string, color:string, highLighted: boolean) {
		let hl = highLighted ? color : 'rgb(255, 255, 255)';
		cy.get(elem).should('have.css', 'color', hl);
		return this;
	}

    checkSnackbar(snackbar: string, text: string): Common {
		if (text) {
			cy.get(snackbar).should('be.visible').invoke('text').invoke('trim').should('be.eq', text);
		} else {
			cy.get(snackbar).should('be.visible');
		}
		return this;
	}

    fillSelect(elem: string, option: string): Common {
		cy.get(elem)
			.click()
			.then(() => {
				cy.get('.input-box__input-list').contains(option).click();
			});
		return this;
	}

    checkRequest(reg: string, expected: string): Common {
		cy.wait('@' + reg).its('request.body').should('contain', expected);
        return this;
	}

    checkResponse(fixture, status, expected) {
		cy.wait('@' + fixture).then((data) => {
			expect(data.response.statusCode).equal(status);
			expect(data.response.body.res).contain(expected);
		});
		return this;
	}

    fillIframeField (elem: string, text: string): Common {
        cy.get('#solid-payment-form-iframe')
            .its('0.contentDocument.body')
            .should('not.be.empty')
            .then(body => {
                cy.wrap(body).find(elem).click().type(text)
            })
        return this;
    }

    checkExistenceIfameElement(elem: string) {
        cy.get('#solid-payment-form-iframe')
            .its('0.contentDocument.body')
            .should('not.be.empty')
            .then(body => {
                cy.wrap(body).find(elem).should('be.visible').and('exist');
            })
        return this;
    }

    simpleClickIframe (elem: string) {
        cy.get('#solid-payment-form-iframe')
            .its('0.contentDocument.body')
            .should('not.be.empty')
            .then(body => {
                cy.wrap(body).find(elem).click({force: true});
            })
        return this;
    }

    checkElementPropertyIframe (elem:string, property:string, value:string) {
        cy.get('#solid-payment-form-iframe')
            .its('0.contentDocument.body')
            .should('not.be.empty')
            .then(body => {
                cy.wrap(body).find(elem).should('have.css', property, value);
            })
            return this;
    }

    checkElementTextIframe (elem:string, text:string) {
        cy.get('#solid-payment-form-iframe')
            .its('0.contentDocument.body')
            .should('not.be.empty')
            .then(body => {
                cy.wrap(body).find(elem).invoke('text').invoke('trim').should('be.eq', text);
            })
        return this;
    }

    typeEnterIframe (elem) {
        cy.get('#solid-payment-form-iframe')
            .its('0.contentDocument.body')
            .should('not.be.empty')
            .then(body => {
                cy.wrap(body).find(elem).click().type('{enter}');
            })
        return this;
    }
};

export const common = new Common ();