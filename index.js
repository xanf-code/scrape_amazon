const puppeteer = require('puppeteer');

//Timer
async function sleep(miliseconds) {
    return new Promise(resolve => setTimeout(resolve, miliseconds));
}

// Main Function
(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage()
    // CHECK LOGIN
    await page.goto('https://www.amazon.in/');
    sleep(1000);
    await page.click('#nav-link-accountList');
    sleep(2000);
    await page.waitForSelector('#ap_email')
    await page.type('#ap_email', 'darshanaswath@gmail.com');
    sleep(2000);
    await page.click('#continue');
    sleep(3000);
    await page.waitForSelector('#ap_password');
    // ADD PASSWORD AS ENVIRONMENT VARIABLE
    await page.type('#ap_password', '91138817455579');
    sleep(3000);
    await page.waitForSelector('#signInSubmit');
    sleep(3000);
    await page.click('#signInSubmit');
    sleep(5000);
    // NAVIGATE TO YOUR PRODUCT PAGE
    await browser.newPage()
    await page.goto('https://www.amazon.in/Wowheads-Handmade-Fragile-Lightsaber-Figurine/dp/B08B43H46P/ref=sr_1_1?dchild=1&keywords=yoda&qid=1623045988&sr=8-1');
    sleep(3000);

    // await browser.close()
})()