export const LOCATORS = {
  usernameField: '[name="username"]',
  passwordField: '[name="password"]',
  signInButton: '[name="signon"]',
  errorMessages: ".messages li",
  welcomeMessage: '[id="WelcomeContent"]',
  fish: '[src="../images/sm_fish.gif"]',
  dog: '[src="../images/dogs_icon.gif"]',
  cat: '[coords="225,240,295,310"]',
  reptiles: '[src="../images/reptiles_icon.gif"]',
  bird: '[src="../images/sm_birds.gif"]',
  cart: '[src="../images/cart.gif"]',
  tableRows: "table tbody tr",
  productsTable: "table",
  mainInMainPage : "#Main",
  headerTwoInProductPage : "h2",
  quantityField: 'input[name="${locator}"]',
  row: 'tr:nth-child(${row})',
  price: 'td:nth-child(6)',
  totalCost: 'td:nth-child(7)'
};
export const MESSAGE = {
  INVALID_CREDENTIALS_MESSAGE: "Invalid username or password.  Signon failed.",
  EMPTY_MESSAGE: "Your cart is empty.",
  Welcome_MESSAGE: 'Welcome ${username}!'
};
export const WORD_REGISTRY = {
  SIGNIN: "Sign In",
  LOGIN: "Login",
  ADD_TO_CART_BUTTON: "Add to Cart",
  RETURN_TO_MAIN_PAGE_BUTTON: "Return to Main Menu",
  subTotal: 'Sub Total:',
  REMOVE: 'Remove',
  returnProductButton: 'Return to ${name}'
};
export const PRODUCTS = {
  FISH : {
    NAME: 'FISH',
    ANGEL_FISH_ID: "FI-SW-01",
    LARGE_ANGEL_FISH_ID: "EST-1",
    SMALL_ANGEL_FISH_ID: "EST-2",
    TYPE: 'Angelfish',
    DESCRIPTION: 'Large Angelfish',
    PRICE: '$16.50'
  },
  DOG : {
    NAME: 'DOG',
    BULL_DOG_ID: "K9-BD-01",
    MALE_ADULT_BULL_DOG_ID: "EST-6",
    FEMALE_PUPPY_BULL_DOG_ID: "EST-7",
  },
  CAT : {
    NAME: 'CAT',
    MANX_ID: "FL-DSH-01",
    TAILLESS_MAX_ID: "EST-14",
  },
  REPTILES : {
    NAME: 'REPTILES',
    IGUANA_ID: "RP-LI-02",
    GREEN_ADULT_IGUANA_ID: "EST-13",
  },
  BIRD : {
    NAME: 'BIRD',
    FINCH_ID: "AV-SB-02",
    ADULT_MALE_FINCH_ID: "EST-19",
  }
}
export const enterFieldValue = (value, locator) => {
  cy.get(locator).clear().invoke("val", value);
};
export const clickButton = (locator, contain = true) => {
  if (contain) {
    cy.contains(locator).click({ force: true });
  } else {
    cy.get(locator).click({ force: true });
  }
};
export const signin = (username, password, validCred = true) => {
  enterFieldValue(username, LOCATORS.usernameField);
  enterFieldValue(password, LOCATORS.passwordField);
  clickButton(WORD_REGISTRY.LOGIN);
  if (validCred == true) {
    cy.get(LOCATORS.welcomeMessage)
      .invoke("text")
      .should("contain", MESSAGE.Welcome_MESSAGE.replace('${username}',`${username}`));
  } else {
    if (username == "") {
      cy.get(LOCATORS.usernameField).should("have.class", "error");
    } else if (password == "") {
      cy.get(LOCATORS.passwordField).should("have.class", "error");
    } else {
      cy.get(LOCATORS.errorMessages).should(
        "contain",
        MESSAGE.INVALID_CREDENTIALS_MESSAGE
      );
    }
  }
};
export const addProducts = (products, fromMenu = true) => {
  products.forEach((product) => {
    if (product.type == PRODUCTS.FISH.NAME) {
      cy.get(LOCATORS.fish).click();
    } else if (product.type == PRODUCTS.DOG.NAME) {
      cy.get(LOCATORS.dog).click();
    } else if (product.type == PRODUCTS.CAT.NAME) {
      cy.get(LOCATORS.cat).click({ force: true });
    } else if (product.type == PRODUCTS.BIRD.NAME) {
      cy.get(LOCATORS.bird).click();
    } else if (product.type == PRODUCTS.REPTILES.NAME) {
      cy.get(LOCATORS.reptiles).click();
    }
    clickButton(product.name);
    if (fromMenu === true) {
      cy.contains(product.Description)
        .parent()
        .parent()
        .contains(WORD_REGISTRY.ADD_TO_CART_BUTTON)
        .click();
      cy.get(LOCATORS.productsTable).should("contain", product.Description);
    } else {
      clickButton(product.Description);
      clickButton(WORD_REGISTRY.ADD_TO_CART_BUTTON);
    }
    clickButton(WORD_REGISTRY.RETURN_TO_MAIN_PAGE_BUTTON);
  });
};
export const verifyProductExistence = (product) => {

  product.forEach(value => {
    if (value.isExist) {
      cy.get(LOCATORS.productsTable).should("contain", value.val);
    } else {
      cy.get(LOCATORS.productsTable).should('not.contain', value.val);
    }
  })
};
export const removeFromCart = (products) => {
  products.forEach((element) => {
    cy.contains(element).parent().parent().contains(WORD_REGISTRY.REMOVE).click();
  });
};
export const textExistence = (locator, text) => {
  cy.get(locator).should("contain", text);
};
export const checkTotalCost = (locator) => {
  cy.get(LOCATORS.quantityField.replace('${locator}',locator)).then((input) => {
    //quantity
    const value = parseFloat(input.val());
    cy.wrap(input).parent().parent().get('td:nth-child(6)')
      .invoke("text")
      .then((text) => {
        //price
        const price = parseFloat(text.replace(/\$/g, ""));
        const total = (value * price).toFixed(2);
        cy.get(LOCATORS.quantityField.replace('${locator}',locator)).then((input)=>{
          cy.wrap(input).parent().parent().get('td:nth-child(7)').invoke("text")
          .should("eq", "$" + total);
        })
      });
  });
};
export const checkSubTotal = (number) => {
  clickButton(LOCATORS.cart, false);
  cy.get(LOCATORS.tableRows).then((value) => {
    let sum = 0;
    let sum2 = 0;
    value.slice(1, -1).each((index, row) => {
      cy.wrap(row).then((x) => {
        cy.get(row)
          .find(LOCATORS.totalCost)
          .invoke("text")
          .then((text) => {
            const value = parseFloat(text.replace(/\$/g, ""));
            if (!isNaN(value)) {
              sum2++
              sum += value;
              if (sum2 == number) {
                cy.contains(WORD_REGISTRY.subTotal).invoke('text').then((text) => {
                  const subtotal = text.match(/\$([\d.]+)/)[1];
                  cy.log(subtotal);
                  cy.wrap(subtotal).should('eq', sum + '0')
                });
              }
            }
          });
      })
    })
  });
};
export const changeQantity = (locator, number) => {
  cy.get(LOCATORS.quantityField.replace('${locator}',locator)).clear().type(`${number}{enter}`);
};
export const verifyQuantity = (data, row, quantity = true) => {
  if (quantity == false) {
    cy.get("tr")
      .eq(row)
      .invoke("text")
      .then((value) => {
        const text = value.trim().replace(/\s+/g, " ");
        cy.wrap(text).should("eq", data);
      });
  } else {
    cy.get(LOCATORS.quantityField.replace("${locator}", row)).invoke("val").should("eq", data);
  }
};
export const verifyInformation = (informations) => {
  informations.forEach(data=>{
    cy.get("tr")
      .eq(data.row)
      .invoke("text")
      .then((value) => {
        const text = value.trim().replace(/\s+/g, " ");
        cy.wrap(text).should("eq", data.value);
      });
  })
};
export const testbuttonRedirect = (button) => {
  if (button == WORD_REGISTRY.RETURN_TO_MAIN_PAGE_BUTTON) {
    cy.get(LOCATORS.mainInMainPage).should("exist");
  } else if(button == PRODUCTS.FISH.NAME){
    cy.get(LOCATORS.headerTwoInProductPage).contains(PRODUCTS.FISH.NAME,{ matchCase: false })
  } else if (button == PRODUCTS.DOG.NAME) {
    cy.get(LOCATORS.headerTwoInProductPage).contains(PRODUCTS.DOG.NAME,{ matchCase: false })
  } else if (button == PRODUCTS.CAT.NAME) {
    cy.get(LOCATORS.headerTwoInProductPage).contains(PRODUCTS.CAT.NAME,{ matchCase: false })
  } else if (button == PRODUCTS.REPTILES.NAME) {
    cy.get(LOCATORS.headerTwoInProductPage).contains(PRODUCTS.REPTILES.NAME,{ matchCase: false })
  } else if (button == PRODUCTS.BIRD.NAME) {
    cy.get(LOCATORS.headerTwoInProductPage).contains(PRODUCTS.BIRD.NAME,{ matchCase: false })
  }
};