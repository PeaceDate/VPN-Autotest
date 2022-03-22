import { getDataForCase, loadFixtures } from "../../helper/cypress-test-helper/src/TestHelper";
import { autorization } from "../page_object/AutorizationArea/AutorizationArea";
import { payment } from "../page_object/PaymentArea/PaymentArea";
import { user_flow_data } from "./data_user_flow";

describe ('Check user flow', (testData = getDataForCase(user_flow_data, 'require')) => {

    before(() => {
        autorization.openAutorizationPage(testData.url);
        cy.intercept('POST', '**/order/create').as('ORDER_CREATE');
    })

    it('Check login and payment', () => {
        loadFixtures(user_flow_data)
        autorization
            .clickGetIronVpnButton(':first()')
            .fillEmailInput(testData.email)
            .clickPrivacyPolicyCheckbox()
            .sendForm()
            .checkRequest('ORDER_CREATE', testData.autorization_requestParam) //Базовая проверка request, в идеале использовать is-my-valid-json но нужно помучатся с прикручиванием
            .checkUrl(testData.new_url);
        payment.clickGetIronVpnButton(':first()')
            .fillCardNumberField(testData.cardNumber)
            .fillDateField(testData.date)
            .fillCvvField(testData.cvv)
            .checkPayButton(true)
            .clickPayButton()
            .checkUrl(testData.newUrl);
    });
    
});