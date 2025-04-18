const { test, expect } = require("@playwright/test");
const { POManager } = require("../pageobjects/POManager");
const dataset = JSON.parse(JSON.stringify(require("../utils/credentials.json")));

for (const data in dataset) {
  test(`Validate Login with ${data} credentials`, async ({ page }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const loginData = dataset[data];
    await loginPage.goTo(loginData.url);
    await loginPage.validateLogin(loginData.username, loginData.password);
    if(data == "Invalid"){
        const expectedErrorMessage = "Warning: No match for E-Mail Address and/or Password.";
        await expect(loginPage.errInvalidCredentials).toHaveText(expectedErrorMessage);
        expect(String(await loginPage.errInvalidCredentials.textContent()).trim()).toEqual(expectedErrorMessage);
    }
    else if(data == "Valid"){
        await expect(loginPage.headingMyAccount).toHaveText('My Account');
        await expect(loginPage.cardBody).toBeVisible();
    }
  });
}
