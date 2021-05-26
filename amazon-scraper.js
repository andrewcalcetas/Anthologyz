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
async function scrapeProduct() {

  let productTitle = document.getElementById("productTitle").innerHTML;
  const browser = await puppeteer.connect({
      browserWSEndpoint: browserWSEndpoint
  });
  const page = await browser.newPage();
  await page.goto("https://www.amazon.com/s?k=" + productTitle);
  let price1 = await page.evaluate(() => 
      document.querySelector('span.a-price').innerText)

  let delIndex = price1.search("\\.")

  price1 = price1.substring(0, delIndex + 3)
    
  let image1 = ''

  let rawimage1 = await page.evaluate(() => 
    document.querySelector('img.s-image').outerHTML)
    
  let i = (rawimage1.search('src=') + 5)
    
  while (rawimage1[i] !== '"'){
        image1 += rawimage1[i]
        i= i + 1
  }
  let href = 'https://www.amazon.com'
  let rawhref = await page.evaluate(() => document.querySelector('a.a-link-normal.a-text-normal').outerHTML)

  let j = rawhref.search('href=') + 6
  while (rawhref[j] !== '"'){
        href += rawhref[j]
        j = j + 1
  }

    
    //closes the browser
    //browser.close();

    document.getElementById("r1Link1").setAttribute('href', href);
    document.getElementById("r1Img1").setAttribute('src', image1);
    document.getElementById("r1Price1").innerHTML = price1;
}

scrapeProduct()

}