chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    var productTitle = tabs[0].title;   //title

    productTitle=productTitle.replace('Amazon.com', '')
    productTitle=productTitle.replace('Target', '')
    productTitle=productTitle.replace('Walmart.com - ', '')
    productTitle=productTitle.replace('Walmart.com', '')
    
    document.getElementById('productTitle').innerText = productTitle 
    console.log(productTitle)
});