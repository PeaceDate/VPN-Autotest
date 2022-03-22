import { getDataForCase, loadFixtures } from '../../helper/cypress-test-helper/src/TestHelper';
import { autorization } from '../page_object/AutorizationArea/AutorizationArea';
import { autorization_data } from './autorization_data_positive';

describe ('Check autorization page (positive)', (testData = getDataForCase(autorization_data, 'require')) => {

    beforeEach(() => {
        loadFixtures(autorization_data);
        autorization.openAutorizationPage(testData.params)
    })

    it ('Check Get Iron VPN primary button', () => {
        autorization.checkGetIronVpnButton(':first()');
    })

    it ('Check Get Iron VPN secondary button', () => {
        autorization.checkGetIronVpnButton(':last()');
    })

    it('Check Get Iron VPN popup (primary button)', () => {
        autorization
            .clickGetIronVpnButton(':first()')
            .checkGetIronVpnPopup(true);
    })

    it('Check Get Iron VPN popup (secondary button)', () => {
        autorization
            .clickGetIronVpnButton(':last()')
            .checkGetIronVpnPopup(true);
    })

    it('Check close Get Iron VPN popup', () => {
        autorization
            .clickGetIronVpnButton(':first()')
            .closeGetIronVpnPopup()
            .checkGetIronVpnPopup(false);
    })

    it ('Check value from select', () => {
        autorization
            .clickGetIronVpnButton(':first()')
            .clickEmailInput()
            .selectElement(testData.selectValue);
    })
})
