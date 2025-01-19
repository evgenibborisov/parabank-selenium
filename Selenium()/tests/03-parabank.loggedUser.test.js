let { Builder, By, until } = require('selenium-webdriver');
let assert = require('assert');
let firefox = require('selenium-webdriver/firefox'); // Променяме за Firefox
let { localHost, CUSTOMER_LOGIN, LEFT_MENU, FOOTER_MENU, ONLINE_SERVICES, ATM_SERVICES, READ_MORE, REG_ERROR } = require('../locators.js');




function generateUsername(baseName, number) {
    return `${baseName}${String(number).padStart(6, '0')}`;
}

let my_username = generateUsername('evgeni', Math.floor(Math.random() * 999) + 1);

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

    it('Successful Registration and login', async function () {
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

        const log_out_btn = await driver.wait(until.elementLocated(By.css('#leftPanel > ul > li:nth-child(8) > a')), 5000);
        await driver.wait(until.elementIsVisible(log_out_btn), 5000);
        log_out_btn.click()

        const username = await driver.wait(until.elementLocated(By.css('#loginPanel > form > div:nth-child(2) > input')),5000)
        await driver.wait(until.elementIsVisible(username), 5000);
        const password = await driver.wait(until.elementLocated(By.css('#loginPanel > form > div:nth-child(4) > input')),5000)
        await driver.wait(until.elementIsVisible(password), 5000);
        const loginBtn = await driver.wait(until.elementLocated(By.css('#loginPanel > form > div:nth-child(5) > input')),5000)
        
        await username.sendKeys(my_username)
        await password.sendKeys('1234')
        await loginBtn.click();

        const welcome_msg = await driver.wait(until.elementLocated(By.css('#leftPanel > p')),5000)
        await driver.wait(until.elementIsVisible(welcome_msg), 5000);
        const welcome_msg_text = await welcome_msg.getText();

        assert(welcome_msg_text.includes(`Welcome Evgeni Borisov`));
    });

    it('Open New Account (Savings)', async function () {
        const openAccountLink = await driver.wait(until.elementLocated(By.linkText('Open New Account')), 5000);
        await driver.wait(until.elementIsVisible(openAccountLink), 5000);
        await openAccountLink.click();
    
        const dropdown = await driver.wait(until.elementLocated(By.css('select#type')), 5000);
        await driver.wait(until.elementIsVisible(dropdown), 5000);
        await dropdown.sendKeys('SAVINGS');
    
        const submitButton = await driver.wait(until.elementLocated(By.css('#openAccountForm > form > div > input')), 5000);
        await driver.wait(until.elementIsVisible(submitButton), 5000);
        await submitButton.click();
    
        const confirmationMessage = await driver.wait(until.elementLocated(By.id('openAccountResult')), 5000);
        await driver.wait(until.elementIsVisible(confirmationMessage), 5000);
    
        const messageText = await confirmationMessage.getText();
        assert(messageText.includes('Account Opened!'));
    });

    it('Accounts Overview - First Account', async function () {
        await driver.findElement(By.linkText('Accounts Overview')).click();

        const firstAccount = await driver.wait(until.elementLocated(By.css('#accountTable > tbody > tr:nth-child(1) > td:nth-child(1) > a')),5000);
        await driver.wait(until.elementIsVisible(firstAccount), 5000);
        await firstAccount.click();

        const accountType = await driver.wait(until.elementLocated(By.css('#accountDetails > table > tbody > tr:nth-child(2)')),5000)
        await driver.wait(until.elementIsVisible(accountType), 5000);
        
        const accountType_text = await accountType.getText();
        assert(accountType_text.includes('CHECKING') || accountType_text.includes('SAVINGS'));
    });

    it('Transfer Funds - Successful', async function () {
        await driver.findElement(By.linkText('Transfer Funds')).click();

        const amountField = await driver.findElement(By.css('#amount'));
        await amountField.sendKeys('100');

        await driver.findElement(By.css('#transferForm input[type="submit"]')).click();

        const confirmationMessage = await driver.findElement(By.css('#showResult > h1')).getText();
        assert(confirmationMessage.includes('Transfer Complete!'));
    });

    it('Transfer Funds - Unsuccessful', async function () {
        await driver.findElement(By.linkText('Transfer Funds')).click();

        const amountField = await driver.findElement(By.css('#amount'));
        await amountField.sendKeys('invalid');

        await driver.findElement(By.css('#transferForm input[type="submit"]')).click();

        const errorMessage = await driver.findElement(By.css('#showError > p')).getText();
        assert(errorMessage.includes('An internal error has occurred'));
    });

    it('Bill Pay Option, Functionality check', async function () {
        await driver.findElement(By.linkText('Bill Pay')).click();

        const BILL_PAY_NAME_FIELD = await driver.wait(until.elementLocated(By.css('#billpayForm > form > table > tbody > tr:nth-child(1) > td:nth-child(2) > input')), 5000);
        await driver.wait(until.elementIsVisible(BILL_PAY_NAME_FIELD), 5000);
        await BILL_PAY_NAME_FIELD.sendKeys('Evgeni');
        
        const BILL_PAY_ADDRESS_FIELD = await driver.wait(until.elementLocated(By.css('#billpayForm > form > table > tbody > tr:nth-child(2) > td:nth-child(2) > input')), 5000);
        await driver.wait(until.elementIsVisible(BILL_PAY_ADDRESS_FIELD), 5000);
        await BILL_PAY_ADDRESS_FIELD.sendKeys('ul. Plakalnica');
        
        const BILL_PAY_CITY_FIELD = await driver.wait(until.elementLocated(By.css('#billpayForm > form > table > tbody > tr:nth-child(3) > td:nth-child(2) > input')), 5000);
        await driver.wait(until.elementIsVisible(BILL_PAY_CITY_FIELD), 5000);
        await BILL_PAY_CITY_FIELD.sendKeys('Sofia');
        
        const BILL_PAY_STATE_FIELD = await driver.wait(until.elementLocated(By.css('#billpayForm > form > table > tbody > tr:nth-child(4) > td:nth-child(2) > input')), 5000);
        await driver.wait(until.elementIsVisible(BILL_PAY_STATE_FIELD), 5000);
        await BILL_PAY_STATE_FIELD.sendKeys('Sofia');
        
        const BILL_PAY_ZIP_FIELD = await driver.wait(until.elementLocated(By.css('#billpayForm > form > table > tbody > tr:nth-child(5) > td:nth-child(2) > input')), 5000);
        await driver.wait(until.elementIsVisible(BILL_PAY_ZIP_FIELD), 5000);
        await BILL_PAY_ZIP_FIELD.sendKeys('1000');
        
        const BILL_PAY_PHONE_FIELD = await driver.wait(until.elementLocated(By.css('#billpayForm [name="payee.phoneNumber"]')), 5000);
        await driver.wait(until.elementIsVisible(BILL_PAY_PHONE_FIELD), 5000);
        await BILL_PAY_PHONE_FIELD.sendKeys('0888123456');
        
        const BILL_PAY_ACCOUNT_FIELD = await driver.wait(until.elementLocated(By.css('#billpayForm > form > table > tbody > tr:nth-child(8) > td:nth-child(2) > input')), 5000);
        await driver.wait(until.elementIsVisible(BILL_PAY_ACCOUNT_FIELD), 5000);
        await BILL_PAY_ACCOUNT_FIELD.sendKeys('123456');
        
        const BILL_PAY_VERIFY_ACCOUNT_FIELD = await driver.wait(until.elementLocated(By.css('#billpayForm > form > table > tbody > tr:nth-child(9) > td:nth-child(2) > input')), 5000);
        await driver.wait(until.elementIsVisible(BILL_PAY_VERIFY_ACCOUNT_FIELD), 5000);
        await BILL_PAY_VERIFY_ACCOUNT_FIELD.sendKeys('123456');
        
        const BILL_PAY_AMOUNT_FIELD = await driver.wait(until.elementLocated(By.css('#billpayForm > form > table > tbody > tr:nth-child(11) > td:nth-child(2) > input')), 5000);
        await driver.wait(until.elementIsVisible(BILL_PAY_AMOUNT_FIELD), 5000);
        await BILL_PAY_AMOUNT_FIELD.sendKeys('10');

        const SEND_PAYMENT_BTN = await driver.wait(until.elementLocated(By.css('#billpayForm > form > table > tbody > tr:nth-child(14) > td:nth-child(2)')),5000);
        await driver.wait(until.elementIsVisible(SEND_PAYMENT_BTN), 5000);
        SEND_PAYMENT_BTN.click();
        //await driver.sleep(10000)
        const PAY_COMPLETE_MSG = await driver.wait(until.elementLocated(By.css('#billpayResult > h1')),5000)
        await driver.wait(until.elementIsVisible(PAY_COMPLETE_MSG), 5000);
        const PAY_COMPLETE_MSG_TEXT = await PAY_COMPLETE_MSG.getText();
        assert(PAY_COMPLETE_MSG_TEXT.includes('Bill Payment Complete'));   

        await driver.findElement(By.linkText('Accounts Overview')).click();

        const secondAccount = await driver.wait(until.elementLocated(By.css('#accountTable > tbody > tr:nth-child(2) > td:nth-child(1) > a')),5000);
       
        await driver.wait(until.elementIsVisible(secondAccount), 5000);
        await secondAccount.click();
     
 
        const myTransaction = await driver.wait(until.elementLocated(By.css('#transactionTable > tbody')),5000);
        await driver.wait(until.elementIsVisible(myTransaction), 5000);
        await driver.sleep(1000)
        const transactionDescription_text = await myTransaction.getText();
     
        assert(transactionDescription_text.includes('Bill Payment to Evgeni'));  

    });
    it('Find transactions, Find by Transaction ID - throws internal error', async function () {
        await driver.findElement(By.linkText('Accounts Overview')).click();

        const firstAccount = await driver.wait(until.elementLocated(By.css('#accountTable > tbody > tr:nth-child(1) > td:nth-child(1) > a')),5000);
        await driver.wait(until.elementIsVisible(firstAccount), 5000);
        await firstAccount.click();

        const myTransaction = await driver.wait(until.elementLocated(By.css('#transactionTable > tbody > tr:nth-child(1) > td:nth-child(2) > a')),5000);
        await driver.wait(until.elementIsVisible(myTransaction), 5000);
        await myTransaction.click();

        const transactionId = await driver.wait(until.elementLocated(By.css('#rightPanel > table > tbody > tr:nth-child(1) > td:nth-child(2)')),5000)
        await driver.wait(until.elementIsVisible(transactionId), 5000);
        const transactionId_value = transactionId.getText();

        await driver.findElement(By.linkText('Find Transactions')).click();
        const findById_field = await driver.wait(until.elementLocated(By.css('#transactionId')),5000)
        await driver.wait(until.elementIsVisible(findById_field), 5000);
        findById_field.sendKeys(transactionId_value)

        const findById_Btn = await driver.wait(until.elementLocated(By.css('#findById')),5000)
        await driver.wait(until.elementIsVisible(findById_Btn), 5000);
        findById_Btn.click()

        const errorMessage = await driver.wait(until.elementLocated(By.css('#errorContainer > p')), 5000);
        await driver.wait(until.elementIsVisible(errorMessage), 5000);
        const errorMessageText = await errorMessage.getText();
        assert(errorMessageText.includes('An internal error has occurred and has been logged'), 'Test completed');    
    })
    it('Find transactions, Find by Transaction date',async function () {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0'); 
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const year = today.getFullYear(); 
        const formattedDate = `${month}-${day}-${year}`;
        
        await driver.findElement(By.linkText('Find Transactions')).click();
        const findByDate_field = await driver.wait(until.elementLocated(By.css('#transactionDate')),5000)
        findByDate_field.sendKeys(formattedDate)
        await driver.wait(until.elementIsVisible(findByDate_field), 5000);
        const findByDate_btn = await driver.wait(until.elementLocated(By.css('#findByDate')),5000)
        await driver.wait(until.elementIsVisible(findByDate_btn), 5000);
        
      findByDate_btn.click()

      const transactionResults = await driver.wait(until.elementLocated(By.css('#resultContainer > h1')),5000)
      await driver.wait(until.elementIsVisible(transactionResults), 5000);
      const transactionResults_text = await transactionResults.getText()
    
      const today_date = await driver.wait(until.elementLocated(By.css('#transactionBody > tr > td:nth-child(1)')),5000)
      await driver.wait(until.elementIsVisible(today_date), 5000);
      const today_date_text = await today_date.getText()
     
      assert(transactionResults_text.includes('Transaction Results'));  
      assert(today_date_text.includes(formattedDate)) 
    })
    it('Find transactions, Find by Transaction date range',async function () { 
        const today = new Date();
        
        const day = String(today.getDate()).padStart(2, '0'); 
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const year = today.getFullYear(); 
        const formattedDate_today = `${month}-${day}-${year}`;
        const formattedDate_randomDay = `${month}-${day}-${year}`;
        
        await driver.findElement(By.linkText('Find Transactions')).click();
        
        const startDate_field = await driver.wait(until.elementLocated(By.css('#fromDate')),5000)
        await driver.wait(until.elementIsVisible(startDate_field), 5000);
        startDate_field.sendKeys(formattedDate_today)

        const finalDate_field = await driver.wait(until.elementLocated(By.css('#toDate')),5000)
        await driver.wait(until.elementIsVisible(finalDate_field), 5000);
        finalDate_field.sendKeys(formattedDate_randomDay)

        const findByDateRange_btn = await driver.wait(until.elementLocated(By.css('#findByDateRange')),5000)
        await driver.wait(until.elementIsVisible(findByDateRange_btn), 5000);
        
      findByDateRange_btn.click()

      const transactionResults = await driver.wait(until.elementLocated(By.css('#resultContainer > h1')),5000)
      await driver.wait(until.elementIsVisible(transactionResults), 5000);
      const transactionResults_text = await transactionResults.getText()
    
      const today_date = await driver.wait(until.elementLocated(By.css('#transactionBody > tr > td:nth-child(1)')),5000)
      await driver.wait(until.elementIsVisible(today_date), 5000);
      const today_date_text = await today_date.getText()
     
      assert(transactionResults_text.includes('Transaction Results'));  
      assert(today_date_text.includes(formattedDate_today)) 
    })
    it('Find transactions, Find by Transaction amount of 11$',async function () { 
        await driver.findElement(By.linkText('Transfer Funds')).click();
        const firstAccount_secondOption = await driver.wait(until.elementLocated(By.css('#fromAccountId option:nth-child(2)')), 5000);
        await driver.wait(until.elementIsVisible(firstAccount_secondOption), 5000);
        await firstAccount_secondOption.click();
        const transaction = await driver.findElement(By.css('#amount'));
        await transaction.sendKeys('11');
        await driver.findElement(By.css('#transferForm input[type="submit"]')).click();
        
        await driver.findElement(By.linkText('Find Transactions')).click();
         const amount_field = await driver.wait(until.elementLocated(By.css('#amount')),5000)
        await driver.wait(until.elementIsVisible(amount_field), 5000);
        amount_field.sendKeys('11')

        const findByAmount_btn = await driver.wait(until.elementLocated(By.css('#findByAmount')),5000)
        await driver.wait(until.elementIsVisible(findByAmount_btn), 5000);
        findByAmount_btn.click()
        driver.sleep(10000)
        const result = await driver.wait(until.elementLocated(By.css('#transactionBody > tr > td:nth-child(3)')),5000)
        await driver.wait(until.elementIsVisible(result), 5000);
        const result_text = await result.getText()

        assert(result_text.includes('$11.00'))
    })
    it('Update contact info',async function () { 
        await driver.findElement(By.linkText('Update Contact Info')).click();
        const gsm_change = await driver.wait(until.elementLocated(By.css('#updateProfileForm #customer\\.phoneNumber')),5000)
        await driver.wait(until.elementIsVisible(gsm_change), 5000);
       
        //await gsm_change.sendKeys(Key.CONTROL, 'a', Key.BACK_SPACE);
        await gsm_change.clear()
        await gsm_change.sendKeys('0888 911 112');

        const updateBtn = await driver.wait(until.elementLocated(By.css('#updateProfileForm > form > table > tbody > tr:nth-child(8) > td:nth-child(2) > input')),5000)
        await driver.wait(until.elementIsVisible(updateBtn), 5000);
        updateBtn.click();

        const profile_update_msg = await driver.wait(until.elementLocated(By.css('#updateProfileResult > h1')),5000)
        await driver.wait(until.elementIsVisible(profile_update_msg), 5000);
        const profile_update_msg_text = await profile_update_msg.getText();

        assert(profile_update_msg_text.includes('Profile Updated'))
        //bug -> second msg = Your updated address and phone number have been added to the system.
        //bug -> Welcome Evgeni Borisov, not updated when try to doing that
    })
    it('Loan request',async function () { 
        await driver.findElement(By.linkText('Request Loan')).click();
        const loanAmount = await driver.wait(until.elementLocated(By.css('#amount')), 5000);
        await driver.wait(until.elementIsVisible(loanAmount), 5000);
        await loanAmount.sendKeys('13')
        
        const downPayment = await driver.wait(until.elementLocated(By.css('#downPayment')), 5000);
        await driver.wait(until.elementIsVisible(downPayment), 5000);
        await downPayment.sendKeys('13')
        
        const applyBtn = await driver.wait(until.elementLocated(By.css('#requestLoanForm > form > table > tbody > tr:nth-child(4) > td:nth-child(2) > input')), 5000);
        await driver.wait(until.elementIsVisible(applyBtn), 5000);
        applyBtn.click()

        const loan_approved_msg = await driver.wait(until.elementLocated(By.css('#loanRequestApproved > p:nth-child(1)')),5000)
        await driver.wait(until.elementIsVisible(loan_approved_msg), 5000);
        const loan_approved_msg_text = await loan_approved_msg.getText();

        assert(loan_approved_msg_text.includes('Congratulations, your loan has been approved.'))
        
        const newAcc = await driver.wait(until.elementLocated(By.css('#newAccountId')), 5000);
        await driver.wait(until.elementIsVisible(newAcc), 5000);
        newAcc.click()

        const accType = await driver.wait(until.elementLocated(By.css('#accountType')), 5000);
        await driver.wait(until.elementIsVisible(accType), 5000);
        const accType_text = await accType.getText()
        
        const balance = await driver.wait(until.elementLocated(By.css('#balance')),5000)
        await driver.wait(until.elementIsVisible(balance), 5000);
        const balance_text = await balance.getText();

        
        assert(accType_text.includes('LOAN'))
        assert(balance_text.includes('$13.00'))


    })
    it('Logout button',async function () { 

        const logOut = await driver.wait(until.elementLocated(By.css('#leftPanel > ul > li:nth-child(8) > a')),5000)
        await driver.wait(until.elementIsVisible(logOut), 5000);
        const beforeAddress = await driver.getCurrentUrl();
        //driver.sleep(1000)
        await logOut.click()
        //driver.sleep(1000)
        const afterAddress = await driver.getCurrentUrl();
        
        assert.notStrictEqual(
            beforeAddress,
            afterAddress,
            'The URLs are the same, but they should be different after Logout!'
        );

    })

});
