/// <reference types="cypress"/>

/**
 * Модуль для загрузки фикстур, и мержа фикстур с шаблоном
 */
// @ts-ignore
import {requiredFixture} from '../../../fixtures/template/requried';
import * as _ from 'lodash';

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

function route_intercept(item:any){
    cy.intercept({
            method: item.type,
            path: item.route
        }
        , {
            body: item.response
        }).as(item.alias)
}

function url_intercept(item:any){
    cy.intercept({
            method: item.type,
            url: item.url
        }
        , {
            body: item.response
        }).as(item.alias)
}


let showLog = false;

export function loadTemplate() {
    showLog ? console.log("start test helper") : null;

    const template: FixtureInterface[] = Object.values(requiredFixture);

    template.forEach(item => {
            if (item.url == undefined) {
                route_intercept(item)
            } else {
                url_intercept(item)
            }
        }
    );
}

export function loadTemplateByPackage(packageName: any) {
    const template: FixtureInterface[] = Object.values(packageName);
    if (template == undefined) throw "Template " + packageName + " not found";

    template.forEach(item => {
        if (item.url == undefined) {
            route_intercept(item)
        } else {
            url_intercept(item)
        }
    });
}

export function preparationFixtures(data: any, testCase: string, tempateFixture?: any) {

    if (tempateFixture == undefined)
        tempateFixture = requiredFixture;

    showLog ? console.log(data) : null;

    let customFixture: FixtureInterface;

    let obj = Object.getOwnPropertyDescriptor(data, testCase);

    if (obj == undefined)
        throw  "Fixtures for " + testCase + " not found";
    else
        customFixture = obj.value.fixture_data;

    const mergedFixture: FixtureInterface[] = Object.values(_.merge(tempateFixture, customFixture));

    showLog ? console.log(customFixture) : null;
    showLog ? console.log(mergedFixture) : null;

    mergedFixture.forEach(item => {
        console.log(item);
        if (item.url == undefined) {
            route_intercept(item)
        } else {
            url_intercept(item)
        }
    });
}

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
export function loadFixtures(data: any, testCase?: any, templateFx?: any) {

    showLog ? console.log(data) : null;

    const require = Object.getOwnPropertyDescriptor(data, 'require');
    let mergedFx: FixtureInterface[];
    let mergeTestFx;

    if (templateFx == undefined)
        templateFx = requiredFixture;

    // определяем фикстуры для тест кейса
    let obj = Object.getOwnPropertyDescriptor(data, testCase);
    if (testCase)
        if (obj == undefined)
            throw  "Fixtures for " + testCase + " not found";
        else
            mergeTestFx = obj.value.fixture_data;

    // если у фичи есть свой наобор необходимых фикстур то мерджим в единый обьект фикстуры тест кейса и и фикстуры фифи
    if (require) {
        const reqFx: FixtureInterface = require.value.fixture_data;
        mergeTestFx = Object.values(_.merge(reqFx, mergeTestFx));
    }

    // мерджим фикстуры из шаблона и фикстурами из фичи и кейса
    mergedFx = Object.values(_.merge(templateFx, mergeTestFx));

    showLog ? console.log(mergedFx) : null;

    mergedFx.forEach(item => {
        showLog ? console.log(item) : null;
        cy.intercept({
            method: item.type,
            path: item.route
        }, {
            body: item.response
        }).as(item.alias);

    });
}

export function getDataForCase(data: object, testCase: string) {
    let obj = Object.getOwnPropertyDescriptor(data, testCase);
    if (obj == undefined)
        throw  "DataProvider for " + testCase + " not found";
    else
        return obj.value.dataProvider;
}

export function singleFixture(names: string[], testCase: DataCaseInterface) {

    if (names.length == 0) {
        names = Object.keys(testCase.fixture_data);
    }

    names.forEach(name => {
        let fx: FixtureInterface;
        const obj = Object.getOwnPropertyDescriptor(testCase.fixture_data, name);
        if (obj != undefined) {
            fx = obj.value;
            cy.intercept({
                method: fx.type,
                path: fx.route
            }, {
                body: fx.response
            }).as(fx.alias)
        } else {
            throw "Фикстура " + name + " не найдена";
        }

    });
}

