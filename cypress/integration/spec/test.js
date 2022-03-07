const clickCheckout = () => {
  // added force: true as after initial successful runs button returned error "this element is not visible"
  cy.get("button[data-target='checkout.checkoutButton']")
    .eq(0)
    .click({ force: true });
};

const clickEdit = () => {
  cy.get("button").eq(0).should("have.text", "Edit").click();
};

const clickConfirmDetails = () => {
  cy.get("button")
    .eq(1)
    .should(($div) => {
      expect($div.text().trim()).equal("Confirm Details");
    })
    .click();

  //cy.get('button').eq(1).should('contains', 'Confirm Details').click()
};

const clickSubmit = () => {
  cy.get("button[type='submit']").click();
};

const clickDone = () => {
  cy.get("button[data-action='application#doneAction']").click();
};

describe("Verify $50 To Me Functionality", () => {
  const radio50 = "input[id='option50']";
  const radio100 = "input[id='option100']";
  const radio150 = "input[id='option150']";
  var selectThisRadio = "";
  var dollarAmountText = "";
  var FiftyDollarText = "$50.00";
  var HundredDollarText = "$100.00";
  var HundredAndFiftyDollarText = "$150.00";
  var totalCostListed = "";
  var totalAmount = "";

  const radioSelection = ["100", "50", "150"];

  radioSelection.forEach((int) => {
    if (int.match(100)) {
      selectThisRadio = radio100;
      dollarAmountText = HundredDollarText;
      totalCostListed = "$40.00";
      totalAmount = "40";
    } else if (int.match(150)) {
      selectThisRadio = radio150;
      dollarAmountText = HundredAndFiftyDollarText;
      totalCostListed = "$80.00";
      totalAmount = "80";
    } else if (int.match(50)) {
      selectThisRadio = radio50;
      dollarAmountText = FiftyDollarText;
      totalCostListed = "$120.00";
      totalAmount = "120";
    }
  });

  it("Select Radio and Validate page updates to reflect this", () => {
    cy.visit("https://gift-cards.phorest.com/salons/demo-us#");

    cy.get(selectThisRadio).click();

    cy.get("div[data-controller='amount'")
      .invoke("attr", "data-amount-payment-amount")
      .should("eq", totalAmount);

    cy.get("span[data-target='checkout.price']")
      .eq(0)
      .should("have.text", totalCostListed);

    //validate button is still greyed out/disabled
    cy.get("button[data-target='checkout.checkoutButton']")
      .should("have.attr", "class")
      .and("contains", "disabled");
  });

  it("Validate Email Address Error", () => {
    cy.get("input[data-target='email.purchaserEmailInput']").should(
      "not.have.text"
    );

    cy.get("input[data-target='email.purchaserEmailInput']").type("d");

    cy.get("div[data-target='email.purchaserEmailError']").should(
      "have.text",
      "Please enter a valid email"
    );

    cy.get("input[data-target='email.purchaserEmailInput']").type(
      "{backspace}"
    );

    cy.get("div[data-target='email.purchaserEmailError']").should(
      "have.text",
      "Required"
    );
  });

  it("Enter Email Address", () => {
    cy.get("input[data-target='email.purchaserEmailInput']").type(
      emailAddress1
    );

    //validate errors do not appear for email
    cy.get("input[data-target='email.purchaserEmailInput']").should(
      "not.have.text"
    );

    //validate button is still greyed out/disabled
    cy.get("button[data-target='checkout.checkoutButton']")
      .should("have.attr", "class")
      .and("contains", "disabled");
  });

  it("Enter First Name and Last Name", () => {
    cy.get("input[data-target='name.purchaserFirstNameInput']").type(firstName);

    cy.get("input[data-target='name.purchaserLastNameInput']").type(lastName);
  });

  it("Select Checkout", () => {
    //validate button is no longer disabled
    cy.get("button[data-target='checkout.checkoutButton']")
      .should("have.attr", "class")
      .and("not.contains", "disabled");

    clickCheckout();
  });

  it("Validate Content of Summary Confirmation page", () => {
    cy.url().should(
      "eq",
      "https://gift-cards.phorest.com/salons/demo-us#confirm"
    );

    cy.get("header").children("span").should("have.text", "Summary");

    cy.get("h2").should("have.text", "Summary");

    cy.get("button").eq(0).should("have.text", "Edit");

    cy.get("p[class = 'text-center text-l '")
      .eq(0)
      .should(($div) => {
        expect($div.text().trim()).equal("Value of gift card");
      });

    cy.get("p[id='confirm-voucher-value']").should(($div) => {
      expect($div.text().trim()).equal(dollarAmountText);
    });

    cy.get("p[class = 'text-center text-l '")
      .eq(1)
      .should(($div) => {
        expect($div.text().trim()).equal("Total cost");
      });

    cy.get("p[id='confirm-payment-amount']").should(($div) => {
      expect($div.text().trim()).equal(totalCostListed);
    });

    cy.get("p[class = 'text-center text-l '")
      .eq(2)
      .should(($div) => {
        expect($div.text().trim()).equal("Send receipt to");
      });

    cy.get("p[id='confirm-purchaser-email']").should(($div) => {
      expect($div.text().trim()).equal(emailAddress1);
    });

    cy.get("p[class = 'text-center text-l '")
      .eq(3)
      .should(($div) => {
        expect($div.text().trim()).equal("Send gift card to");
      });

    cy.get("p[id='confirm-recipient-email']").should(($div) => {
      expect($div.text().trim()).equal(emailAddress1);
    });

    cy.get("button")
      .eq(1)
      .should(($div) => {
        expect($div.text().trim()).equal("Confirm Details");
      });
  });

  it("Select Confirm Details button and validate payment page", () => {
    clickConfirmDetails();

    cy.get("div").contains("Payment details").should("exist");

    cy.get("div")
      .contains("By clicking Submit, you're agreeing to our")
      .should("exist");

    cy.get("a[class='underline text-blue-700']")
      .contains("Terms & Conditions")
      .should("exist");

    cy.get("a[class='underline text-blue-700']")
      .eq(0)
      .should("have.attr", "href")
      .and("eq", "https://demo-us.phorest.me/book/terms");

    cy.get("div").contains(",").should("exist");

    cy.get("a[class='underline text-blue-700']")
      .eq(1)
      .should("have.attr", "href")
      .and("eq", "https://demo-us.phorest.me/book/terms#cancellation");

    cy.get("div").contains(" and ").should("exist");

    cy.get("a[class='underline text-blue-700']")
      .eq(2)
      .should("have.attr", "href")
      .and("eq", "https://demo-us.phorest.me/book/phorest_privacy");

    cy.get("iframe")
      .should("exist")
      .switchToFrame(() => {
        cy.get("label[for='card-name']").should("have.text", "Name");

        cy.get("input[placeholder='Cardholder name']").should("exist");

        cy.get("label[for='card-zip']").should("have.text", "Zip Code");

        cy.get("input[placeholder='Zip code']").should("exist");

        cy.get("label[for='card-number']").should("have.text", "Card Number");

        cy.get("input[placeholder='Card number']").should("exist");

        cy.get("label[for='card-expiry']").should("have.text", "Expiration");

        cy.get("input[placeholder='MM/YY']").should("exist");

        cy.get("label[for='card-security']").should(
          "have.text",
          "Security Code"
        );

        cy.get("input[placeholder='CVC']").should("exist");

        cy.get("button[type='submit']").should("have.text", "Submit");
      });
  });

  it("Enter card details and click submit", () => {
    cy.get("iframe")
      .should("exist")
      .switchToFrame(() => {
        cy.get("input[placeholder='Cardholder name']").type(
          firstName,
          lastName
        );

        cy.get("input[placeholder='Zip code']").type("92606");

        cy.get("input[placeholder='Card number']").type("4111 1111 1111 1111");

        cy.get("input[placeholder='MM/YY']").type("12/22");

        cy.get("input[placeholder='CVC']").type("999");

        clickSubmit();
      });
  });

  it("Validate Success page and click Done", () => {
    cy.url().should(
      "eq",
      "https://gift-cards.phorest.com/salons/demo-us#success"
    );

    cy.get("svg[data-icon='check-circle']").should("exist");

    cy.get("div[data-controller='success']")
      .children("p")
      .eq(0)
      .should("have.text", "Payment accepted, thank you!");

    //included spacing and line break in expected text as must do more research to discover how to trim break inbetween text
    cy.get("div[data-controller='success']")
      .children("p")
      .eq(1)
      .should(($div) => {
        expect($div.text().trim()).equal(
          "Your gift card has been sent.\n      We've also sent you a receipt."
        );
      });

    cy.get("div[data-controller='success']")
      .children("p")
      .eq(2)
      .should("have.text", "Your gift card code is:");

    //as gift card code is dynamic, validate text is only numerical
    cy.get("div[data-controller='success']")
      .children("p")
      .eq(3)
      .should(($div) => {
        expect($div.text().trim()).match(/^[0-9]*$/);
      });

    cy.get("div[data-controller='success']")
      .children("p")
      .eq(4)
      .should("have.text", "Your gift card value is:");

    cy.get("div[data-controller='success']")
      .children("p")
      .eq(5)
      .should("have.text", dollarAmountText);

    cy.get("button[data-action='application#doneAction']").should(
      "have.text",
      "Done"
    );

    clickDone();
  });
});
