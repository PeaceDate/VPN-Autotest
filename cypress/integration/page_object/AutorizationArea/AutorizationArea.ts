import { common } from "../Common/Common";
import { mapping_autorization } from "./mapping_autorization";

/**
 * Класс с методами которые относятся только к странице авторизации и выполняют на ней какие то действия
 */

export class AutorizationArea {

    /**
     * Методод для перехода на страницу Авторизации
     * @param {string} page - принимает параметры URL страницы на которю выполняется переход (от базового URL указаного в файле сypress.json)
     * @example openAutorizationPage('start_page.html')
     */
    openAutorizationPage(page) {
        common.open_page(page)
        return this;
    }
    /**
     * Метод для проверки наличия кнопки Get Iron VPN на странице (как показала практика его сожно вінести в комоновский метод так как конкретно эта кнопка повторяется сквозняком по приложению)
     * @param {boolean} state - Флаг для условия, если true то елемент должен быть на странице и видим, если false елемента нет. (по умолчанию true)
     * @param {string} num - номер элемента для проверки (Да костыль, но решается добавлением дата меток на страницы (мяч на стороне разработчика))
     * @example checkGetIronVpnButton(:first(), true / false)
     */
    checkGetIronVpnButton (num?: string, state?: boolean) {
        common.chekElementExist(mapping_autorization.buttons.getIronVpnButton + num, state);
        return this;
    }
    /**
     * Метод для клика на кнопку Get Iron VPN (как показала практика его сожно вінести в комоновский метод так как конкретно эта кнопка повторяется сквозняком по приложению)
     * @param {string} num - номер элемента для проверки (Да костыль, но решается добавлением дата меток на страницы (мяч на стороне разработчика))
     * @example clickGetIronVpnButton(':first()');
     */
    clickGetIronVpnButton (num?: string) {
        common.simpleCLick(mapping_autorization.buttons.getIronVpnButton + num);
        return this;
    }
    /**
     * Метод проверки надичия попапа Get Iron Vpn на странице
     * @param {boolean} state - Флаг для условия, если true то елемент должен быть на странице и видим, если false елемента нет. (по умолчанию true)
     * @example checkGetIronVpnPopup(true);
     */
    checkGetIronVpnPopup (state?: boolean) {
        common.chekElementExist(mapping_autorization.popups.getIronVpnPopup, state);
        return this;
    }
    /**
     * Метод для закрытия попапа Get Iron Vpn
     * @example closeGetIronVpnPopup();
     */
    closeGetIronVpnPopup () {
        common.simpleCLick(mapping_autorization.buttons.closePopupButton);
        return this;
    }
    /**
     * Метод для клика на поле Email в попапе Авторизации
     * @example clickEmailInput();
     */
    clickEmailInput () {
        common.simpleCLick(mapping_autorization.inputs.email);
        return this;
    }
    /**
     * Метод для заполнения поля Email
     * @param {string} text 
     * @example fillEmailInput('Test message);
     */
    fillEmailInput (text: string) {
        common.fillField(mapping_autorization.inputs.email, text);
        return this;
    }
    /**
     * Метод для клика на чекбокс Privacy policy
     * @example clickPrivacyPolicyCheckbox();
     */
    clickPrivacyPolicyCheckbox () {
        common.simpleCLick(mapping_autorization.checkboxes.privacyPolicy);
        return this;
    }
    /**
     * Метод для клика на кнопку откравки формы
     * @example clickSubmitFormButton();
     */
    clickSubmitFormButton () {
        common.simpleCLick(mapping_autorization.buttons.submitFormButton);
        return this;
    }
    /**
     * Метод для отпраки формы типа form
     * @example sendForm();
     */
    sendForm () {
        common.sendForm(mapping_autorization.forms.emailForm);
        return this;
    }
    /**
     * Метод для проверки URL 
     * @param {string} expect_url - ожедаемый URL
     * @param {boolean} state - Флаг для условия, если true то URL изменился и видим, если false то нет. (по умолчанию true / необязательный параметр)
     * @example checkUrl('https://google.com.ua')
     */
    checkUrl (expect_url: string, state?: boolean) {
        common.checkUrl(expect_url, state);
        return this;
    }
    /**
     * Метод для селекта елемента из поля типа select
     * @param {string} text - текст для клика на елемент (точнее для того что бы найти елемент по такому тексту)
     * @example selectElement('Select value')
     */
    selectElement (text: string) {
        common.fillSelect(mapping_autorization.inputs.email, text)
            
        return this;
    }
    /**
     * Метод для проверки отправки пустого поля Email (его валидации и подсветки)
     * @param {string} color - цвет подсветки поля
     * @param {boolean} highlited - булеевій параметр (подсвеченно true или нет false)
     * @example checkEmptyFieldEmailSend('rgb(250, 172, 172)', true)
     */
    checkEmptyFieldEmailSend (color: string, highlited: boolean) {
        common.checkEmptyFieldHighlight(mapping_autorization.elements.privacyText, color, highlited)
    }
    /**
     * Метод для проверки появления снекбара об ошибке
     * @param {string} text - Текст снекбара
     * @example checkEmailSnackbar('Error')
     */
    checkEmailSnackbar (text: string) {
        common.checkSnackbar(mapping_autorization.elements.emailValidationResult, text)
        return this;
    }
    /**
     * Метод для проверки поля Email (его валидации и подсветки)
     * @param {string} color - цвет подсветки поля
     * @param {boolean} highlited - булеевій параметр (подсвеченно true или нет false)
     * @example checkEmailValidation('rgb(250, 172, 172)', true)
     */
    checkEmailValidation (color: string, highlited: boolean) {
        common.checkEmptyFieldHighlight(mapping_autorization.elements.emailValidationResult, color, highlited);
        return this;
    }
    /**
     * Метод для проверки реквеста 
     * @param {string} alias - алиас замокированого запроса
     * @param {string} expected - ожидаемое боди запроса
     * @example checkRequest('CREATE', 'test@test.com')
     */
    checkRequest(alias: string, expected: string) {
        common.checkRequest(alias, expected)
        return this;
	}
    /**
     * Метод для проверки ответа
     * @param {string} alias - алиас замокированого запроса
     * @param {number} status - статус ответа
     * @param {string} expected - ожидаемое боди ответа
     * @example 
     */
    checkResponse(alias: string, status: Number, expected: string) {
		common.checkResponse(alias, status, expected)
		return this;
	}

};
export const autorization = new AutorizationArea();