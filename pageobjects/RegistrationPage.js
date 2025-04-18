const { expect } = require("@playwright/test");
class RegistrationPage{
    constructor(page){
        this.page = page;
        this.btnContinueRegister = page.getByRole('link', { name: 'Continue', exact: true });
        this.txtFirstName = page.getByPlaceholder('First Name');
        this.txtLastName = page.getByPlaceholder('Last Name');
        this.txtEmail = page.getByPlaceholder('E-Mail');
        this.txtTelephone = page.getByPlaceholder('Telephone');
        this.txtPassword = page.getByPlaceholder('Password', {exact:true});
        this.txtPasswordConfirm = page.getByPlaceholder('Password Confirm');
        this.chkAgree = page.getByText('I have read and agree to the');
        this.btnContinue = page.getByRole('button', { name: 'Continue' });
        this.errPrivacyPolicy = page.locator(".alert.alert-danger.alert-dismissible");
        this.lblAccountRegister = page.locator('#account-register');
        this.formAccount = page.locator('#account');
        this.errPassword = page.locator("//input[@id='input-password']/following-sibling::div");
        this.msgSuccessHeading = page.locator('h1');
    }

    async goToRegisterPage(){
        await this.btnContinueRegister.click();
    }

    async submitForm(){
        await this.btnContinue.click();
    }

    async validateRegistration(){
        const expectedPrivacyPolicyMessage = 'Warning: You must agree to the Privacy Policy!';
        await expect(this.errPrivacyPolicy).toContainText(expectedPrivacyPolicyMessage);
        expect(String(await this.errPrivacyPolicy.textContent()).trim()).toEqual(expectedPrivacyPolicyMessage);
        await expect(this.formAccount).toContainText('First Name must be between 1 and 32 characters!');
        await expect(this.formAccount).toContainText('Last Name must be between 1 and 32 characters!');
        await expect(this.formAccount).toContainText('E-Mail Address does not appear to be valid!');
        await expect(this.formAccount).toContainText('Telephone must be between 3 and 32 characters!');
        await expect(this.errPassword).toHaveText('Password must be between 4 and 20 characters!');
    }

    async fillRegistrationForm(){
        await this.txtFirstName.fill("Nagarjun");
        await this.txtLastName.fill("Reddy");
        await this.txtEmail.fill("nag+asdfg4@gmail.com");
        await this.txtTelephone.fill("+91 8934883838");
        await this.txtPassword.fill("Welcome@2025");
        await this.txtPasswordConfirm.fill("Welcome@2025");
        await this.chkAgree.check();
    }

    async validateSuccessMessage(){
        const expectedSuccessHeading = "Your Account Has Been Created!";
        await expect(this.msgSuccessHeading).toContainText(expectedSuccessHeading);
        expect(String(await this.msgSuccessHeading.textContent()).trim()).toEqual(expectedSuccessHeading);
    }


}
module.exports = {RegistrationPage};