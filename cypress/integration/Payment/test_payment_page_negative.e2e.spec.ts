import { getDataForCase, loadFixtures } from '../../helper/cypress-test-helper/src/TestHelper';
import { payment } from '../page_object/PaymentArea/PaymentArea';
import { payment_data } from './payment_data';

describe ('Check payment page (negative)', (testData = getDataForCase(payment_data, 'require')) => {

    beforeEach(() => {
        loadFixtures(payment_data)
        payment.openPaymentPage(testData.params)
    })

    it('Check empty fields validation', () => {
        payment.clickGetIronVpnButton(':first()')
            .checkPaymentFieldsProperty(testData.property, testData.value)
            .checkErrorMessage(testData.fieldsErrorMessage);
    })

    testData.cards.forEach(card => {
        it('Check card number field validation' + ' Card number: ' + card.number, () => {
            payment.clickGetIronVpnButton(':first()')
                .fillCardNumberField(card.number)
                .checkCardnuberFieldProperty(testData.property, testData.value)
                .checkErrorMessage(card.error_message);
        }) 
    });

    testData.dates.forEach(date => {
        it('Check data field validation' + ' Date: ' + date.number, () => {
            payment.clickGetIronVpnButton(':first()')
                .fillDateField(date.number)
                .checkDateFieldProperty(testData.property, testData.value)
                .checkErrorMessage(date.error_message);
        }) 
    });

    it('Check cvv validation', () => {
        payment.clickGetIronVpnButton(':first()')
            .fillCvvField(testData.cvv.number)
            .checkCvvFieldProperty(testData.property, testData.value)
            .checkErrorMessage(testData.cvv.error_message);

    })
})
