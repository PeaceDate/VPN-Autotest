"use strict";
/// <reference types="cypress"/>
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.singleFixture = exports.getDataForCase = exports.loadFixtures = exports.preparationFixtures = exports.loadTemplateByPackage = exports.loadTemplate = void 0;
/**
 * Модуль для загрузки фикстур, и мержа фикстур с шаблоном
 */
// @ts-ignore
const requried_1 = require("../../../cypress/fixtures/template/requried");
const _ = __importStar(require("lodash"));
function route_intercept(item) {
    cy.intercept({
        method: item.type,
        path: item.route
    }, {
        body: item.response
    }).as(item.alias);
}
function url_intercept(item) {
    cy.intercept({
        method: item.type,
        url: item.url
    }, {
        body: item.response
    }).as(item.alias);
}
let showLog = false;
function loadTemplate() {
    showLog ? console.log("start test helper") : null;
    const template = Object.values(requried_1.requiredFixture);
    template.forEach(item => {
        if (item.url == undefined) {
            route_intercept(item);
        }
        else {
            url_intercept(item);
        }
    });
}
exports.loadTemplate = loadTemplate;
function loadTemplateByPackage(packageName) {
    const template = Object.values(packageName);
    if (template == undefined)
        throw "Template " + packageName + " not found";
    template.forEach(item => {
        if (item.url == undefined) {
            route_intercept(item);
        }
        else {
            url_intercept(item);
        }
    });
}
exports.loadTemplateByPackage = loadTemplateByPackage;
function preparationFixtures(data, testCase, tempateFixture) {
    if (tempateFixture == undefined)
        tempateFixture = requried_1.requiredFixture;
    showLog ? console.log(data) : null;
    let customFixture;
    let obj = Object.getOwnPropertyDescriptor(data, testCase);
    if (obj == undefined)
        throw "Fixtures for " + testCase + " not found";
    else
        customFixture = obj.value.fixture_data;
    const mergedFixture = Object.values(_.merge(tempateFixture, customFixture));
    showLog ? console.log(customFixture) : null;
    showLog ? console.log(mergedFixture) : null;
    mergedFixture.forEach(item => {
        console.log(item);
        if (item.url == undefined) {
            route_intercept(item);
        }
        else {
            url_intercept(item);
        }
    });
}
exports.preparationFixtures = preparationFixtures;
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
function loadFixtures(data, testCase, templateFx) {
    showLog ? console.log(data) : null;
    const require = Object.getOwnPropertyDescriptor(data, 'require');
    let mergedFx;
    let mergeTestFx;
    if (templateFx == undefined)
        templateFx = requried_1.requiredFixture;
    // определяем фикстуры для тест кейса
    let obj = Object.getOwnPropertyDescriptor(data, testCase);
    if (testCase)
        if (obj == undefined)
            throw "Fixtures for " + testCase + " not found";
        else
            mergeTestFx = obj.value.fixture_data;
    // если у фичи есть свой наобор необходимых фикстур то мерджим в единый обьект фикстуры тест кейса и и фикстуры фифи
    if (require) {
        const reqFx = require.value.fixture_data;
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
exports.loadFixtures = loadFixtures;
function getDataForCase(data, testCase) {
    let obj = Object.getOwnPropertyDescriptor(data, testCase);
    if (obj == undefined)
        throw "DataProvider for " + testCase + " not found";
    else
        return obj.value.dataProvider;
}
exports.getDataForCase = getDataForCase;
function singleFixture(names, testCase) {
    if (names.length == 0) {
        names = Object.keys(testCase.fixture_data);
    }
    names.forEach(name => {
        let fx;
        const obj = Object.getOwnPropertyDescriptor(testCase.fixture_data, name);
        if (obj != undefined) {
            fx = obj.value;
            cy.intercept({
                method: fx.type,
                path: fx.route
            }, {
                body: fx.response
            }).as(fx.alias);
        }
        else {
            throw "Фикстура " + name + " не найдена";
        }
    });
}
exports.singleFixture = singleFixture;
//# sourceMappingURL=TestHelper.js.map