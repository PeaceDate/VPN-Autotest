export const payment_data = {
    require: {
        fixture_data: {
            v2: {
                type: 'POST',
                route: '**/payment/form/v2',
                response: require('./customFixture/v2.json'),
                alias: 'V2'
            },
            init_payment: {
                type: 'POST',
                route: '**/init-payment',
                response: require('./customFixture/init_payment.json'),
                alias: 'INIT_PAYMENT'
            }
            
        },
        dataProvider: {
            params: 'processing.html?source=test',
            cards: [
                { number: '11111111111', error_message: 'iPlease, check card numberiPlease, check card number'},
                { number: '23424', error_message: 'iCard number should be between 12 and 19 charactersiCard number should be between 12 and 19 characters'}],
            dates: [
                { number:'01/2021', error_message: 'iYou entered an expiration date that has already passediYou entered an expiration date that has already passed'},
                { number: '01/2073', error_message: 'iPlease, enter a valid expiry date of your cardiPlease, enter a valid expiry date of your card'},
                { number: '01/', error_message: 'iPlease, enter expiry date of your cardiPlease, enter expiry date of your card'}
            ],
            cvv: {number: '1', error_message: 'iPlease, enter 3 digit card security codeiPlease, enter 3 digit card security code'},
            property: 'border-color',
            value: 'rgb(228, 97, 97)',
            fieldsErrorMessage: 'iEnter your card number to complete the paymentiEnter a card expiration date to complete the paymentiPlease, enter 3 digit card security codeiEnter your card number to complete the paymentiEnter a card expiration date to complete the paymentiPlease, enter 3 digit card security code'
        }
    }
}