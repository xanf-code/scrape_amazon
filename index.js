const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

// VARIABLES
const url =
    "https://in.puma.com/in/en/pd/wild-rider-layers-unisex-sneakers/380697.html";

const myPrice = 1000;

//  FIRST/LAST NAME
const firstName = 'xxxxxx';
const lastName = 'xxxxxx';
const postal = '560079';
// ADDRESS LINE 1 and 2
const add1 = 'xxxxxx';
const add2 = 'xxxxxxx';
const city = 'Bangalore';

// EMAIL
const email = 'xxxxxx';

//  PHONE
const number = 'xxxxxxxxxx';

// REPLACE FOR YOUR SIZE :>
const size6 = '#swatch-0200';
const size7 = '#swatch-0220';
const size8 = '#swatch-0240';
const size9 = '#swatch-0260';
const size10 = '#swatch-0280';

//Timer
async function sleep(miliseconds) {
    return new Promise((resolve) => setTimeout(resolve, miliseconds));
}

// Main Function
async function configure() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await sleep(3000);
    checkPrice(page);
}
async function checkPrice(page) {
    try {
        await page.reload();
        let html = await page.content();
        const $ = cheerio.load(html);
        $(
            ".value",
            html
        ).each(function () {
            let price = $(this).text();
            let currentPrice = Number(price.replace(/[^0-9.-]+/g, ""));
            if (currentPrice > myPrice) {
                selectProduct(page)
            }
        });
    } catch (error) {
        console.log(error.message);
    }
}

async function selectProduct(page) {
    // REPLACE SIZE HERE
    page.click(size8);
    await sleep(3000);
    page.click('body > div.page > div.product-detail-root > div.product-page-layout > div.product-details-section > div.product-details-col.col-lg-4 > div > div:nth-child(10) > div > div.add-to-cart-btn-block.col-10.col-sm-8 > button');
    await sleep(3000);
    page.goto('https://in.puma.com/in/en/checkout/start?stage=shipping#shipping');
    await sleep(3000);
    // FirstName
    await page.type('#shippingFirstName', firstName);
    await sleep(3000);
    // LastName
    await page.type('#shippingLastName', lastName);
    await sleep(3000);
    // POSTCODE
    await page.type('#shippingZipCode', postal);
    await sleep(3000);
    // ADDRESS1
    await page.type('#shippingAddressOne', add1);
    await sleep(3000);
    // ADDRESS2
    await page.type('#shippingAddressTwo', add2);
    await sleep(3000);
    // CITY
    await page.type('#shippingAddressCity', city);
    await sleep(3000);
    // STATE
    await page.click('#shippingAddressState');
    await sleep(3000);
    // EMAIL
    await page.type('#shippingEmail', email)
    // CONFIRM EMAIL
    await page.type('#shippingEmailConfirm', email)
    // NUMBER
    await page.type('#shippingPhoneNumber', number)
    // ALT NUMBER
    await page.type(' #shippingAlternatePhoneNumber', number)
    await sleep(3000);
    // SUBMIT
    page.click('#shipping-address > div > div > button');
    await sleep(5000);
    // SHIPPING COD
    page.click('#dwfrm_billing > fieldset > div:nth-child(3) > div > label > div:nth-child(1)');
    await sleep(3000);
    page.click('#dwfrm_billing > div > div');
    // OTP STAGE
    // -------------------------- //
}

async function run() {
    await configure();
}

run();
