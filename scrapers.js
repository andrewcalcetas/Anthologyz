const puppeteer = require('puppeteer');

//This async function will allow me to use the await keyword (this is very ussefull because in this code it will have to wait for things very often before moving on)
async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    //Returns an arry when item found using Xpath then pulls out the first item our of the array into "el".
    const [el] = await page.$x('//*[@id="imgBlkFront"]');

    //pulls the source attribute attribute out of the element
    const src = await el.getProperty('src');

    //this pulls out the string since this wasn't a string
    const imgURL = await src.jsonValue();

    //same concept just changed variables
    const [el2] = await page.$x('//*[@id="productTitle"]');
    const txt = await el2.getProperty('textContent');
    const title = await txt.jsonValue();

    //same concept just changed variables
    const [el3] = await page.$x('//*[@id="newBuyBoxPrice"]');
    const txt2 = await el3.getProperty('textContent');
    const price = await txt2.jsonValue();

    console.log({imgURL, title, price});

    //closes the browser
    browser.close();
}

scrapeProduct('https://www.amazon.com/dp/1702097269/ref=redir_mobile_desktop?_encoding=UTF8&aaxitk=5RprDVRlAZsE91OJn4Z3kw&hsa_cr_id=2452021590701&pd_rd_plhdr=t&pd_rd_r=d2831743-9ffb-46b3-9a83-88fb900e291a&pd_rd_w=UKuaC&pd_rd_wg=aJ5NA&ref_=sbx_be_s_sparkle_mcd_asin_0_img')
