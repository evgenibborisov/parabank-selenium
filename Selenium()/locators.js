
const { By } = require('selenium-webdriver');
//let localHost = 'https://parabank.parasoft.com/' //
let localHost = 'http://localhost:8080/parabank/index.htm'
let loggedUrl = 'http://localhost:8080/parabank/overview.htm'
let CUSTOMER_FORM = '#customerForm';
let registrationData = {};

let ACCOUNT = {
    welcome_msg: By.css('h1#welcome_msg'),
    overview: By.css('h1#overview'),
    created: By.css('p#created'),
    banica: By.css("h2.title:has-text('HKError!')"),
    successful_reg: By.css('#rightPanel > h1'),
    logged_in: By.css('#leftPanel > p'),
    overview_msg: By.css('#showOverview > h1'),
    first_acc: By.css('#accountTable > tbody > tr:nth-child(1) > td:nth-child(1) > a'),
    details: By.css('#accountDetails > h1')
}

let REG_FORM = {
    FIRST_NAME: By.css('#customerForm #customer\\.firstName'),
    LAST_NAME: By.css('#customerForm #customer\\.lastName'),
    ADDRESS: By.css('#customerForm #customer\\.address\\.street'),
    CITY: By.css('#customerForm #customer\\.address\\.city'),
    STATE: By.css('#customerForm #customer\\.address\\.state'),
    ZIP_CODE: By.css('#customerForm #customer\\.address\\.zipCode'),
    PHONE_NUMBER: By.css('#customerForm #customer\\.phoneNumber'),
    SSN: By.css('#customerForm #customer\\.ssn'),
    USERNAME: By.css('#customerForm #customer\\.username'),
    PASSWORD: By.css('#customerForm #customer\\.password'),
    REPASSWORD: By.css('#customerForm #repeatedPassword'),
    REGISTER_BUTTON: By.css('#customerForm input.button[value="Register"]')
};

let THROW = {
    error: By.css("#rightPanel > h1"),
    internal_error_message: By.css("#rightPanel > p"),
    empty_userOrPass_message: By.css("#rightPanel > p"),
    wrong_pass : By.css("#rightPanel > p")
};

let REG_ERROR = {
    username_error_message: By.css("#customerForm #customer\\.username\\.errors"),
    password_error_message: By.css("#customerForm #customer\\.password\\.errors"),
    repassword_error_message: By.css("#customerForm #repeatedPassword\\.errors"),
    first_name_error_message: By.css("#customerForm #customer\\.firstName\\.errors"),
    last_name_error_message: By.css("#customerForm #customer\\.lastName\\.errors"),
    address_error_message: By.css("#customerForm #customer\\.address\\.street\\.errors"),
    city_error_message: By.css("#customerForm #customer\\.address\\.city\\.errors"),
    state_error_message: By.css("#customerForm #customer\\.address\\.state\\.errors"),
    zip_error_message: By.css("#customerForm #customer\\.address\\.zipCode\\.errors"),
    ssn_error_message: By.css("#customerForm #customer\\.ssn\\.errors"),
};

let CUSTOMER_LOGIN = {
    USERNAME: By.css('#loginPanel > form > div:nth-child(2) > input'),
    PASSWORD: By.css('#loginPanel > form > div:nth-child(4) > input'), 
    LOGIN_BUTTON: By.css('#loginPanel > form > div:nth-child(5) > input'),
    FORGOT_LOGIN_INFO: By.css('#loginPanel > p:nth-child(2) > a'),
    REGISTER_LINK: By.css('#loginPanel > p:nth-child(3) > a')
};

let LEFT_MENU = {
    
    ABOUT_US: By.css('#headerPanel > ul.leftmenu > li:nth-child(2) > a'),
    SERVICES: By.css('#headerPanel > ul.leftmenu > li:nth-child(3) > a'),
    PRODUCTS: By.css('#headerPanel > ul.leftmenu > li:nth-child(4) > a'),
    LOCATIONS: By.css('#headerPanel > ul.leftmenu > li:nth-child(5) > a'),
    ADMIN_PAGE: By.css('#headerPanel > ul.leftmenu > li:nth-child(6) > a')

};

