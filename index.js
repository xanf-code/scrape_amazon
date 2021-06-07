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
                // #buy-now-button
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

}

async function run() {
    await configure();
}

run();