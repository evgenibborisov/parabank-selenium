let { Builder, By, until } = require('selenium-webdriver');
let assert = require('assert');
let firefox = require('selenium-webdriver/firefox'); // Променяме за Firefox

let { localHost, CUSTOMER_LOGIN, LEFT_MENU, FOOTER_MENU, ONLINE_SERVICES, ATM_SERVICES, READ_MORE, REG_ERROR } = require('../locators.js');
const { log } = require('console');

describe('Unlogged User Tests', function () {
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
        it('Footer Panel - About Us', async function () {
            await driver.get(localHost);
            const aboutUs_footer = await driver.wait(until.elementLocated(By.css('#footerPanel > ul:nth-child(1) > li:nth-child(2) > a')),5000)
            await driver.wait(until.elementIsVisible(aboutUs_footer),5000)
            aboutUs_footer.click()
            const aboutUs_title = await driver.wait(until.elementLocated(By.css('#rightPanel > h1')),5000)
            await driver.wait(until.elementIsVisible(aboutUs_title),5000)
            const aboutUs_title_element = await aboutUs_title.getText();
            assert(aboutUs_title_element.includes('ParaSoft Demo Website'))
    })
    it('Footer Panel - Services', async function () {
        await driver.get(localHost);
        const services_footer = await driver.wait(until.elementLocated(By.css('#footerPanel > ul:nth-child(1) > li:nth-child(3) > a')),5000)
        await driver.wait(until.elementIsVisible(services_footer),5000)
        services_footer.click()
        const first_title = await driver.wait(until.elementLocated(By.css('#rightPanel > span:nth-child(4)')),5000)
        await driver.wait(until.elementIsVisible(first_title),5000)
        const first_title_element = await first_title.getText()
        assert(first_title_element.includes('Available Bookstore SOAP services'))
}) 
it('Footer Panel - Products', async function () {
     await driver.get(localHost);
              const beforeAddress = await driver.getCurrentUrl();
              const products_footer = await driver.wait(until.elementLocated(By.css('#headerPanel > ul.leftmenu > li:nth-child(4) > a')),5000)
              await driver.wait(until.elementIsVisible(products_footer), 5000);
              await products_footer.click()
              const afterAddress = await driver.getCurrentUrl();
              assert.notStrictEqual(
                  beforeAddress,
                  afterAddress,
                  'The URLs are the same, but they should be different!'
              );
              const products_title = await driver.wait(until.elementLocated(By.css('#main > section.HERO-BANNER > div.b-frame > div > div > div.content > h1')),5000)
              await driver.wait(until.elementIsVisible(products_title), 5000);
              const products_title_element = await products_title.getText();
              assert(products_title_element.includes('Innovative and Intelligent Software Testing Platform'))
   
})
it('Footer Panel - Solutions', async function () { 
            await driver.get(localHost);
            const beforeAddress = await driver.getCurrentUrl();
            const solutions_footer = await driver.wait(until.elementLocated(By.css('#headerPanel > ul.leftmenu > li:nth-child(5) > a')),5000)
            await driver.wait(until.elementIsVisible(solutions_footer), 5000);
            await solutions_footer.click()
            const afterAddress = await driver.getCurrentUrl();
            assert.notStrictEqual(
                beforeAddress,
                afterAddress,
                'The URLs are the same, but they should be different!'
            );
            const solutions_title = await driver.wait(until.elementLocated(By.css('#main > section.HERO-BANNER > div.b-frame > div > div > div > h1')),5000)
            await driver.wait(until.elementIsVisible(solutions_title), 5000);
            const solutions_title_element = await solutions_title.getText();
            assert(solutions_title_element.includes('The Parasoft Continuous Quality Testing Platform: AI-Powered Test Automation Solutions'))
        })
        it('Footer Panel - Forums', async function () { 
            await driver.get(localHost);
            const beforeAddress = await driver.getCurrentUrl();
            const forums_footer = await driver.wait(until.elementLocated(By.css('#footerPanel > ul:nth-child(1) > li:nth-child(6) > a')),5000)
            await driver.wait(until.elementIsVisible(forums_footer), 5000);
            await forums_footer.click()
            const afterAddress = await driver.getCurrentUrl();
            assert.notStrictEqual(
                beforeAddress,
                afterAddress,
                'The URLs are the same, but they should be different!'
            );
const forums_title = await driver.wait(until.elementLocated(By.css('#app > div:nth-child(2) > div:nth-child(1) > div > div > div.css-1mjrknk-Banner-styles-middleContainer > div > div > div > div > div > div.css-178hqk6-Banner-styles-titleWrap > h1')),5000)
await driver.wait(until.elementIsVisible(forums_title), 5000);
const forums_title_element = await forums_title.getText()
assert(forums_title_element.includes('Parasoft Forums'))
    })
    it('Footer Panel - Sitemap', async function () { 
        await driver.get(localHost);
        const siteMap_footer = await driver.wait(until.elementLocated(By.css('#footerPanel > ul:nth-child(1) > li:nth-child(7) > a')),5000)
        await driver.wait(until.elementIsVisible(siteMap_footer), 5000);
        siteMap_footer.click()
       
        const solutions = await driver.wait(until.elementLocated(By.css('#rightPanel > ul.leftmenu > li.Solutions')),5000)
       await driver.wait(until.elementIsVisible(solutions), 5000);
       const solutions_element = await solutions.getText()

       assert(solutions_element.includes('Solutions'))

})
it('Footer Panel - Contact Us. Correct Name, Email, Phone and Message', async function () { 
    await driver.get(localHost);
   const contact_footer = await driver.wait(until.elementLocated(By.css('#footerPanel > ul:nth-child(1) > li:nth-child(8) > a')),5000)
   await driver.wait(until.elementIsVisible(contact_footer), 5000);
   contact_footer.click()

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
it('Footer Panel - Contact Us. Correct Name, Email and Phone. Empty Message field throws error msg', async function () { 
    await driver.get(localHost);
   const contact_footer = await driver.wait(until.elementLocated(By.css('#footerPanel > ul:nth-child(1) > li:nth-child(8) > a')),5000)
   await driver.wait(until.elementIsVisible(contact_footer), 5000);
   contact_footer.click()

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
it('Footer Panel - Contact Us. Correct Name, Email and Message. Empty Phone field throws error msg', async function () { 
    await driver.get(localHost);
   const contact_footer = await driver.wait(until.elementLocated(By.css('#footerPanel > ul:nth-child(1) > li:nth-child(8) > a')),5000)
   await driver.wait(until.elementIsVisible(contact_footer), 5000);
   contact_footer.click()

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
it('Footer Panel - Contact Us. Correct Name, Phone and Message. Empty Email field throws error msg', async function () { 
    await driver.get(localHost);
   const contact_footer = await driver.wait(until.elementLocated(By.css('#footerPanel > ul:nth-child(1) > li:nth-child(8) > a')),5000)
   await driver.wait(until.elementIsVisible(contact_footer), 5000);
   contact_footer.click()

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
it('Footer Panel - Contact Us. Correct Email, Phone and Message. Empty Name field throws error msg', async function () { 
    await driver.get(localHost);
   const contact_footer = await driver.wait(until.elementLocated(By.css('#footerPanel > ul:nth-child(1) > li:nth-child(8) > a')),5000)
   await driver.wait(until.elementIsVisible(contact_footer), 5000);
   contact_footer.click()

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