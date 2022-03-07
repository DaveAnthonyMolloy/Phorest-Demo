export const universalElements = {

    headerText: 'span[data-target="page.headerText"]'

}

export const giftCardPage = {

    giftCardMenu: "div[data-controller='amount']",

    giftCardValueHeader: "span[class='font-semibold']",

    radio50: "input[id='option50']",

    radio100: "input[id='option100']",

    radio150: "input[id='option150']",

    radioOther: "input[id='optionOther']",

    otherInputField: "input[data-target='amount.otherInput']",

    otherFieldError: "p[data-target='amount.otherSectionError']",

    giftCardAmountAfterSelection: "div[data-controller='amount']",

    totalPrice: "span[data-target='checkout.price']",

    cardImage: "g[id='NewCardImage2']",

    totalCostHeader: "span[class='block lg:text-center']",

    totalCostValue: "span[data-target='checkout.price']",

    selectedMyselfTab: "div[data-tabs-selected-tab='SEND_TO_MYSELF']",

    selectedOtherTab: "div[data-tabs-selected-tab='SEND_TO_OTHER']",

    sendToMyselfTab: "a[data-target='tabs.sendToMyselfTab']",

    sendToOtherTab: "a[data-target='tabs.sendToOtherTab']",

    tabContentWindow: "div[class='tabs-content']",

    emailFieldError: "div[data-target='email.purchaserEmailError']",

    emailField: "input[data-target='email.purchaserEmailInput']",

    emailAddressPlaceholder: "input[placeholder='the receipt will be sent here ...']",

    nameDataHost: "div[data-controller='name']",

    FirstNameLastNameHeaders: "div[class='flex-auto text-xs sm:text-sm']",

    firstNameField: "input[data-target='name.purchaserFirstNameInput']",

    firstNameError: "div[data-target='name.purchaserFirstNameError']",

    firstNamePlaceholder: "input[placeholder='first name ...']",

    lastNameField: "input[data-target='name.purchaserLastNameInput']",

    lastNameError: "div[data-target='name.purchaserLastNameError']",

    lastNamePlaceholder: "input[placeholder='last name ...']",

    recipientEmailField: "input[data-target='email.recipientEmailInput']",

    recipientEmailFieldError: "div[data-target='email.recipientEmailError']",

    recipientEmailPlaceholder: "input[placeholder='gift card will be sent here ...']",

    messageForRecipientField: "textarea[data-target='email.recipientMessageInput']",

    messageForRecipientError: "div[data-target='email.recipientMessageError]",

    messageForRecipientPlaceholder: "textarea[placeholder='type your message here eg. Hi Mom, Happy Birthday! Love Karen'",

    checkOutButton: "button[data-target='checkout.checkoutButton']",

}

export const confirmationPage = {

    summaryHeader2: "h2",

    editButton: "button[data-action='click->confirm#editAction']",

    summaryTotalHeaders: "p[class = 'text-center text-l '",

    giftCardValue: "p[id='confirm-voucher-value']",

    paymentAmount: "p[id='confirm-payment-amount']",

    purchaserEmail: "p[id='confirm-purchaser-email']",

    recipientEmail: "p[id='confirm-recipient-email']",

    confirmButton: "button[data-action='confirm#confirmAction']"

}

export const paymentPage = {

    paymentText: "div",

    paymentLinks: "a[class='underline text-blue-700']",

    cardholderNameHeader: "label[for='card-name']",

    cardholderField: "input[placeholder='Cardholder name']",

    zipcodeHeader: "label[for='card-zip']",

    zipcodeField: "input[placeholder='Zip code']",

    cardnumberHeader: "label[for='card-number']",

    cardnumberField: "input[placeholder='Card number']",

    cardexpirationHeader: "label[for='card-expiry']",

    cardexpirationField: "input[placeholder='MM/YY']",

    securitycodeHeader: "label[for='card-security']",

    securitycodeField: "input[placeholder='CVC']",

    submitButton: "button[type='submit']",

}

export const successPage = {

    checkmarkIcon: "svg[data-icon='check-circle']",

    paymentSuccessMessage: "div[data-controller='success']",

    doneButton: "button[data-action='application#doneAction']",

}
