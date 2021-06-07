const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

// VARIABLES
const url =
    "https://in.puma.com/in/en/pd/wild-rider-layers-unisex-sneakers/380697.html";
const myPrice = 1000;

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

async function login(page) { }

async function selectProduct(page) {
    page.click('#swatch-0260');
    await sleep(3000);
    page.click('body > div.page > div.product-detail-root > div.product-page-layout > div.product-details-section > div.product-details-col.col-lg-4 > div > div:nth-child(10) > div > div.add-to-cart-btn-block.col-10.col-sm-8 > button');
    await sleep(3000);
    page.goto('https://in.puma.com/in/en/checkout/start?stage=shipping#shipping');
}

async function run() {
    await configure();
}

run();
