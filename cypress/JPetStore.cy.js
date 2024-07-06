import * as storeHelper from "./support/JPetStoreHelper";
/**
 * test case to check this page "https://petstore.octoperf.com/actions/Catalog.action"
 */
const VALID_CREDENTIALS = {
    NAME: "ameed",
    PASSWORD: "ameed0595",
};
const INVALID_CREDENTIALS = {
    NAME: "qqq",
    PASSWORD: "12345",
};
const value = '10'
describe("JPetStore", () => {
    beforeEach(() => {
        cy.visit("https://petstore.octoperf.com/actions/Catalog.action");
    });
    it("sign in by invalid user name and valid password", () => {
        storeHelper.clickButton(storeHelper.WORD_REGISTRY.SIGNIN);
        storeHelper.signin(INVALID_CREDENTIALS.NAME,VALID_CREDENTIALS.PASSWORD,false);
    });
    it("sign in by invalid passworrd and valid user name", () => {
        storeHelper.clickButton(storeHelper.WORD_REGISTRY.SIGNIN);
        storeHelper.signin(VALID_CREDENTIALS.NAME,INVALID_CREDENTIALS.PASSWORD,false);
        cy.get('[name="username"]')
    });
    it("sign in by only fill username", () => {
        storeHelper.clickButton(storeHelper.WORD_REGISTRY.SIGNIN);
        storeHelper.signin(VALID_CREDENTIALS.NAME, "", false);
    });
    it("sign in by only fill password", () => {
        storeHelper.clickButton(storeHelper.WORD_REGISTRY.SIGNIN);
        storeHelper.signin("", VALID_CREDENTIALS.PASSWORD, false);
    });
    it("sign in by valid user name and valid password ", () => {
        storeHelper.clickButton(storeHelper.WORD_REGISTRY.SIGNIN);
        storeHelper.signin(VALID_CREDENTIALS.NAME, VALID_CREDENTIALS.PASSWORD);
    });
    it("add product from information page for product to cart and verify it is added", () => {
        storeHelper.addProducts([{
            type: storeHelper.PRODUCTS.FISH.NAME,
            name: storeHelper.PRODUCTS.FISH.ANGEL_FISH_ID,
            Description: storeHelper.PRODUCTS.FISH.LARGE_ANGEL_FISH_ID,
        }
        ], false);
        storeHelper.clickButton(storeHelper.LOCATORS.cart, false)
        storeHelper.verifyProductExistence([{val:storeHelper.PRODUCTS.FISH.LARGE_ANGEL_FISH_ID,isExist:true}])
        storeHelper.clickButton(storeHelper.PRODUCTS.FISH.LARGE_ANGEL_FISH_ID,true)
        storeHelper.verifyInformation([{value:storeHelper.PRODUCTS.FISH.LARGE_ANGEL_FISH_ID,row:1}, {value:storeHelper.PRODUCTS.FISH.DESCRIPTION,row:2}, {value:storeHelper.PRODUCTS.FISH.TYPE,row:3}, {value:storeHelper.PRODUCTS.FISH.PRICE,row:5}])
    });
    it("add product from menu to cart and verify it is added ", () => {
        storeHelper.addProducts([{
            type: storeHelper.PRODUCTS.FISH.NAME,
            name: storeHelper.PRODUCTS.FISH.ANGEL_FISH_ID,
            Description: storeHelper.PRODUCTS.FISH.LARGE_ANGEL_FISH_ID,
        },
        ]);
        storeHelper.clickButton(storeHelper.LOCATORS.cart, false)
        storeHelper.verifyProductExistence([{val:storeHelper.PRODUCTS.FISH.LARGE_ANGEL_FISH_ID,isExist:true}])
        storeHelper.clickButton(storeHelper.PRODUCTS.FISH.LARGE_ANGEL_FISH_ID,true)
        storeHelper.verifyInformation([{value:storeHelper.PRODUCTS.FISH.LARGE_ANGEL_FISH_ID,row:1}, {value:storeHelper.PRODUCTS.FISH.DESCRIPTION,row:2}, {value:storeHelper.PRODUCTS.FISH.TYPE,row:3}, {value:storeHelper.PRODUCTS.FISH.PRICE,row:5}])

    });
    it("remove product from cart and verify it is removed", () => {
        storeHelper.addProducts([
            {
                type: storeHelper.PRODUCTS.FISH.NAME,
                name: storeHelper.PRODUCTS.FISH.ANGEL_FISH_ID,
                Description: storeHelper.PRODUCTS.FISH.SMALL_ANGEL_FISH_ID,
            },
            {
                type: storeHelper.PRODUCTS.CAT.NAME,
                name: storeHelper.PRODUCTS.CAT.MANX_ID,
                Description: storeHelper.PRODUCTS.CAT.TAILLESS_MAX_ID,
            },
            {
                type: storeHelper.PRODUCTS.DOG.NAME,
                name: storeHelper.PRODUCTS.DOG.BULL_DOG_ID,
                Description: storeHelper.PRODUCTS.DOG.FEMALE_PUPPY_BULL_DOG_ID,
            },
        ], false);
        storeHelper.clickButton(storeHelper.LOCATORS.cart, false)
        storeHelper.removeFromCart([storeHelper.PRODUCTS.FISH.SMALL_ANGEL_FISH_ID, storeHelper.PRODUCTS.DOG.FEMALE_PUPPY_BULL_DOG_ID]);
        storeHelper.verifyProductExistence([{val:storeHelper.PRODUCTS.FISH.SMALL_ANGEL_FISH_ID,isExist:false},{val:storeHelper.PRODUCTS.DOG.FEMALE_PUPPY_BULL_DOG_ID,isExist:false}])
    });
    it('verify "Retuen to main menu" button will redirect user to main page', () => {
        storeHelper.clickButton(storeHelper.LOCATORS.cart, false)
        storeHelper.clickButton(storeHelper.WORD_REGISTRY.RETURN_TO_MAIN_PAGE_BUTTON)
        storeHelper.testbuttonRedirect(storeHelper.WORD_REGISTRY.RETURN_TO_MAIN_PAGE_BUTTON);
    });
    it(`verify"Return to 'product name'" button will redirect user to product page`, () => {
        storeHelper.clickButton(storeHelper.LOCATORS.reptiles, false);
        storeHelper.clickButton(storeHelper.PRODUCTS.REPTILES.IGUANA_ID);
        storeHelper.clickButton(storeHelper.WORD_REGISTRY.returnProductButton.replace('${name}',storeHelper.PRODUCTS.REPTILES.NAME))
        storeHelper.testbuttonRedirect(storeHelper.PRODUCTS.REPTILES.NAME);
    });
    it("check from total cost", () => {
        storeHelper.addProducts(
            [{
                type: storeHelper.PRODUCTS.FISH.NAME,
                name: storeHelper.PRODUCTS.FISH.ANGEL_FISH_ID,
                Description: storeHelper.PRODUCTS.FISH.LARGE_ANGEL_FISH_ID,
            },
            {
                type: storeHelper.PRODUCTS.FISH.NAME,
                name: storeHelper.PRODUCTS.FISH.ANGEL_FISH_ID,
                Description: storeHelper.PRODUCTS.FISH.LARGE_ANGEL_FISH_ID,
            },
            ],
            false
        );
        storeHelper.clickButton(storeHelper.LOCATORS.cart, false)
        storeHelper.checkTotalCost(storeHelper.PRODUCTS.FISH.LARGE_ANGEL_FISH_ID)
    });
    it('check from sub total', () => {
        storeHelper.addProducts([{
            type: storeHelper.PRODUCTS.FISH.NAME,
            name: storeHelper.PRODUCTS.FISH.ANGEL_FISH_ID,
            Description: storeHelper.PRODUCTS.FISH.LARGE_ANGEL_FISH_ID,
        },
        {
            type: storeHelper.PRODUCTS.CAT.NAME,
            name: storeHelper.PRODUCTS.CAT.MANX_ID,
            Description: storeHelper.PRODUCTS.CAT.TAILLESS_MAX_ID,
        },
        {
            type: storeHelper.PRODUCTS.DOG.NAME,
            name: storeHelper.PRODUCTS.DOG.BULL_DOG_ID,
            Description: storeHelper.PRODUCTS.DOG.FEMALE_PUPPY_BULL_DOG_ID,
        },
        ], false);
        storeHelper.clickButton(storeHelper.LOCATORS.cart, false)
        storeHelper.checkSubTotal(3)
    })
    it('edit quantity and verify it is modified', () => {
        storeHelper.addProducts([{
            type: storeHelper.PRODUCTS.FISH.NAME,
            name: storeHelper.PRODUCTS.FISH.ANGEL_FISH_ID,
            Description: storeHelper.PRODUCTS.FISH.LARGE_ANGEL_FISH_ID,
        }
        ]);
        storeHelper.clickButton(storeHelper.LOCATORS.cart, false)
        storeHelper.changeQantity(storeHelper.PRODUCTS.FISH.LARGE_ANGEL_FISH_ID, value)
        storeHelper.verifyQuantity(value, storeHelper.PRODUCTS.FISH.LARGE_ANGEL_FISH_ID)
    })
    it("verify that cart is empty before add any iteam", () => {
        storeHelper.clickButton(storeHelper.LOCATORS.cart, false);
        storeHelper.textExistence(storeHelper.LOCATORS.productsTable, storeHelper.MESSAGE.EMPTY_MESSAGE);
    });
    it('verify that cost change when change quantity', () => {
        storeHelper.addProducts([{
            type: storeHelper.PRODUCTS.FISH.NAME,
            name: storeHelper.PRODUCTS.FISH.ANGEL_FISH_ID,
            Description: storeHelper.PRODUCTS.FISH.LARGE_ANGEL_FISH_ID,
        }
        ]);
        storeHelper.clickButton(storeHelper.LOCATORS.cart, false)
        storeHelper.changeQantity(storeHelper.PRODUCTS.FISH.LARGE_ANGEL_FISH_ID, value)
        storeHelper.checkTotalCost(storeHelper.PRODUCTS.FISH.LARGE_ANGEL_FISH_ID)
    })
    it('verify that cart table is empty after delete all product', () => {
        storeHelper.addProducts([{
            type: storeHelper.PRODUCTS.FISH.NAME,
            name: storeHelper.PRODUCTS.FISH.ANGEL_FISH_ID,
            Description: storeHelper.PRODUCTS.FISH.LARGE_ANGEL_FISH_ID,
        },
        {
            type: storeHelper.PRODUCTS.CAT.NAME,
            name: storeHelper.PRODUCTS.CAT.MANX_ID,
            Description: storeHelper.PRODUCTS.CAT.TAILLESS_MAX_ID,
        },
        ]);
        storeHelper.clickButton(storeHelper.LOCATORS.cart, false)
        storeHelper.removeFromCart([storeHelper.PRODUCTS.FISH.LARGE_ANGEL_FISH_ID, storeHelper.PRODUCTS.CAT.TAILLESS_MAX_ID]);
        storeHelper.textExistence(storeHelper.LOCATORS.productsTable, storeHelper.MESSAGE.EMPTY_MESSAGE);

    })
});