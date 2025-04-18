const { LoginPage } = require("./LoginPage");
const { RegistrationPage } = require("./RegistrationPage");
const { MyAccountPage } = require("./MyAccountPage");

class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.registrationPage = new RegistrationPage(this.page);
    this.myAccountPage = new MyAccountPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getRegistrationPage() {
    return this.registrationPage;
  }

  getMyAccountPage() {
    return this.myAccountPage;
  }
}

module.exports = { POManager };
