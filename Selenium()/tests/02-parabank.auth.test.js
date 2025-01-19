let { Builder, By, until } = require('selenium-webdriver');
let assert = require('assert');
let firefox = require('selenium-webdriver/firefox'); // Променяме за Firefox
let { localHost, CUSTOMER_LOGIN, LEFT_MENU, FOOTER_MENU, ONLINE_SERVICES, ATM_SERVICES, READ_MORE, REG_ERROR } = require('../locators.js');

function generateUsername(baseName, number) {
    return `${baseName}${String(number).padStart(6, '0')}`;
}

let my_username = generateUsername('evgeni', Math.floor(Math.random() * 999) + 1);

describe('ParaBank Register Tests', function () {
    this.timeout(60000); // Увеличаваме таймаута до 60 секунди за всички тестове в този файл

    let driver;

    before(async function () {
            try {
                console.log('Setting up WebDriver...');
                let options = new firefox.Options(); 
    
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

       
        
        it('Unsuccessful Registration, with wrong password', async function () {
            assert(driver, 'Driver is not initialized');
            await driver.get(localHost);
        
const registerButton = await driver.wait(until.elementLocated(By.css('#loginPanel > p:nth-child(3) > a')), 5000);
await driver.wait(until.elementIsVisible(registerButton), 5000);
await registerButton.click();

const FIRST_NAME_FIELD = await driver.wait(until.elementLocated(By.css('#customerForm #customer\\.firstName')), 5000);
await driver.wait(until.elementIsVisible(FIRST_NAME_FIELD), 5000);
await FIRST_NAME_FIELD.sendKeys('Evgeni');

const LAST_NAME_FIELD = await driver.wait(until.elementLocated(By.css('#customerForm #customer\\.lastName')), 5000);
await driver.wait(until.elementIsVisible(LAST_NAME_FIELD), 5000);
await LAST_NAME_FIELD.sendKeys('Borisov');

const ADDRESS_FIELD = await driver.wait(until.elementLocated(By.css('#customerForm #customer\\.address\\.street')), 5000);
await driver.wait(until.elementIsVisible(ADDRESS_FIELD), 5000);
await ADDRESS_FIELD.sendKeys('My Street');

const CITY_FIELD = await driver.wait(until.elementLocated(By.css('#customerForm #customer\\.address\\.city')), 5000);
await driver.wait(until.elementIsVisible(CITY_FIELD), 5000);
await CITY_FIELD.sendKeys('Sofia');

const STATE_FIELD = await driver.wait(until.elementLocated(By.css('#customerForm #customer\\.address\\.state')), 5000);
await driver.wait(until.elementIsVisible(STATE_FIELD), 5000);
await STATE_FIELD.sendKeys('Sofia');

const ZIP_CODE_FIELD = await driver.wait(until.elementLocated(By.css('#customerForm #customer\\.address\\.zipCode')), 5000);
await driver.wait(until.elementIsVisible(ZIP_CODE_FIELD), 5000);
await ZIP_CODE_FIELD.sendKeys('1000');

const PHONE_NUMBER_FIELD = await driver.wait(until.elementLocated(By.css('#customerForm #customer\\.phoneNumber')), 5000);
await driver.wait(until.elementIsVisible(PHONE_NUMBER_FIELD), 5000);
await PHONE_NUMBER_FIELD.sendKeys('0888123456');

const SSN_FIELD = await driver.wait(until.elementLocated(By.css('#customerForm #customer\\.ssn')), 5000);
await driver.wait(until.elementIsVisible(SSN_FIELD), 5000);
await SSN_FIELD.sendKeys('123-45-6789');

const USERNAME_FIELD = await driver.wait(until.elementLocated(By.css('#customerForm #customer\\.username')), 5000);
await driver.wait(until.elementIsVisible(USERNAME_FIELD), 5000);
await USERNAME_FIELD.sendKeys(my_username);

const PASSWORD_FIELD = await driver.wait(until.elementLocated(By.css('#customerForm #customer\\.password')), 5000);
await driver.wait(until.elementIsVisible(PASSWORD_FIELD), 5000);
await PASSWORD_FIELD.sendKeys('1234');

const REPASSWORD_FIELD = await driver.wait(until.elementLocated(By.css('#customerForm #repeatedPassword')), 5000);
await driver.wait(until.elementIsVisible(REPASSWORD_FIELD), 5000);
await REPASSWORD_FIELD.sendKeys('wrongpassword'); // Неправилен парола

const REGISTER_BUTTON = await driver.wait(until.elementLocated(By.css('#customerForm input.button[value="Register"]')), 5000);
await driver.wait(until.elementIsVisible(REGISTER_BUTTON), 5000);
await REGISTER_BUTTON.click();

const errorMessage = await driver.wait(until.elementLocated(By.css('#customerForm #repeatedPassword\\.errors')), 5000);
await driver.wait(until.elementIsVisible(errorMessage), 5000);
const errorText = await errorMessage.getText();
            
// Проверяваме дали съобщението съдържа "Passwords do not match"
assert(errorText.includes('Passwords did not match'));
        });

    it('Successful Login', async function () {
        await driver.get(localHost);
        
        const registerButton = await driver.wait(until.elementLocated(By.css('#loginPanel > p:nth-child(3) > a')), 5000);
        await driver.wait(until.elementIsVisible(registerButton), 5000);
        await registerButton.click();
        
        const FIRST_NAME_FIELD = await driver.wait(until.elementLocated(By.css('#customerForm #customer\\.firstName')), 5000);
        await driver.wait(until.elementIsVisible(FIRST_NAME_FIELD), 5000);
        await FIRST_NAME_FIELD.sendKeys('Evgeni');
        
        const LAST_NAME_FIELD = await driver.wait(until.elementLocated(By.css('#customerForm #customer\\.lastName')), 5000);
        await driver.wait(until.elementIsVisible(LAST_NAME_FIELD), 5000);
        await LAST_NAME_FIELD.sendKeys('Borisov');
        
        const ADDRESS_FIELD = await driver.wait(until.elementLocated(By.css('#customerForm #customer\\.address\\.street')), 5000);
        await driver.wait(until.elementIsVisible(ADDRESS_FIELD), 5000);
        await ADDRESS_FIELD.sendKeys('My Street');
        
        const CITY_FIELD = await driver.wait(until.elementLocated(By.css('#customerForm #customer\\.address\\.city')), 5000);
        await driver.wait(until.elementIsVisible(CITY_FIELD), 5000);
        await CITY_FIELD.sendKeys('Sofia');
        
        const STATE_FIELD = await driver.wait(until.elementLocated(By.css('#customerForm #customer\\.address\\.state')), 5000);
        await driver.wait(until.elementIsVisible(STATE_FIELD), 5000);
        await STATE_FIELD.sendKeys('Sofia');
        
        const ZIP_CODE_FIELD = await driver.wait(until.elementLocated(By.css('#customerForm #customer\\.address\\.zipCode')), 5000);
        await driver.wait(until.elementIsVisible(ZIP_CODE_FIELD), 5000);
        await ZIP_CODE_FIELD.sendKeys('1000');
        
        const PHONE_NUMBER_FIELD = await driver.wait(until.elementLocated(By.css('#customerForm #customer\\.phoneNumber')), 5000);
        await driver.wait(until.elementIsVisible(PHONE_NUMBER_FIELD), 5000);
        await PHONE_NUMBER_FIELD.sendKeys('0888123456');
        
        const SSN_FIELD = await driver.wait(until.elementLocated(By.css('#customerForm #customer\\.ssn')), 5000);
        await driver.wait(until.elementIsVisible(SSN_FIELD), 5000);
        await SSN_FIELD.sendKeys('123-45-6789');
        
        const USERNAME_FIELD = await driver.wait(until.elementLocated(By.css('#customerForm #customer\\.username')), 5000);
        await driver.wait(until.elementIsVisible(USERNAME_FIELD), 5000);
        await USERNAME_FIELD.sendKeys(my_username);
        
        const PASSWORD_FIELD = await driver.wait(until.elementLocated(By.css('#customerForm #customer\\.password')), 5000);
        await driver.wait(until.elementIsVisible(PASSWORD_FIELD), 5000);
        await PASSWORD_FIELD.sendKeys('1234');
        
        const REPASSWORD_FIELD = await driver.wait(until.elementLocated(By.css('#customerForm #repeatedPassword')), 5000);
        await driver.wait(until.elementIsVisible(REPASSWORD_FIELD), 5000);
        await REPASSWORD_FIELD.sendKeys('1234'); 
        
        const REGISTER_BUTTON = await driver.wait(until.elementLocated(By.css('#customerForm input.button[value="Register"]')), 5000);
        await driver.wait(until.elementIsVisible(REGISTER_BUTTON), 5000);
        await REGISTER_BUTTON.click();

const account_created = await driver.wait(until.elementLocated(By.css('#rightPanel > h1')), 5000);
await driver.wait(until.elementIsVisible(account_created), 5000);
const acc_created_msg = await account_created.getText();

assert(acc_created_msg.includes(`Welcome ${my_username}`));

    });
});
