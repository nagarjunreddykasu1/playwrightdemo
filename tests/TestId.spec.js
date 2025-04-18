const { test, expect } = require("@playwright/test");

test("Test ID attribute", async ({page})=>{
    await page.goto("https://www.microsoft.com/en-us/dynamics-365");
    await page.getByTestId("Solutions").click();
})