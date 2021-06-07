const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

// VARIABLES
const url =
    "https://in.puma.com/in/en/pd/wild-rider-layers-unisex-sneakers/380697.html";

const myPrice = 1000;

//  FIRST/LAST NAME
const firstName = "xxxxxx";
const lastName = "xxxxxx";
const postal = "560079";
// ADDRESS LINE 1 and 2
const add1 = "xxxxxx";
const add2 = "xxxxxxx";
const city = "Bangalore";

// EMAIL
const email = "darshanaswath@gmail.com";

//  PHONE
const number = "9113881745";

// REPLACE FOR YOUR SIZE :>
const size6 = "#swatch-0200";
const size7 = "#swatch-0220";
const size8 = "#swatch-0240";
const size9 = "#swatch-0260";
const size10 = "#swatch-0280";

//Timer
async function sleep(miliseconds) {
    return new Promise((resolve) => setTimeout(resolve, miliseconds));
}

// Main Function
async function configure() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await sleep(3000);
    checkPrice(page, browser);
}
async function checkPrice(page, browser) {
    try {
        await page.reload();
        let html = await page.content();
        const $ = cheerio.load(html);
        $(".value", html).each(function () {
            let price = $(this).text();
            let currentPrice = Number(price.replace(/[^0-9.-]+/g, ""));
            if (currentPrice > myPrice) {
                selectProduct(page, browser);
            }
        });
    } catch (error) {
        console.log(error.message);
    }
}

async function selectProduct(page, browser) {
    // REPLACE SIZE HERE
    page.click(size8);
    await sleep(3000);
    page.click(
        "body > div.page > div.product-detail-root > div.product-page-layout > div.product-details-section > div.product-details-col.col-lg-4 > div > div:nth-child(10) > div > div.add-to-cart-btn-block.col-10.col-sm-8 > button"
    );
    await sleep(3000);
    page.goto("https://in.puma.com/in/en/checkout/start?stage=shipping#shipping");
    await sleep(3000);
    // FirstName
    await page.type("#shippingFirstName", firstName);
    // LastName
    await page.type("#shippingLastName", lastName);
    // POSTCODE
    await page.type("#shippingZipCode", postal);
    // ADDRESS1
    await page.type("#shippingAddressOne", add1);
    // ADDRESS2
    await page.type("#shippingAddressTwo", add2);
    // CITY
    await page.type("#shippingAddressCity", city);
    // STATE
    await page.click("#shippingAddressState");
    // EMAIL
    await page.type("#shippingEmail", email);
    // CONFIRM EMAIL
    await page.type("#shippingEmailConfirm", email);
    // NUMBER
    await page.type("#shippingPhoneNumber", number);
    // ALT NUMBER
    await page.type(" #shippingAlternatePhoneNumber", number);
    await sleep(3000);
    // SUBMIT
    page.click("#shipping-address > div > div > button");
    await sleep(5000);
    // SHIPPING COD
    page.click(
        "#dwfrm_billing > fieldset > div:nth-child(3) > div > label > div:nth-child(1)"
    );
    await sleep(3000);
    page.click("#dwfrm_billing > div > div");
    await sleep(10000);
    // OTP STAGE
    // -------------------------- //
    const page2 = await browser.newPage();
    await page2.goto("https://login.yahoo.com/?.src=ym&pspid=159600001&activity=mail-direct&.lang=en-US&.intl=us&.done=https%3A%2F%2Fmail.yahoo.com%2Fd", { waitUntil: "domcontentloaded" });
    await page2.type('#login-username', 'darshan_aswath');
    await sleep(2000);
    page2.click("#login-signin");
    await sleep(2000);
    await page2.waitForSelector('#login-passwd');
    await sleep(2000);
    await page2.type('#login-passwd', '9113881745');
    await sleep(2000);
    page2.click("#login-signin");
    await sleep(3000);
    page2.click("#mail-app-component > div > div > div.D_F.ab_FT.em_N.ek_BB.iz_A.H_6D6F > div > div > div.W_6D6F.H_6D6F.cZ1RN91d_n.o_h.p_R.em_N.D_F > div > div.p_R.Z_0.iy_h.iz_A.W_6D6F.H_6D6F.k_w.em_N.c22hqzz_GN > ul > li:nth-child(2)");
    let html = await page2.content();
    const $ = cheerio.load(html);
    await sleep(3000);
    // $('#yiv5362187257 > div > p:nth-child(1)', html).each(function () {
    //     let otp = $(this).text();
    //     console.log(otp);
    // });
    let otp = "123133";
    page2.close();
    await sleep(2000);
    await page.type('#OTP', otp);
    await sleep(2000);
    page.click("#confirmOTPPopup > div > div > form > div.modal-footer > button.btn.btn-primary.d-block.submit-otp");
}



async function run() {
    await configure();
}

run();

// await page.waitForNavigation();