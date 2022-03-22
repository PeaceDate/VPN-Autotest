import { getDataForCase, loadFixtures } from '../../helper/cypress-test-helper/src/TestHelper';
import { autorization } from '../page_object/AutorizationArea/AutorizationArea';
import { autorization_data } from './autorization_data_negative';

describe ('Check autorization page (nagative)', (testData = getDataForCase(autorization_data, 'require')) => {

    beforeEach(() => {
        loadFixtures(autorization_data);
        autorization.openAutorizationPage(testData.params)
    })

    it ('Check empty field email', () => {
        autorization
            .clickGetIronVpnButton(':first()')
            .clickSubmitFormButton()
            .checkEmptyFieldEmailSend(testData.colors.p, true);
    })

    it ('Check empty field email (checked checkbox)', () => {
        autorization
            .clickGetIronVpnButton(':first()')
            .clickPrivacyPolicyCheckbox()
            .clickSubmitFormButton()
            .checkUrl(testData.new_url, false)
            .checkResponse(testData.alias, 200, testData.response);
            //Тут еще должны быть провеки на валидации, но у вас в приложении их нет :(
    })

    testData.inlalidEmails.forEach(email => {
        it ('Check email field validation' + ' ' + email, () => {
            autorization
                .clickGetIronVpnButton(':first()')
                .fillEmailInput(email)
                .checkEmailSnackbar(testData.snackbarText)
                .checkEmailValidation(testData.colors.result, true);
        })
    });
})
