export const autorization_data = {
    require: {
        fixture_data: {
            create: {
                type: 'POST',
                route: '**/order/create',
                response: require('./customfixture/order_create.json'),
                alias: 'ORDER_CREATE'
            }
        },
        dataProvider: {
            alias: 'ORDER_CREATE',
            params: '?source=test',
            new_url: 'https://ironvpn.me/processing.html?source=test',
            email: 'qa@test.com',
            selectValue: '@gmail.com',
            snackbarText: 'Enter your email please',
            requestParam: 'qa%40test.com',
        }
    }
}