let FOOTER_MENU = {
    HOME: By.css('#footerPanel > ul:nth-child(1) > li:nth-child(1) > a'),
    ABOUT_US: By.css('#footerPanel > ul:nth-child(1) > li:nth-child(2) > a'),
    SERVICES: By.css('#footerPanel > ul:nth-child(1) > li:nth-child(3) > a'),
    PRODUCTS: By.css('#footerPanel > ul:nth-child(1) > li:nth-child(4) > a'),
    LOCATIONS: By.css('#footerPanel > ul:nth-child(1) > li:nth-child(5) > a'),
    FORUM: By.css('#footerPanel > ul:nth-child(1) > li:nth-child(6) > a'),
    SITE_MAP: By.css('#footerPanel > ul:nth-child(1) > li:nth-child(7) > a'),
    CONTACT_US: By.css('#footerPanel > ul:nth-child(1) > li:nth-child(8) > a')
};
let HEADER_MENU = {
    HOME_BUTTON: By.css('#headerPanel .button .home a'),
    ABOUT_BUTTON: By.css('#headerPanel .button .aboutus a'),
    ABOUT_BUTTON_URL: 'http://localhost:8080/parabank/about.htm',
    ABOUT_US_TITLE: By.css('#rightPanel > h1'),
    ABOUT_US_REDIRECT: By.css('#rightPanel > p:nth-child(4) > a'),
    CONTACT_BUTTON: By.css('#headerPanel .button .contact a'),
    CONTACT_BUTTON_URL: 'http://localhost:8080/parabank/contact.htm',
    CUSTOMER_NAME: By.css('#name'),
    CUSTOMER_EMAIL: By.css('#email'),
    CUSTOMER_PHONE: By.css('#phone'),
    CUSTOMER_MESSAGE: By.css('#message'),
    CUSTOMER_SEND_MESSAGE: By.css('#contactForm > table > tbody > tr:nth-child(5) > td:nth-child(2) > input'),
    CUSTOMER_THANK_YOU: By.css('#rightPanel > p:nth-child(2)')
};

let ATM_SERVICES = {
        WITHDRAW_FUNDS: By.css('#rightPanel > ul.services > li:nth-child(2) > a'),
        TRANSFER_FUNDS: By.css('#rightPanel > ul.services > li:nth-child(3) > a'),
        CHECK_BALANCES: By.css('#rightPanel > ul.services > li:nth-child(4) > a'),
        MAKE_DEPOSITS: By.css('#rightPanel > ul.services > li:nth-child(5) > a')
    }
let ONLINE_SERVICES = {
        BILL_PAY: By.css('#rightPanel > ul.servicestwo > li:nth-child(2) > a'),
        ACCOUNT_HISTORY: By.css('#rightPanel > ul.servicestwo > li:nth-child(3) > a'),
        TRANSFER_FUNDS: By.css('#rightPanel > ul.servicestwo > li:nth-child(4) > a')
    };


let READ_MORE = { 
    INFO_FOR_SERVICES: By.css('#rightPanel > p:nth-child(4) > a'),
    INFO_FOR_NEWS: By.css('#rightPanel > p:nth-child(7) > a')
};

let RECEIVER = {
    ACC: By.css('#accountTable > tbody > tr:nth-child(2) > td:nth-child(1) > a'),
    ACC_BALANCE: By.css('#balance')
};

let SENDER = {
    ACC: By.css('#accountTable > tbody > tr:nth-child(2) > td:nth-child(1) > a'),
    ACC_BALANCE: By.css('#balance')
};

