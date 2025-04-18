const { test, expect } = require("@playwright/test");
const { ai } = require("@zerostep/playwright");
const { POManager } = require("../pageobjects/POManager");
const dataset = JSON.parse(JSON.stringify(require("../utils/config.json")));

for (const data of dataset) {
  test("Validate missing mandatory fields", async ({ page }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const registerPage = poManager.getRegistrationPage();
    await loginPage.goTo(data.url);

    //const aiArgs = { page, test };
    //await ai(`Enter the E-Mail Address as ${data.username}`, aiArgs);
    //await ai(`Enter the Password as ${data.password}`, aiArgs);
    //await ai("Click on Login button", aiArgs);

    await registerPage.goToRegisterPage();
    await page.waitForTimeout(5000);
    const aiArgs = { page, test };
    //await ai("Click Continue button", aiArgs);
    //await ai("Fill out the form with realistic values", aiArgs);

    await ai("Enter the First Name as 'Nagarjun'", aiArgs);
    await ai("Enter the Last Name as 'Reddy'", aiArgs);
    await ai("Enter the E-Mail Address as 'nagarjun@gmail.com'", aiArgs);
    await ai("Enter the Telephone as '+91 9030086420'", aiArgs);
    await ai("Enter the Password as 'Welcome@2025'", aiArgs);
    await page.getByPlaceholder('Password Confirm').fill("Welcome@2025");
    await page.getByText('I have read and agree to the').check();
    
    await ai("Click Continue button", aiArgs);
    
    

    await page.pause();
  });
}
