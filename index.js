const puppeteer = require('puppeteer');
const cheerio = require("cheerio");

// VARIABLES
const url = 'https://www.amazon.in/Wowheads-Handmade-Fragile-Lightsaber-Figurine/dp/B08B43H46P/';
const myPrice = 700;

//Timer
async function sleep(miliseconds) {
    return new Promise(resolve => setTimeout(resolve, miliseconds));
}

// Main Function
async function configure() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage()
    await page.goto(url);
    await sleep(3000);
    checkPrice(page);
}
async function checkPrice(page) {
    try {
        await page.reload();
        let html = await page.evaluate(() => document.body.innerHTML);
        const $ = cheerio.load(html);
        $('#priceblock_ourprice', html).each(function () {
            let price = $(this).text();
            let currentPrice = Number(price.replace(/[^0-9.-]+/g, ""));

            if (currentPrice > myPrice) {
                login(page).then(() => {
                    buyProduct(page);
                });
            }
        });
    } catch (error) {
        console.log(error.message);
    }
}

async function login(page) {
    // CHECK LOGIN
    await sleep(1000);
    await page.click('#nav-link-accountList');
    sleep(2000);
    await page.waitForSelector('#ap_email')
    await page.type('#ap_email', 'darshanaswath@gmail.com');
    await sleep(2000);
    await page.click('#continue');
    await sleep(3000);
    await page.waitForSelector('#ap_password');
    // ADD PASSWORD AS ENVIRONMENT VARIABLE
    await page.type('#ap_password', '91138817455579');
    await sleep(3000);
    await page.waitForSelector('#signInSubmit');
    await sleep(3000);
    await page.click('#signInSubmit');
    await sleep(3000);
}

async function buyProduct(page) {
    await page.waitForSelector('#buy-now-button')
    await page.click('#buy-now-button');
    // TODO MOST RECENT ADDRESS
    // ------------------------ //
    // AUTO TYPE ADDRESS
    await sleep(3000);
    // USERNAME
    await page.type('#address-ui-widgets-enterAddressFullName', 'Darshan');
    await sleep(2000);
    // Mobile
    await page.type('#address-ui-widgets-enterAddressPhoneNumber', '9113881745');
    await sleep(2000);
    // pin
    await page.type('#address-ui-widgets-enterAddressPostalCode', '560079');
    await sleep(2000);
    // house no
    await page.type('#address-ui-widgets-enterAddressLine1', '140');
    await sleep(2000);
    // area
    await page.type('#address-ui-widgets-enterAddressLine2', '4th main 2nd stage, KHB Colony');
    await sleep(2000);
    // landmark
    await page.type('#address-ui-widgets-landmark', 'PVP School');
    await sleep(2000);
    // town
    await page.type('#address-ui-widgets-enterAddressCity', 'Bengaluru');
    await sleep(2000);
}

async function run() {
    await configure();
}

run();