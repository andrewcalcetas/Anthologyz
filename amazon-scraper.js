let browserWSEndpoint = '';
const { product } = require("puppeteer");
const puppeteer = require("puppeteer");

async function initiatePuppeteer() {
  await fetch("http://localhost:9222/json/version")
    .then(response => response.json())
    .then(function(data) {
        browserWSEndpoint = data.webSocketDebuggerUrl;
      })
    .catch(error => console.log(error));
}

initiatePuppeteer();

//Sleep function
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms))
}

// Assign button to puppeteer function

document
  .getElementById("puppeteer-button")
  .addEventListener("click", doPuppeteerThings);

async function doPuppeteerThings() {

  // Your puppeteer code goes here
//This async function will allow me to use the await keyword (this is very ussefull because in this code it will have to wait for things very often before moving on)
async function scrapeProduct(url) {
    const browser = await puppeteer.connect({
        browserWSEndpoint: browserWSEndpoint
      });
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
    //browser.close();

    document.getElementById("r1Link1").setAttribute('href', url);
    document.getElementById("r1Link1").setAttribute('title', title);
    document.getElementById("r1Img1").setAttribute('src', imgURL);
    document.getElementById("r1Price1").innerHTML = price;
}

let productTitle = document.getElementById("productTitle").innerHTML;
let product = "https://www.amazon.com/s?k=" + productTitle;
scrapeProduct('https://www.amazon.com/Sony-X80J-Inch-Compatibility-KD65X80J/dp/B08QXFGN9N/ref=sr_1_1?dchild=1&keywords=tcl+65+34+roku+4k+uhd+hdr+smart+tv+65s435&qid=1621888151&sr=8-1')

}