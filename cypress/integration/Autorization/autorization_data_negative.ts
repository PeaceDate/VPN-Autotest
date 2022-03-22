export const autorization_data = {
    require: {
        fixture_data: {
            create: {
                type: 'POST',
                route: '**/order/create',
                response: require('./customfixture/order_create_negative.json'),
                alias: 'ORDER_CREATE_NEGATIVE'
            }
        },
        dataProvider: {
            alias: 'ORDER_CREATE_NEGATIVE',
            params: '?source=test',
            colors: {
                p: 'rgb(250, 172, 172)',
                result: 'rgb(255, 0, 0)'
            },
            inlalidEmails: ['test', 'test@@test.com', 'test@test..com', 'test@test.@com', 'test.@test.com', 'test@test.com..' ], //Емейлы перебираются переборов и под каждый случай создается отдельный тест, по поводу тестовых данных, взял на рандомно. 
            response: 'fail'
        }
    }
}