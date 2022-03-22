import { getDataForCase, loadFixtures } from '../../helper/cypress-test-helper/src/TestHelper';
import { payment } from '../page_object/PaymentArea/PaymentArea';
import { payment_data } from './payment_data';

describe ('Check payment page (positive)', (testData = getDataForCase(payment_data, 'require')) => {

    beforeEach(() => {
        loadFixtures(payment_data)
        payment.openPaymentPage(testData.params)
    })

    it ('Check Get Iron VPN primary button', () => {
        payment.checkGetIronVpnButton(':first()');
    })

    it ('Check Get Iron VPN secondary button', () => {
        payment.checkGetIronVpnButton(':last()');
    })

    it('Check payment popup (primary button)', () => {
        payment
            .clickGetIronVpnButton(':first()')
            .checkPaymentPopup(true);
    })

    it('Check payment popup (secondary button)', () => {
        payment
            .clickGetIronVpnButton(':last()')
            .checkPaymentPopup(true);
    })

    it('Check close payment popup', () => {
        payment
            .clickGetIronVpnButton(':first()')
            .closePaymentPopup()
            .checkPaymentPopup(false);
    })
})
