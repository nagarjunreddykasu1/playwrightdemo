const { test, expect } = require("@playwright/test");
const { POManager } = require("../pageobjects/POManager");
const dataset = JSON.parse(JSON.stringify(require("../utils/config.json")));

let loginPage, registerPage;
//for (const data of dataset) {
dataset.forEach((data) => {
  test.beforeEach(async ({ page }) => {
    const poManager = new POManager(page);
    loginPage = poManager.getLoginPage();
    registerPage = poManager.getRegistrationPage();
    await loginPage.goTo(data.url);
  });
});

test("Validate missing mandatory fields", async ({ page }) => {
  await registerPage.goToRegisterPage();
  await registerPage.submitForm();
  await registerPage.validateRegistration();
});

test("Validate successfull Registration of Account", async ({ page }) => {
  await registerPage.goToRegisterPage();
  await registerPage.fillRegistrationForm();
  await registerPage.submitForm();
  await registerPage.validateSuccessMessage();
});

test.beforeAll(async ({page})=>{
  console.log("Before all hook");
})

test.afterEach(async ({page})=>{
  console.log("after each hook");
})

test.afterAll(async ({page})=>{
  console.log("After all hook");
})