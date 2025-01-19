let { Builder, By, until } = require('selenium-webdriver');
let assert = require('assert');
let firefox = require('selenium-webdriver/firefox'); // Променяме за Firefox

let { localHost, CUSTOMER_LOGIN, LEFT_MENU, FOOTER_MENU, ONLINE_SERVICES, ATM_SERVICES, READ_MORE, REG_ERROR } = require('../locators.js');

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
        it('Header Panel - About Us', async function () {
            await driver.get(localHost);
            
            const aboutUs_header = await driver.wait(until.elementLocated(By.css('#headerPanel > ul.leftmenu > li:nth-child(2) > a')),5000)
            await driver.wait(until.elementIsVisible(aboutUs_header),5000)
            aboutUs_header.click()

            const title = await driver.wait(until.elementLocated(By.css('#rightPanel > h1')),5000)
            await driver.wait(until.elementIsVisible(title),5000)
            const title_element = await title.getText()
            assert(title_element.includes('ParaSoft Demo Website'))
        })
        it('Header Panel - Services', async function () {
            await driver.get(localHost);

            const services_header = await driver.wait(until.elementLocated(By.css('#headerPanel > ul.leftmenu > li:nth-child(3) > a')),5000)
            await driver.wait(until.elementIsVisible(services_header),5000)
            services_header.click()

            const tbody = await driver.wait(until.elementLocated(By.css('tbody')),5000)
            await driver.wait(until.elementIsVisible(tbody),5000)
            const tbody_isVisible = await tbody.isDisplayed();
            assert.strictEqual(tbody_isVisible, true, 'Element is not visible');
            
            const first_table = await driver.wait(until.elementLocated(By.css('#rightPanel > span:nth-child(4)')),5000)
            await driver.wait(until.elementIsVisible(first_table), 5000);
            const first_table_title = await first_table.getText()
            assert(first_table_title.includes('Available Bookstore SOAP services'))

            const second_table = await driver.wait(until.elementLocated(By.css('#rightPanel > span:nth-child(9)')),5000)
            await driver.wait(until.elementIsVisible(second_table), 5000);
            const second_table_title = await second_table.getText()
            assert(second_table_title.includes('Bookstore services'))

            const third_table = await driver.wait(until.elementLocated(By.css('#rightPanel > span:nth-child(14)')),5000)
            await driver.wait(until.elementIsVisible(third_table), 5000);
            const third_table_title = await third_table.getText()
            assert(third_table_title.includes('Available ParaBank SOAP services'))

            const fourth_table = await driver.wait(until.elementLocated(By.css('#rightPanel > span:nth-child(19)')),5000)
            await driver.wait(until.elementIsVisible(fourth_table), 5000);
            const fourth_table_title = await fourth_table.getText()
            assert(fourth_table_title.includes('ParaBank services'))

            const rest_services = await driver.wait(until.elementLocated(By.css('#rightPanel > span:nth-child(24)')),5000)
            await driver.wait(until.elementIsVisible(rest_services), 5000);
            const rest_services_title = await rest_services.getText()
            assert(rest_services_title.includes('Available RESTful services'))
        })
        it('Header Panel - Products', async function () { 
            await driver.get(localHost);
            const beforeAddress = await driver.getCurrentUrl();
            const products_header = await driver.wait(until.elementLocated(By.css('#headerPanel > ul.leftmenu > li:nth-child(4) > a')),5000)
            await driver.wait(until.elementIsVisible(products_header), 5000);
            await products_header.click()
            const afterAddress = await driver.getCurrentUrl();
            assert.notStrictEqual(
                beforeAddress,
                afterAddress,
                'The URLs are the same, but they should be different!'
            );
        })
        it('Header Panel - Solutions', async function () { 
            await driver.get(localHost);
            const beforeAddress = await driver.getCurrentUrl();
            const solutions_header = await driver.wait(until.elementLocated(By.css('#headerPanel > ul.leftmenu > li:nth-child(5) > a')),5000)
            await driver.wait(until.elementIsVisible(solutions_header), 5000);
            await solutions_header.click()
            const afterAddress = await driver.getCurrentUrl();
            assert.notStrictEqual(
                beforeAddress,
                afterAddress,
                'The URLs are the same, but they should be different!'
            );
        })
        it('Header Panel - Admin Page', async function () { 
           await driver.get(localHost);
           let adminUrl = 'http://localhost:8080/parabank/admin.htm'
           const admin_page = await driver.wait(until.elementLocated(By.css('#headerPanel > ul.leftmenu > li:nth-child(6) > a')),5000)
           await driver.wait(until.elementIsVisible(admin_page), 5000);
           admin_page.click()
           
           const title = await driver.wait(until.elementLocated(By.css('#rightPanel > h1')),5000)
           const title_element = await title.getText()
           assert(title_element.includes('Administration'))
           
           let initialize_btn = await driver.wait(until.elementLocated(By.css('#rightPanel > table > tbody > tr > td:nth-child(1) > form > table > tbody > tr > td:nth-child(1) > button')),5000)
           await driver.wait(until.elementIsVisible(initialize_btn), 5000);

      
           await initialize_btn.click()
           let msg = await driver.wait(until.elementLocated(By.xpath('//*[@id="rightPanel"]/p/b')), 5000);
           await driver.wait(until.elementIsVisible(msg), 5000);
           let msg_text = await msg.getText()

           assert(msg_text.includes('Database Initialized'))
           

           let clean_btn = await driver.wait(until.elementLocated(By.css('#rightPanel > table > tbody > tr > td:nth-child(1) > form > table > tbody > tr > td:nth-child(2) > button')),5000)
           await driver.wait(until.elementIsVisible(clean_btn), 5000);
        
        await clean_btn.click()
        msg = await driver.wait(until.elementLocated(By.xpath('//*[@id="rightPanel"]/p/b')), 5000);
        await driver.wait(until.elementIsVisible(msg), 5000);
        msg_text = await msg.getText()
       // console.log(msg_text)
        assert(msg_text.includes('Database Cleaned'))


        let on_off_btn = await driver.wait(until.elementLocated(By.css('#rightPanel > table > tbody > tr > td:nth-child(2) > form > table > tbody > tr > td:nth-child(3) > input')),5000)
        await driver.wait(until.elementIsVisible(on_off_btn), 5000);
       
        await on_off_btn.click()
        await driver.sleep(1000)
        let status = await driver.wait(until.elementLocated(By.xpath('//*[@id="rightPanel"]/table/tbody/tr/td[2]/form/table/tbody/tr/td[2]')),5000)
        await driver.wait(until.elementIsVisible(status), 5000);
        let status_text = await status.getText()
        assert(
            status_text.includes('Stopped') || status_text.includes('Running'),
            'Status text is neither "Stopped" nor "Running".'
        );
           
        })
    })