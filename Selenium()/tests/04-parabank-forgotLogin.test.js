let { Builder, By, until } = require('selenium-webdriver');
let assert = require('assert');
let firefox = require('selenium-webdriver/firefox'); // Променяме за Firefox
let { localHost, CUSTOMER_LOGIN, LEFT_MENU, FOOTER_MENU, ONLINE_SERVICES, ATM_SERVICES, READ_MORE, REG_ERROR } = require('../locators.js');




function generateUsername(baseName, number) {
    return `${baseName}${String(number).padStart(6, '0')}`;
}

let my_username = generateUsername('evgeni', Math.floor(Math.random() * 999) + 1);
let my_username_str = my_username.toString()
let mySSN = generateUsername('91', Math.floor(Math.random() * 999) + 1);
let gpassword = '1234'

describe('Logged User Tests', function () {
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

    it('Reg, Login, Forgot and Search', async function () {
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
                await ADDRESS_FIELD.sendKeys('Street');
                
                const CITY_FIELD = await driver.wait(until.elementLocated(By.css('#customerForm #customer\\.address\\.city')), 5000);
                await driver.wait(until.elementIsVisible(CITY_FIELD), 5000);
                await CITY_FIELD.sendKeys('City');
                
                const STATE_FIELD = await driver.wait(until.elementLocated(By.css('#customerForm #customer\\.address\\.state')), 5000);
                await driver.wait(until.elementIsVisible(STATE_FIELD), 5000);
                await STATE_FIELD.sendKeys('State');
                
                const ZIP_CODE_FIELD = await driver.wait(until.elementLocated(By.css('#customerForm #customer\\.address\\.zipCode')), 5000);
                await driver.wait(until.elementIsVisible(ZIP_CODE_FIELD), 5000);
                await ZIP_CODE_FIELD.sendKeys('1000');
                
                const PHONE_NUMBER_FIELD = await driver.wait(until.elementLocated(By.css('#customerForm #customer\\.phoneNumber')), 5000);
                await driver.wait(until.elementIsVisible(PHONE_NUMBER_FIELD), 5000);
                await PHONE_NUMBER_FIELD.sendKeys('0888123456');
                
                const SSN_FIELD = await driver.wait(until.elementLocated(By.css('#customerForm #customer\\.ssn')), 5000);
                await driver.wait(until.elementIsVisible(SSN_FIELD), 5000);
                await SSN_FIELD.sendKeys(mySSN);
                
                const USERNAME_FIELD = await driver.wait(until.elementLocated(By.css('#customerForm #customer\\.username')), 5000);
                await driver.wait(until.elementIsVisible(USERNAME_FIELD), 5000);
                await USERNAME_FIELD.sendKeys(my_username);
                
                const PASSWORD_FIELD = await driver.wait(until.elementLocated(By.css('#customerForm #customer\\.password')), 5000);
                await driver.wait(until.elementIsVisible(PASSWORD_FIELD), 5000);
                await PASSWORD_FIELD.sendKeys(gpassword);
                
                const REPASSWORD_FIELD = await driver.wait(until.elementLocated(By.css('#customerForm #repeatedPassword')), 5000);
                await driver.wait(until.elementIsVisible(REPASSWORD_FIELD), 5000);
                await REPASSWORD_FIELD.sendKeys(gpassword);

                await driver.sleep(3000)
                const REGISTER_BUTTON = await driver.wait(until.elementLocated(By.css('#customerForm input.button[value="Register"]')), 5000);
                await driver.wait(until.elementIsVisible(REGISTER_BUTTON), 5000);
                await REGISTER_BUTTON.click();
        
        const account_created = await driver.wait(until.elementLocated(By.css('#rightPanel > h1')), 5000);
        await driver.wait(until.elementIsVisible(account_created), 5000);
        const acc_created_msg = await account_created.getText();
        
       assert(acc_created_msg.includes(`Welcome ${my_username}`));

        const log_out_btn = await driver.wait(until.elementLocated(By.css('#leftPanel > ul > li:nth-child(8) > a')), 5000);
        await driver.wait(until.elementIsVisible(log_out_btn), 5000);
       await log_out_btn.click()

        let username = await driver.wait(until.elementLocated(By.css('#loginPanel > form > div:nth-child(2) > input')),5000)
        await driver.wait(until.elementIsVisible(username), 5000);
        let password = await driver.wait(until.elementLocated(By.css('#loginPanel > form > div:nth-child(4) > input')),5000)
        await driver.wait(until.elementIsVisible(password), 5000);
        let loginBtn = await driver.wait(until.elementLocated(By.css('#loginPanel > form > div:nth-child(5) > input')),5000)
        await driver.sleep(3000)
        await username.sendKeys(my_username)
        await driver.sleep(3000)
        await password.sendKeys(gpassword)
        await loginBtn.click();
        //console.log(my_username_str)
        const welcome_msg = await driver.wait(until.elementLocated(By.css('#leftPanel > p')),5000)
        await driver.wait(until.elementIsVisible(welcome_msg), 5000);
        const welcome_msg_text = await welcome_msg.getText();

        assert(welcome_msg_text.includes(`Welcome Evgeni Borisov`));
           const logOut = await driver.wait(until.elementLocated(By.css('#leftPanel > ul > li:nth-child(8) > a')),5000)
                await driver.wait(until.elementIsVisible(logOut), 5000);
                const beforeAddress = await driver.getCurrentUrl();
                //
                await logOut.click()
                //driver.sleep(1000)
                const afterAddress = await driver.getCurrentUrl();
                
                assert.notStrictEqual(
                    beforeAddress,
                    afterAddress,
                    'The URLs are the same, but they should be different after Logout!'
                );
        const forgot_login = await driver.wait(until.elementLocated(By.css('#loginPanel > p:nth-child(2) > a')),5000) 
        await driver.wait(until.elementIsVisible(forgot_login), 5000);
        await forgot_login.click()

        const firstName = await driver.wait(until.elementLocated(By.css('#firstName')), 5000);
        await driver.wait(until.elementIsVisible(firstName), 5000);
        await firstName.sendKeys('Evgeni')
        //await driver.sleep(1000)
        const lastName = await driver.wait(until.elementLocated(By.css('#lastName')), 5000);
        await driver.wait(until.elementIsVisible(lastName), 5000);
        await lastName.sendKeys('Borisov')
        //await driver.sleep(1000)
        const address = await driver.wait(until.elementLocated(By.css('#lookupForm #address\\.street')), 5000);
        await driver.wait(until.elementIsVisible(address), 5000);
        await address.sendKeys('Street')
        //await driver.sleep(1000)
       const city = await driver.wait(until.elementLocated(By.css('#lookupForm #address\\.city')), 5000);
       await driver.wait(until.elementIsVisible(city), 5000);
       await city.sendKeys('City')
       //await driver.sleep(1000)
      const state = await driver.wait(until.elementLocated(By.css('#lookupForm #address\\.state')), 5000);
      await driver.wait(until.elementIsVisible(state), 5000);
      await state.sendKeys('State')
      //await driver.sleep(1000)
     const zip = await driver.wait(until.elementLocated(By.css('#lookupForm #address\\.zipCode')), 5000);
     await driver.wait(until.elementIsVisible(zip), 5000);
     await zip.sendKeys('1000')
     //await driver.sleep(1000)
    const ssn = await driver.wait(until.elementLocated(By.css('#ssn')), 5000);
    await driver.wait(until.elementIsVisible(ssn), 5000);
    await ssn.sendKeys(mySSN)
    //driver.sleep(1000)
   const findInfo = await driver.wait(until.elementLocated(By.css('#lookupForm > table > tbody > tr:nth-child(8) > td:nth-child(2) > input')),10000)
    await driver.wait(until.elementIsVisible(findInfo), 5000);

    await driver.sleep(1000)

await findInfo.click()

const loggedIn = await driver.wait(until.elementLocated(By.css('#rightPanel > p:nth-child(3)')), 10000);
await driver.wait(until.elementIsVisible(loggedIn),5000)
const loggedIn_text = await loggedIn.getText()
//console.log(loggedIn_text)
assert(loggedIn_text.includes(my_username_str))
const beforeAddress1 = await driver.getCurrentUrl();

const logOut_Btn = await driver.wait(until.elementLocated(By.css('#leftPanel > ul > li:nth-child(8) > a')),5000)
await driver.wait(until.elementIsVisible(logOut_Btn),5000)
await logOut_Btn.click()
const afterAddress1 = await driver.getCurrentUrl();
assert.notStrictEqual(
    beforeAddress1,
    afterAddress1,
    'The URLs are the same, but they should be different after Logout!'
);
              
    });
})