let { Builder, By, until } = require('selenium-webdriver');
let assert = require('assert');
let firefox = require('selenium-webdriver/firefox'); // Променяме за Firefox
let { localHost, CUSTOMER_LOGIN, LEFT_MENU, FOOTER_MENU, ONLINE_SERVICES, ATM_SERVICES, READ_MORE } = require('../locators.js');

describe('ParaBank Visibility and Clickability Tests', function () {
    // Настройваме таймаута за целия тестов набор
    this.timeout(60000);

    let driver;

    before(async function () {
        try {
            console.log('Setting up WebDriver...');
            let options = new firefox.Options(); // Опции за конфигуриране на Firefox

            // Задаваме допълнителни опции, ако е необходимо (например, headless)
            // options.addArguments('--headless'); // За да стартира браузъра без графичен интерфейс

            driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build(); // Използваме Firefox с опциите
            console.log('WebDriver setup complete.');
        } catch (error) {
            console.error('Error during WebDriver setup:', error);
            throw error; // Прекратява изпълнението, ако драйвърът не може да бъде създаден
        }
    });

    after(async function () {
        if (driver) {
            await driver.quit();
        }
    });

    it('should open the ParaBank homepage and check the title', async function () {
        await driver.get(localHost); // Зарежда страницата с друг метод
        const title = await driver.getTitle(); // Получава заглавието на страницата
        assert.strictEqual(title, 'ParaBank | Welcome | Online Banking'); // Проверява дали заглавието е вярно
    });

    it('should display and click customer login elements', async function () {
        for (const locator in CUSTOMER_LOGIN) {
            const element = await driver.findElement(CUSTOMER_LOGIN[locator]);
            assert(await element.isDisplayed(), `${locator} is not displayed`);
        }
    });

    it('should display and click elements in the left menu', async function () {
        for (const locator in LEFT_MENU) {
            await driver.get(localHost);
            const element = await driver.wait(until.elementLocated(LEFT_MENU[locator]), 30000);
            await driver.wait(until.elementIsVisible(element), 30000);

            // Проверете дали елементът е видим
            assert(await element.isDisplayed(), `${locator} is not displayed`);

            let currentUrl = await driver.getCurrentUrl();

            // Кликваме върху елемента
            await element.click();

            // Изчакваме промяна на URL
            await driver.wait(async function() {
                let newUrl = await driver.getCurrentUrl();
                return newUrl !== currentUrl;
            }, 30000);

            const newUrl = await driver.getCurrentUrl();
            assert.notStrictEqual(currentUrl, newUrl, `${locator} did not change the URL`);
        }
    });

    it('should display and click elements in the footer menu', async function () {
        for (const locator in FOOTER_MENU) {
            const element = await driver.findElement(FOOTER_MENU[locator]);
            assert(await element.isDisplayed(), `${locator} is not displayed`);
        }
    });

    it('should display ATM services menu items', async function () {
        for (const locator in ATM_SERVICES) {
            await driver.get(localHost);
            // Чакане за намиране на елемента с новия CSS селектор
            const element = await driver.wait(until.elementLocated(ATM_SERVICES[locator]), 30000);
            await driver.wait(until.elementIsVisible(element), 30000);
            assert(await element.isDisplayed(), `${locator} is not displayed`);
        }
    });

    it('should display online services menu items', async function () {
        for (const locator in ONLINE_SERVICES) {
            await driver.get(localHost);
            // Чакане за намиране на елемента с новия CSS селектор
            const element = await driver.wait(until.elementLocated(ONLINE_SERVICES[locator]), 30000);
            await driver.wait(until.elementIsVisible(element), 30000);
            assert(await element.isDisplayed(), `${locator} is not displayed`);
        }
    });

    it('should display "Read More" section', async function () {
        for (const locator in READ_MORE) {
            await driver.get(localHost);
            // Чакане за намиране на елемента с новия CSS селектор
            const element = await driver.wait(until.elementLocated(READ_MORE[locator]), 30000);
            await driver.wait(until.elementIsVisible(element), 30000);
            assert(await element.isDisplayed(), `${locator} is not displayed`);
        }
    });
});


