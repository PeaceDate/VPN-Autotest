export interface DataCaseInterface {
    fixture_data: any;
    dataProvider: any;
}
export interface FixtureInterface {
    type: string;
    route?: string;
    alias: string;
    response: string;
    url?: string;
}
export declare function loadTemplate(): void;
export declare function loadTemplateByPackage(packageName: any): void;
export declare function preparationFixtures(data: any, testCase: string, tempateFixture?: any): void;
/**
 * Метод для подгрузки фикстур.
 * @param data обьект содержащщий в себе необходимые фикстуры для теста
 * @param testCase необязательный параметр, принимает на вход строку которая описывает
 * @param templateFx необязательный параметр, поидее переопределяет место хранение шаблонов проектоа
 * название конкретного кейса внутри объекта data
 * @example
 * loadFixtures(data)
 *
 * Такой вызов подгрузит все фикстуры из fixtures/template/requried а также
 * фикстуры из кейса require внутри обьекта 'data'
 * @example
 * loadFixtures(data, 'testCase')
 *
 * Такой вызов подгрузит все фикстуры из fixtures/template/requried а также
 * фикстуры из кейса require внутри обьекта data и кейса 'testCase'
 */
export declare function loadFixtures(data: any, testCase?: any, templateFx?: any): void;
export declare function getDataForCase(data: object, testCase: string): any;
export declare function singleFixture(names: string[], testCase: DataCaseInterface): void;
