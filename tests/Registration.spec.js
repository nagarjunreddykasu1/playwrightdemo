const { test, expect } = require("@playwright/test");
const { POManager } = require("../pageobjects/POManager");
const dataset = JSON.parse(JSON.stringify(require("../utils/config.json")));

//test.describe.configure({mode:'parallel'});

for (const data of dataset) {
  test("Validate missing mandatory fields", async ({page}) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage()
    const registerPage = poManager.getRegistrationPage();
    await loginPage.goTo(data.url);
    await registerPage.goToRegisterPage();
    await registerPage.submitForm();
    await registerPage.validateRegistration();
  });
}

for (const data of dataset) {
test("@web Validate successfull Registration of Account", async({page})=>{
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage()
    const registerPage = poManager.getRegistrationPage();
    await loginPage.goTo(data.url);
    await registerPage.goToRegisterPage();
    await registerPage.fillRegistrationForm();
    await registerPage.submitForm();
    await registerPage.validateSuccessMessage();
})
}

test.beforeEach

// hooks --> annotations