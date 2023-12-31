/// <reference types="cypress" />

import LoginPage from "../pages/loginPage";
import testData from "../../../fixtures/testData.json";

const PAGE_URL = testData.loginPageUrl;
const URERNAME = testData.userName;
const PASSWORD = testData.password;

const page = new LoginPage();

let newTestData;
before("Get test data from JSON file", () => {
  cy.fixture("testData.json").then((dd) => {
    newTestData = dd;
  });
});

beforeEach("Navigating to the testing page", () => {
  cy.visit(PAGE_URL);
});

describe("Login page tests", () => {
  it("Verifying user login", () => {
    const userloggedInPage = page.act_login(URERNAME, PASSWORD);
    cy.isElementHasCorrectSignature(
      userloggedInPage.pageHeading(),
      "My account"
    );
    cy.isElementHasCorrectSignature(
      userloggedInPage.userNameInfoLnk(),
      "Brad Pitt"
    );
    cy.isElementHasCorrectSignature(userloggedInPage.logOutLnk(), "Sign out");
    cy.isPageTitleCorrect("My account - My Shop");
    cy.isPageUrlIncludeTargetPath("controller=my-account");
  });

  it("Verifying user log-out", () => {
    const userloggedInPage = page.act_login(URERNAME, PASSWORD);
    cy.isElementHasCorrectSignature(
      userloggedInPage.userNameInfoLnk(),
      "Brad Pitt"
    );
    userloggedInPage.act_logOut();
    cy.url().should("include", "uthentication&back");
    cy.title().and("eq", "Login - My Shop");
    cy.isElementHasCorrectSignature(page.signInBtn(), "Sign in");
  });

  it("Verifying alert message for the login field", () => {
    page.act_login(" ", PASSWORD);
    cy.isElementHasCorrectSignature(
      page.errorMsg(),
      newTestData.loginFldErrorMessage
    );
  });

  it("Verifying alert message for the password field", () => {
    page.act_login(URERNAME, " ");
    cy.isElementHasCorrectSignature(
      page.errorMsg(),
      newTestData.passwordFldErrorMessage
    );
  });

  it("Verify alert messages using data-driven testing", () => {
    cy.fixture("loginData.json").then((data) => {
      data.forEach((userData) => {
        page.act_login(userData.userName, userData.password);
        cy.isElementHasCorrectSignature(
          page.errorMsg(),
          userData.targetErrorMessage
        );
        page.act_clearLoginForm();
      });
    });
  });

  it("Verifying forgot your password link", () => {
    const forgotPasswordPage = page.act_clickForgotPasswordLnk();
    cy.isPageTitleCorrect("Forgot your password - My Shop");
    cy.isPageUrlIncludeTargetPath("controller=password");
    forgotPasswordPage.emailAddressFld().should("be.visible");
    forgotPasswordPage.retrievePasswordBtn().should("be.visible");
  });
});
