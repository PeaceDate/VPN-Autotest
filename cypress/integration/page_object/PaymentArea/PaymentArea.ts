import "cypress-iframe";
import { common } from "../Common/Common"
import { mapping_payment } from "./mapping_payment";

/**
 * Класс с методами которые относятся только к странице пеймента и выполняют на ней какие то действия  
 */

export class Payment {
    /**
     * Методод для перехода на страницу Пеймент
     * @param {string} page - принимает параметры URL страницы на которю выполняется переход (от базового URL указаного в файле сypress.json)
     * @example openPaymentPage('start_page.html');
     */
    openPaymentPage (page: string) {
        common.open_page(page);
        return this;
    }
    /**
     * Метод для проверки наличия кнопки Get Iron VPN на странице (как показала практика его сожно вінести в комоновский метод так как конкретно эта кнопка повторяется сквозняком по приложению)
     * @param {boolean} state - Флаг для условия, если true то елемент должен быть на странице и видим, если false елемента нет. (по умолчанию true / необязательный параметр)
     * @param {string} num - номер элемента для проверки (Да костыль, но решается добавлением дата меток на страницы (мяч на стороне разработчика))
     * @example checkGetIronVpnButton(':first()');
     */
    checkGetIronVpnButton (num: string, state?: boolean) {
        common.chekElementExist(mapping_payment.buttons.getIronVpnButton + num, state);
        return this;
    }
    /**
     * Метод для клика на кнопку Get Iron VPN (как показала практика его сожно вінести в комоновский метод так как конкретно эта кнопка повторяется сквозняком по приложению)
     * @param {string} num - номер элемента для проверки (Да костыль, но решается добавлением дата меток на страницы (мяч на стороне разработчика))
     * @example clickGetIronVpnButton(':first()');
     */
    clickGetIronVpnButton (num: string) {
        common.simpleCLick(mapping_payment.buttons.getIronVpnButton + num);
        cy.get(mapping_payment.elements.iframe).should('be.visible');
        return this;
    }
    /**
     * Метод проверки надичия попапа Payment на странице
     * @param {boolean} state - Флаг для условия, если true то елемент должен быть на странице и видим, если false елемента нет. (по умолчанию true)
     * @example checkPaymentPopup(true);
     */
    checkPaymentPopup (state: boolean) {
        if(state === true) {
            common.chekElementExist(mapping_payment.popups.getIronVpnPopup, state);
            cy.get(mapping_payment.elements.iframe).should('be.visible');
        } else {
            common.chekElementExist(mapping_payment.popups.getIronVpnPopup, state);
        }
        return this;
    }
    /**
     * Метод для закрытия попапа Payment
     * @example closePaymentPopup();
     */
    closePaymentPopup () {
        common.simpleCLick(mapping_payment.buttons.closePopupButton + ':last()');
        return this;
    }
    /**
     * Метод для заполнения поля card number данными
     * @param {string} text - текст для заполнения
     * @example fillCardNumberField('Test Message);
     */
    fillCardNumberField (text: string) {
        common.fillIframeField(mapping_payment.inputs.cardNumber, text);
        return this;
    }
    /**
     * Метод для заполнения поля date данными
     * @param {string} text - текст для заполнения 
     * @example fillDateField('Test Message);
     */
    fillDateField (text: string) {
        common.fillIframeField(mapping_payment.inputs.date, text);
        return this;
    }
    /**
     * Метод для заполнения cvv данными
     * @param {string} text - текст для заполнения 
     * @example fillCvvField('Test message');
     */
    fillCvvField(text: string) {
        common.fillIframeField(mapping_payment.inputs.cvv, text);
        return this;
    }
    /**
     * Мтод для проверки надичия кнопки Pay
     * @param {boolean} state - Флаг для условия, если true то елемент должен быть на странице и видим, если false елемента нет. (по умолчанию true / необязательный параметр)
     * @example checkPayButton(true);
     */
    checkPayButton(state: boolean) {
        common.checkExistenceIfameElement(mapping_payment.buttons.payButton);
        return this;
    }
    /**
     * Метод для клика на кнопку Pay
     * @example clickPayButton();
     */
    clickPayButton () {
        common.simpleClickIframe(mapping_payment.buttons.payButton);
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
     * Метод проверки CSS свойств елемента Сard number
     * @param {string} property - совойство СSS (пример: color) 
     * @param {string} value  - значение свойства (rgb(255, 255, 255))
     * @example checkCardnuberFieldProperty('color', 'rgb(255, 255, 255)');
     */
    checkCardnuberFieldProperty(property: string, value: string) {
        common
            .simpleClickIframe(mapping_payment.buttons.payButton)
            .checkElementPropertyIframe(mapping_payment.inputs.cardNumber, property, value);
        return this;
    }
    /**
     * Метод проверки сообщения об ошибке. Проверяет наличие ошибки и ее текст
     * @param {string} text - текст для провеки ошибки 
     * @example checkErrorMessage('Error message);
     */
    checkErrorMessage (text: string) {
        common
            .checkExistenceIfameElement(mapping_payment.elements.error_text)
            .checkElementTextIframe(mapping_payment.elements.error_text, text);
            return this;
    }
    /**
     * Метод проверки CSS свойств елемента Date
     * @param {string} property - совойство СSS (пример: color) 
     * @param {string} value  - значение свойства (rgb(255, 255, 255))
     * @example checkDateFieldProperty('color', 'rgb(255, 255, 255)');
     */
    checkDateFieldProperty (property: string, value: string) {
        common
            .simpleClickIframe(mapping_payment.buttons.payButton)
            .checkElementPropertyIframe(mapping_payment.inputs.date, property, value);
        return this;
    }
    /**
     * Метод проверки CSS свойств елемента Cvv
     * @param {string} property - совойство СSS (пример: color) 
     * @param {string} value  - значение свойства (rgb(255, 255, 255))
     * @example checkCvvFieldProperty('color', 'rgb(255, 255, 255)');
     */
    checkCvvFieldProperty (property: string, value: string) {
        common
            .simpleClickIframe(mapping_payment.buttons.payButton)
            .checkElementPropertyIframe(mapping_payment.inputs.cvv, property, value);
        return this;
    }
    /**
     * Метод для проверки СSS свойст всех елементов в попапе Payment
     * @param {string} property - совойство СSS (пример: color) 
     * @param {string} value  - значение свойства (rgb(255, 255, 255))
     * @example checkPaymentFieldsProperty('color', 'rgb(255, 255, 255)');
     */
    checkPaymentFieldsProperty (property, value) {
        common.typeEnterIframe(mapping_payment.inputs.cardNumber)
            .checkElementPropertyIframe(mapping_payment.inputs.cardNumber, property, value)
            .checkElementPropertyIframe(mapping_payment.inputs.date, property, value)
            .checkElementPropertyIframe(mapping_payment.inputs.cvv, property, value);
        return this;
    }
}
export const payment = new Payment()