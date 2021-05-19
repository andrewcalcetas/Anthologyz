// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality.
// Any number of plugins can be added through `puppeteer.use()`
const puppeteer = require('puppeteer-extra');


// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

// Add adblocker plugin to block all ads and trackers (saves bandwidth)
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))


//This async function will allow me to use the await keyword (this is very ussefull because in this code it will have to wait for things very often before moving on)
async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    //Returns an arry when item found using Xpath then pulls out the first item our of the array into "el".
    const [el] = await page.$x('//*[@id="landingImage"]');

    //pulls the source attribute attribute out of the element
    const src = await el.getProperty('src');

    //this pulls out the string since this wasn't a string
    const imgURL = await src.jsonValue();

    //same concept just changed variables
    const [el2] = await page.$x('//*[@id="productTitle"]');
    const txt = await el2.getProperty('textContent');
    const title = await txt.jsonValue();

    //same concept just changed variables
    const [el3] = await page.$x('//*[@id="price_inside_buybox"]');
    const txt2 = await el3.getProperty('textContent');
    const price = await txt2.jsonValue();

    console.log({imgURL, title, price});

    //closes the browser
    browser.close();
}

scrapeProduct('https://www.amazon.com/Schick-Multipurpose-Exfoliating-Dermaplaning-Precision/dp/B0787GLBMV/ref=zg_bs_3778591_1?_encoding=UTF8&psc=1&refRID=2J0QNZMZRKB5E3VADD83vvvvvvvvvv')