let SERVICES = {
    LOG_OUT: By.css('#leftPanel > ul > li:nth-child(8) > a'),
    OPEN_NEW_ACC_Service: By.css('#leftPanel > ul > li:nth-child(1) > a'),
    OPEN_NEW_ACC_Btn: By.css('#openAccountForm > form > div > input'),
    OPEN_NEW_ACC_Checking: {value: '0'},
    OPEN_NEW_ACC_Savings: {value: '1'},
    OPEN_NEW_ACC_Msg: By.css('#openAccountResult > h1'),
    ACCOUNT_OVERVIEW_Service: By.css('#leftPanel a >> text=Accounts Overview'),
    ACCOUNT_OVERVIEW_Title: By.css('#showOverview > h1'),
    ACCOUNT_OVERVIEW_AccNum: By.css('#accountTable > thead > tr > th:nth-child(1)'),
    ACCOUNT_OVERVIEW_Balance: By.css('#accountTable > thead > tr > th:nth-child(2)'),
    ACCOUNT_OVERVIEW_Amount: By.css('#accountTable > thead > tr > th:nth-child(3)'),
    ACCOUNT_OVERVIEW_LinkProfile_N1: By.css('#accountTable > tbody > tr:nth-child(1) > td:nth-child(1) > a'),
    ACCOUNT_OVERVIEW_LinkProfile_N2: By.css('#accountTable > tbody > tr:nth-child(2) > td:nth-child(1) > a'),
    ACCOUNT_OVERVIEW_MonthOption_ALL: By.css('#month option[value="All"]'),
    ACCOUNT_OVERVIEW_MonthOption_Dec: By.css('#month option[value="декември"]'),
    ACCOUNT_OVERVIEW_TransactionTable: By.css('#transactionTable'),
    ACCOUNT_OVERVIEW_TT_Date: By.css('#transactionTable > thead > tr > th:nth-child(1)'),
    ACCOUNT_OVERVIEW_TT_Transaction: By.css('#transactionTable > thead > tr > th:nth-child(2)'),
    ACCOUNT_OVERVIEW_TT_Debit: By.css('#transactionTable > thead > tr > th:nth-child(3)'),
    ACCOUNT_OVERVIEW_TT_Credit: By.css('#transactionTable > thead > tr > th:nth-child(4)'),
    ACCOUNT_OVERVIEW_TT_FirstTransaction: By.css('#transactionTable > tbody > tr > td:nth-child(2) > a'),
    USER: By.css('#leftPanel > p'),
    ACCOUNT_OVERVIEW_TRANSACTION_INFO: {
        Title: By.css('#rightPanel > h1'),
        Id: By.css('#rightPanel > table > tbody > tr:nth-child(1) > td:nth-child(1) > b'),
        Date: By.css('#rightPanel > table > tbody > tr:nth-child(2) > td:nth-child(1) > b'),
        Description: By.css('#rightPanel > table > tbody > tr:nth-child(3) > td:nth-child(1) > b'),
        Type: By.css('#rightPanel > table > tbody > tr:nth-child(4) > td:nth-child(1) > b'),
        Ammount: By.css('#rightPanel > table > tbody > tr:nth-child(5) > td:nth-child(1) > b')
    },
    TRANSFER_FUNDS_Service: By.css('#leftPanel a >> text=Transfer Funds'),
    TRANSFER_FUNDS_Amount: By.css('#amount'),
    TRANSFER_FUNDS_From: By.css('#fromAccountId'),
    TRANSFER_FUNDS_To: By.css('#toAccountId'),
    TRANSFER_FUNDS_Button: By.css('.button[type="submit"][value="Transfer"]'),
    TRANSFER_FUNDS_Completed: {
        Title: By.css('#showResult > h1'),
        Text: By.css('#showResult > p:nth-child(2)')
    },
    THROW_ERROR: {
        TITLE: By.css('#errorContainer > h1'),
        MSG: By.css('#errorContainer > p')
    },
    BILL_PAY_Service: By.css('#leftPanel > ul > li:nth-child(4) > a'),
    BILL_PAY_PayeeName: By.css('#billpayForm > form > table > tbody > tr:nth-child(1) > td:nth-child(2) > input'),
    BILL_PAY_Address: By.css('#billpayForm > form > table > tbody > tr:nth-child(2) > td:nth-child(2) > input'),
    BILL_PAY_City: By.css('#billpayForm > form > table > tbody > tr:nth-child(3) > td:nth-child(2) > input'),
    BILL_PAY_State: By.css('#billpayForm > form > table > tbody > tr:nth-child(4) > td:nth-child(2) > input'),
    BILL_PAY_Zip: By.css('#billpayForm > form > table > tbody > tr:nth-child(5) > td:nth-child(2) > input'),
    BILL_PAY_Phone: By.css('#billpayForm [name="payee.phoneNumber"]'),
    BILL_PAY_AccNum: By.css('#billpayForm > form > table > tbody > tr:nth-child(8) > td:nth-child(2) > input'),
    BILL_PAY_AccNum_Conf: By.css('#billpayForm > form > table > tbody > tr:nth-child(9) > td:nth-child(2) > input'),
    BILL_PAY_Amount: By.css('#billpayForm > form > table > tbody > tr:nth-child(11) > td:nth-child(2) > input'),
    BILL_PAY_Option: By.css('#billpayForm > form > table > tbody > tr:nth-child(13) > td:nth-child(2) > select'),
    BILL_PAY_Button: By.css('#billpayForm .button[value="Send Payment"]'),
    BILL_PAY_Completed: {
        Title: By.css('#billpayResult > h1'),
        Text: By.css('#billpayResult > p:nth-child(2)')
    },
    FIND_TRANSACTIONS: {
        NOW: By.css('#leftPanel > ul > li:nth-child(5) > a'),
        BILL_PAYMENT_TRANSACTION: By.css('#transactionTable > tbody > tr:nth-child(2) > td:nth-child(2) > a'),
        CHOOSE_ACCOUNT: By.css('#accountId'),
        CHOOSE_FIELD_ID: By.css('#transactionId'),
        BUTTON_ID: By.css('#findById'),
        CHOOSE_TRANS_DATE: By.css('#transactionDate'),
        BUTTON_DATE: By.css('#findByDate'),
        TRANS_RESULTS: By.css('#resultContainer > h1'),
        TRANS_TABLE: By.css('#transactionTable > thead > tr > th:nth-child(1)'),
        TRANS_TABLE_FIRST_RESULT: By.css('#transactionBody > tr:nth-child(2) > td:nth-child(2) > a'),
        DATE_ROW: By.css('#rightPanel > table > tbody > tr:nth-child(2) > td:nth-child(2)'),
        DATE_RANGE_1: By.css('#fromDate'),
        DATE_RANGE_2: By.css('#toDate'),
        BY_DATE_RANGE_BUTTON: By.css('#findByDateRange'),
        BY_AMOUNT: By.css('#amount')
    },
    UPDATE: {
        MY_PROFILE: By.css('#leftPanel > ul > li:nth-child(6) > a'),
        FIRST_NAME: By.css('#updateProfileForm #customer\\.firstName'),
        LAST_NAME: By.css('#updateProfileForm #customer\\.lastName'),
        CITY: By.css('#updateProfileForm #customer\\.address\\.city'),
        STATE: By.css('#updateProfileForm #customer\\.address\\.state'),
        ZIP: By.css('#updateProfileForm #customer\\.address\\.zipCode'),
        PHONE_NUMBER: By.css('#updateProfileForm #customer\\.phoneNumber'),
        BUTTON: By.css('#updateProfileForm > form > table > tbody > tr:nth-child(8) > td:nth-child(2) > input')
    },
    LOAN: {
        REQUEST: By.css('#leftPanel > ul > li:nth-child(7) > a'),
        SUM: By.css('#amount'),
        FIRST_PAYMENT: By.css('#downPayment'),
        APPLY: By.css('#requestLoanForm > form > table > tbody > tr:nth-child(4) > td:nth-child(2) > input'),
        SUCCESS_TEXT: By.css('#loanRequestApproved > p:nth-child(1)'),
        STATUS: By.css('#loanStatus'),
        NEW_ACC_ID: By.css('#newAccountId'),
        NEW_ACC_BALANCE: By.css('#balance'),
        NEW_ACC_AVALIABLE: By.css('#availableBalance'),
        ERROR_TITLE: By.css('#requestLoanError > h1'),
        ERROR_MSG: By.css('#requestLoanError > p')
    },
    TITLE_FOR_SUCCESSFUL_UPDATE: By.css('#updateProfileResult > h1'),
    TEXT_FOR_SUCCESSFUL_UPDATE: By.css('#updateProfileResult > p'),
   
};




module.exports = {
    localHost,
    ACCOUNT,
    THROW,
    REG_FORM,
    REG_ERROR,
    CUSTOMER_LOGIN,
    LEFT_MENU,
    FOOTER_MENU,
    HEADER_MENU,
    ATM_SERVICES,
    ONLINE_SERVICES,
    READ_MORE,
    SERVICES,
    RECEIVER,
    SENDER,
    loggedUrl,
    registrationData,
    
  };
  //successfulRegistrationAndLogin