import { universalElements } from "../../support/elements.js";
import { giftCardPage } from "../../support/elements.js";
import { confirmationPage } from "../../support/elements.js";
import { paymentPage } from "../../support/elements.js";
import { successPage } from "../../support/elements.js";
import { vars } from "../../support/variables.js";

describe("Verify $100 To Me Functionality", () => {
  it("Validate Gift Card content upon loading", () => {
    cy.get(universalElements.headerText).should("be.visible");

    cy.get(universalElements.headerText).should("have.text", "Buy a Gift Card");

    cy.get(giftCardPage.radio50).should("not.be.checked");

    cy.get(giftCardPage.radio100).should("not.be.checked");

    cy.get(giftCardPage.radio150).should("not.be.checked");

    cy.get(giftCardPage.radioOther).should("not.be.checked");

    cy.get(giftCardPage.giftCardMenu)
      .children("div")
      .first()
      .should(($div) => {
        expect($div.text().trim()).equal("20% off all gift cards");
      });

    cy.get(giftCardPage.giftCardValueHeader).should(
      "have.text",
      "Gift Card Value"
    );

    cy.get("input[type='radio']").should("have.length", 4);

    cy.get(giftCardPage.radio50)
      .siblings("span")
      .eq(0)
      .should(($div) => {
        expect($div.text().trim()).equal("$50");
      });

    cy.get(giftCardPage.radio50)
      .siblings("span")
      .eq(1)
      .should(($div) => {
        expect($div.text().trim()).equal("You pay $40.00");
      });

    cy.get(giftCardPage.radio100)
      .siblings("span")
      .eq(0)
      .should(($div) => {
        expect($div.text().trim()).equal("$100");
      });

    cy.get(giftCardPage.radio100)
      .siblings("span")
      .eq(1)
      .should(($div) => {
        expect($div.text().trim()).equal("You pay $80.00");
      });

    cy.get(giftCardPage.radio150)
      .siblings("span")
      .eq(0)
      .should(($div) => {
        expect($div.text().trim()).equal("$150");
      });

    cy.get(giftCardPage.radio150)
      .siblings("span")
      .eq(1)
      .should(($div) => {
        expect($div.text().trim()).equal("You pay $120.00");
      });

    cy.get(giftCardPage.radioOther)
      .siblings("span")
      .eq(0)
      .should(($div) => {
        expect($div.text().trim()).equal("Other");
      });

    cy.get(giftCardPage.cardImage).should("be.visible");

    //validate card has correct fill
    cy.get(giftCardPage.cardImage)
      .children("path[fill='#282F3C']")
      .should("exist");

    //add validate card text, it is hidden href
    //cy.get("g[id='NewCardImage2']").children("g[id='Gift-Card-Text'"]).children('use')

    cy.get(giftCardPage.totalCostHeader)
      .eq(0)
      .should("have.text", "Total cost");

    cy.get(giftCardPage.totalCostValue).eq(0).should("have.text", "$0.00");

    cy.get(giftCardPage.checkOutButton).eq(0).should("have.text", "Checkout");

    //validate button is greyed out/disabled
    cy.get(giftCardPage.checkOutButton)
      .should("have.attr", "class")
      .and("contains", "disabled");

    //validate send to me is selected by default
    cy.get(giftCardPage.selectedMyselfTab).should("exist");

    cy.get(giftCardPage.sendToMyselfTab).should("have.text", "Send to me");

    cy.get(giftCardPage.sendToOtherTab).should(
      "have.text",
      "Send to someone else"
    );

    cy.get(giftCardPage.tabContentWindow)
      .children("div")
      .eq(0)
      .should(($div) => {
        expect($div.text().trim()).equal("Your Email Address");
      });

    cy.get(giftCardPage.emailAddressPlaceholder).should("exist");

    cy.get(giftCardPage.FirstNameLastNameHeaders)
      .eq(1)
      .should(($div) => {
        expect($div.text().trim()).equal("First Name");
      });

    cy.get(giftCardPage.firstNamePlaceholder).should("exist");

    cy.get(giftCardPage.FirstNameLastNameHeaders)
      .eq(2)
      .should(($div) => {
        expect($div.text().trim()).equal("Last Name");
      });

    cy.get(giftCardPage.lastNamePlaceholder).should("exist");
  });

  it("Select $100 and Validate page updates to reflect this", () => {
    cy.get(giftCardPage.radio100).click();

    cy.get(giftCardPage.giftCardAmountAfterSelection)
      .invoke("attr", "data-amount-payment-amount")
      .should("eq", "80");

    cy.get(giftCardPage.totalPrice).eq(0).should("have.text", "$80.00");

    //validate button is still greyed out/disabled
    cy.get(giftCardPage.checkOutButton)
      .should("have.attr", "class")
      .and("contains", "disabled");
  });

  it("Check error messages for Email Address", () => {
    cy.get(giftCardPage.emailField).type("t");

    cy.get(giftCardPage.emailFieldError).should(
      "have.text",
      "Please enter a valid email"
    );

    cy.get(giftCardPage.emailField).clear();

    cy.get(giftCardPage.emailFieldError).should("have.text", "Required");
  });

  it("Enter Email Address", () => {
    cy.get(giftCardPage.emailField).type(vars.emailAddress1);

    //validate errors do not appear for email
    cy.get(giftCardPage.emailField).should("not.have.text");

    //validate button is still greyed out/disabled
    cy.get(giftCardPage.checkOutButton)
      .should("have.attr", "class")
      .and("contains", "disabled");
  });

  it("Enter First Name and Last Name", () => {
    cy.get(giftCardPage.firstNameField).type(vars.firstName);

    cy.get(giftCardPage.lastNameField).type(vars.lastName);
  });

  it("Select Checkout", () => {
    //validate button is no longer disabled
    cy.get("button[data-target='checkout.checkoutButton']")
      .should("have.attr", "class")
      .and("not.contains", "disabled");

    // added force: true as after initial successful runs button returned error "this element is not visible"
    cy.get("button[data-target='checkout.checkoutButton']")
      .eq(0)
      .click({ force: true });
  });

  it("Validate Content of Summary page", () => {
    cy.url().should(
      "eq",
      "https://gift-cards.phorest.com/salons/demo-us#confirm"
    );

    cy.get(universalElements.headerText).should("have.text", "Summary");

    cy.get(confirmationPage.summaryHeader2).should("have.text", "Summary");

    cy.get(confirmationPage.editButton).eq(0).should("have.text", "Edit");

    cy.get(confirmationPage.summaryTotalHeaders)
      .eq(0)
      .should(($div) => {
        expect($div.text().trim()).equal("Value of gift card");
      });

    cy.get(confirmationPage.giftCardValue).should(($div) => {
      expect($div.text().trim()).equal("$100.00");
    });

    cy.get(confirmationPage.summaryTotalHeaders)
      .eq(1)
      .should(($div) => {
        expect($div.text().trim()).equal("Total cost");
      });

    cy.get(confirmationPage.paymentAmount).should(($div) => {
      expect($div.text().trim()).equal("$80.00");
    });

    cy.get(confirmationPage.summaryTotalHeaders)
      .eq(2)
      .should(($div) => {
        expect($div.text().trim()).equal("Send receipt to");
      });

    cy.get(confirmationPage.purchaserEmail).should(($div) => {
      expect($div.text().trim()).equal(vars.emailAddress1);
    });

    cy.get(confirmationPage.summaryTotalHeaders)
      .eq(3)
      .should(($div) => {
        expect($div.text().trim()).equal("Send gift card to");
      });

    cy.get(confirmationPage.recipientEmail).should(($div) => {
      expect($div.text().trim()).equal(vars.emailAddress1);
    });

    cy.get(confirmationPage.confirmButton).should(($div) => {
      expect($div.text().trim()).equal("Confirm Details");
    });
  });

  it("Select Confirm Details button and validate payment page", () => {
    cy.get(confirmationPage.confirmButton)
      .should(($div) => {
        expect($div.text().trim()).equal("Confirm Details");
      })
      .click();

    cy.get(paymentPage.paymentText).contains("Payment details").should("exist");

    cy.get(paymentPage.paymentText)
      .contains("By clicking Submit, you're agreeing to our")
      .should("exist");

    cy.get(paymentPage.paymentLinks)
      .contains("Terms & Conditions")
      .should("exist");

    cy.get(paymentPage.paymentLinks)
      .eq(0)
      .should("have.attr", "href")
      .and("eq", "https://demo-us.phorest.me/book/terms");

    cy.get(paymentPage.paymentText).contains(",").should("exist");

    cy.get(paymentPage.paymentLinks)
      .eq(1)
      .should("have.attr", "href")
      .and("eq", "https://demo-us.phorest.me/book/terms#cancellation");

    cy.get(paymentPage.paymentText).contains(" and ").should("exist");

    cy.get(paymentPage.paymentLinks)
      .eq(2)
      .should("have.attr", "href")
      .and("eq", "https://demo-us.phorest.me/book/phorest_privacy");

    cy.get("iframe")
      .should("exist")
      .switchToFrame(() => {
        cy.get(paymentPage.cardholderNameHeader).should("have.text", "Name");

        cy.get(paymentPage.cardholderField).should("exist");

        cy.get(paymentPage.zipcodeHeader).should("have.text", "Zip Code");

        cy.get(paymentPage.zipcodeField).should("exist");

        cy.get(paymentPage.cardnumberHeader).should("have.text", "Card Number");

        cy.get(paymentPage.cardnumberField).should("exist");

        cy.get(paymentPage.cardexpirationHeader).should(
          "have.text",
          "Expiration"
        );

        cy.get(paymentPage.cardexpirationField).should("exist");

        cy.get(paymentPage.securitycodeHeader).should(
          "have.text",
          "Security Code"
        );

        cy.get(paymentPage.securitycodeField).should("exist");

        cy.get(paymentPage.submitButton).should("have.text", "Submit");
      });
  });

  it("Enter card details and click submit", () => {
    cy.get("iframe")
      .should("exist")
      .switchToFrame(() => {
        cy.get(paymentPage.cardholderField).type(vars.firstName, vars.lastName);

        cy.get(paymentPage.zipcodeField).type(vars.zipCode);

        cy.get(paymentPage.cardnumberField).type(vars.cardNum);

        cy.get(paymentPage.cardexpirationField).type(vars.cardExp);

        cy.get(paymentPage.securitycodeField).type(vars.secCode);

        cy.get(paymentPage.submitButton).click();
      });
  });

  it(
    "Validate Success page and click Done",
    { defaultCommandTimeout: 10000 },
    () => {
      cy.url().should(
        "eq",
        "https://gift-cards.phorest.com/salons/demo-us#success"
      );

      cy.get(successPage.checkmarkIcon).should("exist");

      cy.get(successPage.paymentSuccessMessage)
        .children("p")
        .eq(0)
        .should("have.text", "Payment accepted, thank you!");

      //included spacing and line break in expected text as must do more research to discover how to trim break inbetween text
      cy.get(successPage.paymentSuccessMessage)
        .children("p")
        .eq(1)
        .should(($div) => {
          expect($div.text().trim()).equal(
            "Your gift card has been sent.\n      We've also sent you a receipt."
          );
        });

      cy.get(successPage.paymentSuccessMessage)
        .children("p")
        .eq(2)
        .should("have.text", "Your gift card code is:");

      //as gift card code is dynamic, validate text is only numerical
      cy.get(successPage.paymentSuccessMessage)
        .children("p")
        .eq(3)
        .should(($div) => {
          expect($div.text().trim()).match(/^[0-9]*$/);
        });

      cy.get(successPage.paymentSuccessMessage)
        .children("p")
        .eq(4)
        .should("have.text", "Your gift card value is:");

      cy.get(successPage.paymentSuccessMessage)
        .children("p")
        .eq(5)
        .should("have.text", "$100.00");

      cy.get(successPage.doneButton).should("have.text", "Done");

      cy.get(successPage.doneButton).click();
    }
  );
});
