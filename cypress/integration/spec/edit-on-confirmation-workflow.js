import { universalElements } from "../../support/elements.js";
import { giftCardPage } from "../../support/elements.js";
import { confirmationPage } from "../../support/elements.js";
import { vars } from "../../support/variables.js";

describe("Verify Edit on  Summary functionality", () => {
  it("Select $50 and Validate page responds", () => {
    cy.get(giftCardPage.radio50).click();
  });

  it("Enter Email Address", () => {
    cy.get(giftCardPage.emailField).type(vars.emailAddress1);
  });

  it("Enter First Name and Last Name", () => {
    cy.get(giftCardPage.firstNameField).type(vars.firstName);

    cy.get(giftCardPage.lastNameField).type(vars.lastName);
  });

  it("Select Checkout", () => {
    //validate button is no longer disabled
    cy.get(giftCardPage.checkOutButton)
      .should("have.attr", "class")
      .and("not.contains", "disabled");

    cy.get(giftCardPage.checkOutButton).eq(0).click({ force: true });
  });

  it("Select the Edit button and validate gift card selection page retained user information", () => {
    cy.get(confirmationPage.editButton).click();

    //assuming previous checkbox selection should be retained
    cy.get(giftCardPage.radio50).should("be.checked");

    //must validate via field parent as field itself does not log email in DOM
    cy.get(giftCardPage.emailField)
      .should("have.attr", "data-email-recipient-email")
      .and("contains", vars.emailAddress1);

    //the same applies to first name and last name fields
    cy.get(giftCardPage.nameDataHost)
      .should("have.attr", "data-name-purchaser-first-name")
      .and("contains", vars.firstName);

    cy.get(giftCardPage.nameDataHost)
      .should("have.attr", "data-name-purchaser-last-name")
      .and("contains", vars.lastName);
  });

  it("Edit information on gift card selection page", () => {
    cy.get(giftCardPage.radio100).click();

    cy.get(giftCardPage.emailField).clear();

    cy.get(giftCardPage.firstNameField).clear();

    cy.get(giftCardPage.lastNameField).clear();

    cy.get(giftCardPage.emailField).type(vars.emailAddress2);

    cy.get(giftCardPage.firstNameField).type(vars.lastName);

    cy.get(giftCardPage.lastNameField).type(vars.firstName);
  });

  it("Select Checkout and validate changes are applied to Summary Page", () => {
    cy.get(giftCardPage.checkOutButton).eq(0).click({ force: true });

    cy.get(confirmationPage.giftCardValue).should(($div) => {
      expect($div.text().trim()).equal("$100.00");
    });

    cy.get(confirmationPage.paymentAmount).should(($div) => {
      expect($div.text().trim()).equal("$80.00");
    });

    cy.get(confirmationPage.purchaserEmail).should(($div) => {
      expect($div.text().trim()).equal(vars.emailAddress2);
    });

    cy.get(confirmationPage.recipientEmail).should(($div) => {
      expect($div.text().trim()).equal(vars.emailAddress2);
    });
  });
});
