import puppeteer from 'puppeteer';

//Sleep function
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms))
}

async function run(){

    const browser = await puppeteer.connect({
      browserWSEndpoint: `ws://0.0.0.0:8080`, // <-- connect to a server running somewhere
      ignoreHTTPSErrors: true
    });
  
    const pagesCount = (await browser.pages()).length;
    const browserWSEndpoint = await browser.wsEndpoint();
    console.log({ browserWSEndpoint, pagesCount });
  
  }

  run()

//Function that scrapes product info for 3 products off target.com using a searchtermm
async function scrapeTargetWithSearch(searchTerm){
    
    try{
        webPreferences: {
            nodeIntegration: true
        }

        //Open browser and new page, go to searched target page and wait for DOM to fully load
        const browser = await puppeteer.connect({headless : true})
        const page = await browser.newPage()
        await page.goto("https://www.target.com/s?searchTerm=" + searchTerm)
        await sleep(3000)
        
        //Pulls first 4 products off page, puts into list
        let rawProducts = [
            await page.evaluate(() => 
            document.querySelector('li[data-test = "list-entry-product-card"]:nth-child(1)').innerHTML),

            await page.evaluate(() => 
            document.querySelector('li[data-test = "list-entry-product-card"]:nth-child(2)').innerHTML),
        
            await page.evaluate(() => 
            document.querySelector('li[data-test = "list-entry-product-card"]:nth-child(3)').innerHTML)
        ]

        //Close browser
        await browser.close()
        
        //Dictionary to hold all the products, this is what will be returned
        var products = {
            product1 : {
                title : '',
                price : '',
                href: '',
                image: ''
            },
            product2 : {
                title : "",
                price : '',
                href: '',
                image: ''
            },
            product3 : {
                title : "",
                price : '',
                href: '',
                image: ''
            }
        }
        
        //Loop through products and pull title, price, href, image url
        for(var num = 1; num <= Object.keys(products).length; num++){
            let title = ''
            let price = ''
            let href = ''
            let image = ''

            let titleIndex = rawProducts[num - 1].search('product-title') + 15
                while(rawProducts[num - 1][titleIndex] !== '<'){
                    title += rawProducts[num - 1][titleIndex]
                    titleIndex += 1   
                }
                products[`product${num}`].title += title
            

            let priceIndex = rawProducts[num - 1].search('current-price') + 14
            if (rawProducts[num - 1][priceIndex + 8 ] == 'h'){priceIndex += 26}
                
            else{priceIndex += 16}

                while(rawProducts[num - 1][priceIndex] !== '<'){
                    price += rawProducts[num - 1][priceIndex]
                    priceIndex += 1
                   
                }
                products[`product${num}`].price = price
            
            let hrefIndex = rawProducts[num - 1].search('href') + 6
                while(rawProducts[num - 1][hrefIndex] !== '"'){
                    href += rawProducts[num - 1][hrefIndex]
                    hrefIndex += 1
                }
                products[`product${num}`].href = 'https://target.com' + href 
            
            let imageIndex = rawProducts[num - 1].search('src="https') + 5
                while (rawProducts[num - 1][imageIndex] !== '"'){
                    image += rawProducts[num - 1][imageIndex]
                    imageIndex += 1
                
                }
                products[`product${num}`].image = image

        }
        console.log(products)
    }

    catch (err){
        console.error(err)
    }
     
    
}

//Function that scrapes product info for single product on page
async function scrapeTargetOnPage(url){
    try{

        const browser = await puppetteer.launch({headless : true})
        const page = await browser.newPage()
        await page.goto(url)
        await sleep(3000)

        let price = await page.evaluate(() => 
            document.querySelector('div[data-test = "product-price"]').innerHTML)
        
        let title = await await page.evaluate(() => 
            document.querySelector('h1[data-test = "product-title"]').innerText)

        await browser.close()
        
        console.log(price, title)


    } catch(err){
        console.error(err)
    }
}

scrapeTargetWithSearch('HP 24ec 24" IPS Full HD LED Computer Monitor')
