let { Builder, By, until } = require('selenium-webdriver');
let assert = require('assert');
let firefox = require('selenium-webdriver/firefox'); // Променяме за Firefox

let { localHost, CUSTOMER_LOGIN, LEFT_MENU, FOOTER_MENU, ONLINE_SERVICES, ATM_SERVICES, READ_MORE, REG_ERROR } = require('../locators.js');
const { log } = require('console');

describe.only('Unlogged User Tests', function () {
    this.timeout(60000); // Увеличаваме таймаута до 60 секунди за всички тестове в този файл

    let driver;

    before(async function () {
            try {
                console.log('Setting up WebDriver...');
                let options = new firefox.Options(); 
                options.setPreference("dom.disable_beforeunload", true); 
                options.setPreference("privacy.popups.showBrowserMessage", false); 
                options.setPreference("dom.confirmationDialog.show", false);
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
        })
        it('Services and News', async function () {
            await driver.get(localHost);
            const atm_services = await driver.wait(until.elementLocated(By.css('#rightPanel > ul.services > li.captionone')),5000)
            await driver.wait(until.elementIsVisible(atm_services),5000)
            const atm_services_element = await atm_services.getText()
            assert(atm_services_element.includes('ATM Services'))

            const online_services = await driver.wait(until.elementLocated(By.css('#rightPanel > ul.servicestwo > li.captiontwo')),5000)
            await driver.wait(until.elementIsVisible(online_services),5000)
            const online_services_element =await online_services.getText()
            assert(online_services_element.includes('Online Services'))

            const news = await driver.wait(until.elementLocated(By.css('#rightPanel > ul.events > li.captionthree')),5000)
            await driver.wait(until.elementIsVisible(news),5000)
            const news_element = await news.getText()
            
            // const today = new Date();
            // const day = String(today.getDate()).padStart(2, '0');
            // const month = String(today.getMonth() + 1).padStart(2, '0');
            // const year = today.getFullYear();

            // const formattedDate = `${month}/${day}/${year}`
            // assert(news_element.includes(formattedDate))

            const readMore_services = await driver.wait(until.elementLocated(By.css('#rightPanel > p:nth-child(4) > a')),5000)
            await driver.wait(until.elementIsVisible(readMore_services),5000)
            readMore_services.click()
            const first_title = await driver.wait(until.elementLocated(By.css('#rightPanel > span:nth-child(4)')),5000)
            await driver.wait(until.elementIsVisible(first_title),5000)
            const first_title_element = await first_title.getText()
            assert(first_title_element.includes('Available Bookstore SOAP services'))

            const homeBtn = await driver.wait(until.elementLocated(By.css('#headerPanel > ul.button > li.home > a')),5000)
            await driver.wait(until.elementIsVisible(homeBtn),5000)
            homeBtn.click()

            const readMore_news = await driver.wait(until.elementLocated(By.css('#rightPanel > p:nth-child(7) > a')),5000)
            await driver.wait(until.elementIsVisible(readMore_news),5000)
            readMore_news.click()

            const news_title = await driver.wait(until.elementLocated(By.css('#rightPanel > h1')),5000)
            await driver.wait(until.elementIsVisible(news_title),5000)
            const news_title_element = await news_title.getText()
            assert(news_title_element.includes('ParaBank News'))

    })
    it('About', async function () {
        await driver.get(localHost);
         const about = await driver.wait(until.elementLocated(By.css('#headerPanel > ul.button > li.aboutus > a')),5000)
         await driver.wait(until.elementIsVisible(about),5000)
         about.click()

         const about_title = await driver.wait(until.elementLocated(By.css('#rightPanel > h1')),5000)
         await driver.wait(until.elementIsVisible(about_title),5000)
         const about_title_element = await about_title.getText()
         assert(about_title_element.includes('ParaSoft Demo Website'))

    })

         
         it('Customer Care - Contact Us. Correct Name, Email, Phone and Message', async function () { 
             await driver.get(localHost);
             const customer_care = await driver.wait(until.elementLocated(By.css('#headerPanel > ul.button > li.contact > a')),5000)
            await driver.wait(until.elementIsVisible(customer_care), 5000);
            customer_care.click()
         
            const nameField = await driver.wait(until.elementLocated(By.css('#name')),5000)
            await driver.wait(until.elementIsVisible(nameField), 5000);
            nameField.sendKeys('Evgeni')
         
            const emailField = await driver.wait(until.elementLocated(By.css('#email')),5000)
            await driver.wait(until.elementIsVisible(emailField), 5000);
            emailField.sendKeys('evgenibborisov@gmail.com')
         
            const phoneField = await driver.wait(until.elementLocated(By.css('#phone')),5000)
            await driver.wait(until.elementIsVisible(phoneField), 5000);
            phoneField.sendKeys('028471248')
         
            const messageField = await driver.wait(until.elementLocated(By.css('#message')),5000)
            await driver.wait(until.elementIsVisible(messageField), 5000);
            messageField.sendKeys('In the God, we trust')
         
            const sendBtn = await driver.wait(until.elementLocated(By.css('#contactForm > table > tbody > tr:nth-child(5) > td:nth-child(2) > input')),5000)
            await driver.wait(until.elementIsVisible(sendBtn), 5000);
            await sendBtn.click()
         
            const customerCare_msg = await driver.wait(until.elementLocated(By.xpath('//*[@id="rightPanel"]/p[1]')),5000)
            await driver.wait(until.elementIsVisible(customerCare_msg), 5000);
            const customerCare_msg_element = await customerCare_msg.getText()
         
            assert(customerCare_msg_element.includes('Thank you Evgeni'))
         
         })
         it('Customer Care - Contact Us. Correct Name, Email and Phone. Empty Message field throws error msg', async function () { 
            await driver.get(localHost);
            const customer_care = await driver.wait(until.elementLocated(By.css('#headerPanel > ul.button > li.contact > a')),5000)
           await driver.wait(until.elementIsVisible(customer_care), 5000);
           customer_care.click()
         
            const nameField = await driver.wait(until.elementLocated(By.css('#name')),5000)
            await driver.wait(until.elementIsVisible(nameField), 5000);
            nameField.sendKeys('Evgeni')
         
            const emailField = await driver.wait(until.elementLocated(By.css('#email')),5000)
            await driver.wait(until.elementIsVisible(emailField), 5000);
            emailField.sendKeys('evgenibborisov@gmail.com')
         
            const phoneField = await driver.wait(until.elementLocated(By.css('#phone')),5000)
            await driver.wait(until.elementIsVisible(phoneField), 5000);
            phoneField.sendKeys('028471248')
         
         //    const messageField = await driver.wait(until.elementLocated(By.css('#message')),5000)
         //    await driver.wait(until.elementIsVisible(messageField), 5000);
         //    messageField.sendKeys('In the God, we trust')
         
            const sendBtn = await driver.wait(until.elementLocated(By.css('#contactForm > table > tbody > tr:nth-child(5) > td:nth-child(2) > input')),5000)
            await driver.wait(until.elementIsVisible(sendBtn), 5000);
            await sendBtn.click()
         
            const msg_error = await driver.wait(until.elementLocated(By.xpath('//*[@id="message.errors"]')),5000)
            await driver.wait(until.elementIsVisible(msg_error), 5000);
            const msg_error_element = await msg_error.getText()
         
            assert(msg_error_element.includes('Message is required.'))
         
         })
         it('Customer Care - Contact Us. Correct Name, Email and Message. Empty Phone field throws error msg', async function () { 
            await driver.get(localHost);
             const customer_care = await driver.wait(until.elementLocated(By.css('#headerPanel > ul.button > li.contact > a')),5000)
            await driver.wait(until.elementIsVisible(customer_care), 5000);
            customer_care.click()
         
            const nameField = await driver.wait(until.elementLocated(By.css('#name')),5000)
            await driver.wait(until.elementIsVisible(nameField), 5000);
            nameField.sendKeys('Evgeni')
         
            const emailField = await driver.wait(until.elementLocated(By.css('#email')),5000)
            await driver.wait(until.elementIsVisible(emailField), 5000);
            emailField.sendKeys('evgenibborisov@gmail.com')
         
         //    const phoneField = await driver.wait(until.elementLocated(By.css('#phone')),5000)
         //    await driver.wait(until.elementIsVisible(phoneField), 5000);
         //    phoneField.sendKeys('028471248')
         
            const messageField = await driver.wait(until.elementLocated(By.css('#message')),5000)
            await driver.wait(until.elementIsVisible(messageField), 5000);
            messageField.sendKeys('In the God, we trust')
         
            const sendBtn = await driver.wait(until.elementLocated(By.css('#contactForm > table > tbody > tr:nth-child(5) > td:nth-child(2) > input')),5000)
            await driver.wait(until.elementIsVisible(sendBtn), 5000);
            await sendBtn.click()
         
            const phone_error = await driver.wait(until.elementLocated(By.xpath('//*[@id="phone.errors"]')),5000)
            await driver.wait(until.elementIsVisible(phone_error), 5000);
            const phone_error_element = await phone_error.getText()
         
            assert(phone_error_element.includes('Phone is required.'))
         
         })
         it('Customer Care - Contact Us. Correct Name, Phone and Message. Empty Email field throws error msg', async function () { 
            await driver.get(localHost);
            const customer_care = await driver.wait(until.elementLocated(By.css('#headerPanel > ul.button > li.contact > a')),5000)
           await driver.wait(until.elementIsVisible(customer_care), 5000);
           customer_care.click()
         
            const nameField = await driver.wait(until.elementLocated(By.css('#name')),5000)
            await driver.wait(until.elementIsVisible(nameField), 5000);
            nameField.sendKeys('Evgeni')
         
         //    const emailField = await driver.wait(until.elementLocated(By.css('#email')),5000)
         //    await driver.wait(until.elementIsVisible(emailField), 5000);
         //    emailField.sendKeys('evgenibborisov@gmail.com')
         
            const phoneField = await driver.wait(until.elementLocated(By.css('#phone')),5000)
            await driver.wait(until.elementIsVisible(phoneField), 5000);
            phoneField.sendKeys('028471248')
         
            const messageField = await driver.wait(until.elementLocated(By.css('#message')),5000)
            await driver.wait(until.elementIsVisible(messageField), 5000);
            messageField.sendKeys('In the God, we trust')
         
            const sendBtn = await driver.wait(until.elementLocated(By.css('#contactForm > table > tbody > tr:nth-child(5) > td:nth-child(2) > input')),5000)
            await driver.wait(until.elementIsVisible(sendBtn), 5000);
            await sendBtn.click()
         
            const email_error = await driver.wait(until.elementLocated(By.xpath('//*[@id="email.errors"]')),5000)
            await driver.wait(until.elementIsVisible(email_error), 5000);
            const email_error_element = await email_error.getText()
         
            assert(email_error_element.includes('Email is required.'))
         
         })
         it('Customer Care - Contact Us. Correct Email, Phone and Message. Empty Name field throws error msg', async function () { 
            await driver.get(localHost);
            const customer_care = await driver.wait(until.elementLocated(By.css('#headerPanel > ul.button > li.contact > a')),5000)
           await driver.wait(until.elementIsVisible(customer_care), 5000);
           customer_care.click()
         
         //    const nameField = await driver.wait(until.elementLocated(By.css('#name')),5000)
         //    await driver.wait(until.elementIsVisible(nameField), 5000);
         //    nameField.sendKeys('Evgeni')
         
            const emailField = await driver.wait(until.elementLocated(By.css('#email')),5000)
            await driver.wait(until.elementIsVisible(emailField), 5000);
            emailField.sendKeys('evgenibborisov@gmail.com')
         
            const phoneField = await driver.wait(until.elementLocated(By.css('#phone')),5000)
            await driver.wait(until.elementIsVisible(phoneField), 5000);
            phoneField.sendKeys('028471248')
         
            const messageField = await driver.wait(until.elementLocated(By.css('#message')),5000)
            await driver.wait(until.elementIsVisible(messageField), 5000);
            messageField.sendKeys('In the God, we trust')
         
            const sendBtn = await driver.wait(until.elementLocated(By.css('#contactForm > table > tbody > tr:nth-child(5) > td:nth-child(2) > input')),5000)
            await driver.wait(until.elementIsVisible(sendBtn), 5000);
            await sendBtn.click()
         
            const name_error = await driver.wait(until.elementLocated(By.xpath('//*[@id="name.errors"]')),5000)
            await driver.wait(until.elementIsVisible(name_error), 5000);
            const name_error_element = await name_error.getText()
         
            assert(name_error_element.includes('Name is required.'))
         
         })
        

    })


