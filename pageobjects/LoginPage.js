class LoginPage {
  constructor(page) {
    this.page = page;
    this.txtUsername = page.getByPlaceholder("E-Mail Address");
    this.txtPassword = page.getByPlaceholder("Password");
    this.btnLogin = page.locator("[value='Login']");
    this.errInvalidCredentials = page.locator(".alert.alert-danger.alert-dismissible");
    this.headingMyAccount = page.getByRole('heading', {name:'My Account'});
    this.cardBody = page.locator('.card-body.text-center').first();
    
  }

  async goTo(url) {
    await this.page.goto(url);
  }

  async validateLogin(username, password) {
    await this.txtUsername.fill(username);
    await this.txtPassword.fill(password);
    await this.btnLogin.click();
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { LoginPage };
