import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_page from "../locators/recovery_password_page.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/'); // зашли на сайт 
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); //проверяю цвет кнопки(забыл пароль)
    });
    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible');// есть крестик и он виден пользователю
       });

    it('Верный пароль и верный логин', function () {
         cy.get(main_page.email).type(data.login); // ввели правильный логин
         cy.get(main_page.password).type(data.password);//ввели верный пароль
         cy.get(main_page.login_button).click();//нажала войти

         cy.get(result_page.title).contains('Авторизация прошла успешно');//проверяю, что после авт. вижу текст
         cy.get(result_page.title).should('be.visible');// есть текст и он виден пользователю
     })

     it('Проверка восстановление пароля', function () {
        cy.get(main_page.fogot_pass_btn).click();//нажала восстановить пароль

        cy.get(recovery_page.email).type(data.login); // ввели почту для восстановления
        cy.get(recovery_page.send_button).click();//нажала отправить код

        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');//проверяю, что вижу текст
        cy.get(result_page.title).should('be.visible');// есть текст и он виден пользователю
    })

    it('НЕ_верный пароль и верный логин', function () {
        cy.get(main_page.email).type(data.login); // ввели правильный логин
        cy.get(main_page.password).type('iLoveqastudio7');//ввели НЕверный пароль
        cy.get(main_page.login_button).click();//нажала войти

        cy.get(result_page.title).contains('Такого логина или пароля нет');//проверяю, что вижу текст
        cy.get(result_page.title).should('be.visible');// есть текст и он виден пользователю
    })

    it('Верный пароль и НЕ_верный логин', function () {
        cy.get(main_page.email).type('german@dolnikov34.ru'); // ввели НЕправильный логин
        cy.get(main_page.password).type(data.password);//ввели верный пароль
        cy.get(main_page.login_button).click();//нажала войти

        cy.get(result_page.title).contains('Такого логина или пароля нет');//проверяю, что вижу текст
        cy.get(result_page.title).should('be.visible');// есть текст и он виден пользователю
    })

    it('Проверка валидации логина без @', function () {
        cy.get(main_page.email).type('germandolnikov.ru'); // ввели логин без @
        cy.get(main_page.password).type(data.password);//ввели верный пароль
        cy.get(main_page.login_button).click();//нажала войти

        cy.get(result_page.title).contains('Нужно исправить проблему валидации');//проверяю, что после авт. вижу текст
        cy.get(result_page.title).should('be.visible');// есть текст и он виден пользователю
    })

    it('Проверка на приведение к строчным буквам в логине', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // ввели логин с заглавными
        cy.get(main_page.password).type(data.password);//ввели верный пароль
        cy.get(main_page.login_button).click();//нажала войти

        cy.get(result_page.title).contains('Авторизация прошла успешно');//проверяю, что после авт. вижу текст
        cy.get(result_page.title).should('be.visible');// есть текст и он виден пользователю
    })
 })
