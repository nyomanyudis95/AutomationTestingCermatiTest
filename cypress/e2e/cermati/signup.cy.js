/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('example to-do app', () => {
    beforeEach(() => {
      cy.visit('https://www.cermati.com/app/gabung')
    })

    it('Check validation input', () => {
        // Check validation input email
        cy.get('#email').focus();
        cy.get('#mobilePhone').focus();
        cy.get('.m-t-4.error_rz3sn').each(($ele,index) => {
            if(index == 0){
                cy.wrap($ele).should('have.text','Input wajib diisi')
            }
        })
        cy.get('#email').type('ada');
        cy.get('#mobilePhone').focus();
        cy.get('.m-t-4.error_rz3sn').each(($ele,index) => {
            if(index == 0){
                cy.wrap($ele).should('have.text','Format email tidak valid')
            }
        })
        cy.get('#email').type('nyoman@mailinator.com');
        cy.get('#mobilePhone').focus();
        cy.get('.m-t-4.error_rz3sn').should('have.length', 1)
        

        //Check validation input No.Handphone 
        cy.get('.m-t-4.error_rz3sn').each(($ele,index) => {
            if(index == 0){
                cy.wrap($ele).should('have.text','Input wajib diisi')
            }
        })
        cy.get('#mobilePhone[pattern="[0-9]*"]').type('089');
        cy.get('#password').focus();
        cy.get('.m-t-4.error_rz3sn').each(($ele,index) => {
            if(index == 0){
                cy.wrap($ele).should('have.text','Nomor handphone tidak valid')
            }
        })
        cy.get('#mobilePhone[pattern="[0-9]*"]').clear();
        cy.get('#mobilePhone[pattern="[0-9]*"]').type('0895332176476')
        cy.get('#password').focus();
        cy.get('.m-t-4.error_rz3sn').should('have.length', 1)

        //Check validation input Kata Sandi
        cy.get('.m-t-4.error_rz3sn').each(($ele,index) => {
            if(index == 0){
                cy.wrap($ele).should('have.text','Input wajib diisi')
            }
        })
        cy.get('#password').type('ada');
        cy.get('#confirmPassword').focus();
        cy.get('.m-t-4.error_rz3sn').each(($ele,index) => {
            if(index == 0){
                cy.wrap($ele).should('have.text','Kata sandi tidak memenuhi syarat')
            }
        })
        cy.get('#password').clear();
        cy.get('#password').type('Ada');
        cy.get('#confirmPassword').focus();
        cy.get('.m-t-4.error_rz3sn').each(($ele,index) => {
            if(index == 0){
                cy.wrap($ele).should('have.text','Kata sandi tidak memenuhi syarat')
            }
        })
        cy.get('#password').clear();
        cy.get('#password').type('Ada1');
        cy.get('#confirmPassword').focus();
        cy.get('.m-t-4.error_rz3sn').each(($ele,index) => {
            if(index == 0){
                cy.wrap($ele).should('have.text','Kata sandi tidak memenuhi syarat')
            }
        })
        cy.get('#password').clear();
        cy.get('#password').type('Ada11234');
        cy.get('#confirmPassword').focus();
        cy.get('.m-t-4.error_rz3sn').should('have.length', 1)

        //Check Validation Confirm Password 
        cy.get('#confirmPassword').type('ada');
        cy.get('#firstName').focus();
        cy.get('.m-t-4.error_rz3sn').each(($ele,index) => {
            if(index == 0){
                cy.wrap($ele).should('have.text','Kata Sandi tidak cocok')
            }
        })
        cy.get('#confirmPassword').clear();
        cy.get('#confirmPassword').type('Ada11234');
        cy.get('#firstName').focus();
        cy.get('.m-t-4.error_rz3sn').should('have.length', 1)

        //Check Validation First Name 
        cy.get('#firstName').type('Yudis');
        cy.get('#lastName').focus();
        cy.get('#cityAndProvince').focus();
        cy.get('.m-t-4.error_rz3sn').should('have.length', 1)

        //Check Validation Last Name
        cy.get('#lastName').type('Yudis');
        cy.get('#cityAndProvince').focus();
        cy.get('.m-t-4.error_rz3sn').should('have.length', 1)

        //Check Validation Province 
        cy.get('#lastName').focus();
        cy.get('.m-t-4.error_rz3sn').each(($ele,index) => {
            if(index == 0){
                cy.wrap($ele).should('have.text','Kabupaten/Kota tidak tersedia di dalam pilihan yang ada')
            }
        })
        cy.get('#cityAndProvince').type('KOTA BOGOR');
        cy.get('.autocomplete__list-item_fTFLC').first().click();
        cy.get('#lastName').focus();
        cy.get('.m-t-4.error_rz3sn').should('have.length',0);
        
    })

    it('Check checkbox T&C', () => {
        cy.get('input.TermsAndConditions_checkbox__input__hOK6h').uncheck({force:true});
        cy.get('.m-t-4.error_rz3sn.m-t-8.text-bold').should('have.text','Anda harus menyetujui Syarat dan Ketentuan serta Kebijakan Privasi Cermati.com.')
    })

    it('Check button daftar when data empty', () => {
        cy.title().should('eq','Cermati Masuk')
        cy.get('.RegistrationForm_form-container__button__rqOgr').click();
        cy.get('.m-t-4.error_rz3sn').should('have.length', 7)
        
    })

    it('Check link ', () => {
        cy.get('.btn_SGZcZ.btn--link_iMrB4.m-0.p-0').first().click()
        cy.location('pathname').should('eq', '/pages/terms-and-conditions')
        cy.go('back');
        cy.get('.btn_SGZcZ.btn--link_iMrB4.m-0.p-0').last().click()
        cy.location('pathname').should('eq', '/pages/privacy-policy')
        cy.go('back');
        cy.get('.RegistrationForm_form-container__footer__k6wKc').children('.btn-track').click();
        cy.location('pathname').should('eq', '/app/login')
    })

    it('Check happy path',() => {
       cy.get('#email').type('KJJ@gmail.com');
       cy.get('#mobilePhone').type('0895332176476');
       cy.get('#password').type('ZXasqw12!@');
       cy.get('#confirmPassword').type('ZXasqw12!@');
       cy.get('#firstName').type('Nyoman');
       cy.get('#lastName').type('Yudis');
       cy.get('#cityAndProvince').type('Bogor');
       cy.get('#cityAndProvince').focus();
       cy.get('.autocomplete__list-item_fTFLC').first().click();
       cy.get('.RegistrationForm_form-container__button__rqOgr').click();
       cy.location('pathname').should('eq', '/app/verification-methods')
    })

  })
  