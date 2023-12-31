import LoggedInPage from "./loggedInPage";
import ForgotPasswordPage from "./forgotPasswordPage";

const userLoggedInPage = new LoggedInPage();
const forgotPasswordPage = new ForgotPasswordPage();

export default class LoginPage {
  signInBtn = () => cy.get(".login");
  usernameInp = () => cy.xpath("//input[@id='email']");
  passwordInp = () => cy.xpath("//input[@id='passwd']");
  loginBtn = () => cy.xpath("//button[@id='SubmitLogin']");
  errorMsg = () => cy.get(".alert-danger ol");
  forgotPasswordLnk = () => cy.get(".lost_password.form-group a");

  act_login = (username, password) => {
    this.usernameInp().type(username);
    this.passwordInp().type(password);
    this.loginBtn().click();

    return userLoggedInPage;
  };

  act_clearLoginForm = () => {
    this.usernameInp().clear();
    this.passwordInp().clear();
  };

  act_clickForgotPasswordLnk = () => {
    this.forgotPasswordLnk().click();

    return forgotPasswordPage;
  };
}
