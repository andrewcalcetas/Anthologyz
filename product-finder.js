chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    if (tabs[0].url.search('/dp/') !== -1 || tabs[0].url.search('/ip/') !== -1 || tabs[0].url.search('/p/') !== -1){
        var productTitle = tabs[0].title;   //title

        productTitle = productTitle.replace('Amazon.com', '')
        productTitle = productTitle.replace('Target', '')
        productTitle = productTitle.replace('Walmart.com - ', '')
        productTitle = productTitle.replace('Walmart.com', '')

        document.getElementById('productTitle').innerText = productTitle 
        console.log(productTitle)
    }
    else{

    }
});