chrome.tabs.query({
    active: true,
    currentWindow: true
}, function(tabs) {

    var tabHref = tabs[0].url;
    var productTitle = ''

    if(tabHref.search('walmart.com/ip/') !== -1){
        for(var i = tabHref.search('ip/') + 2; i++;){
            if (tabHref[i] === '/'){break}
            productTitle = productTitle + tabHref[i]
        }
        
    }
    else if(tabHref.search('target.com/p/') !== -1){
        for(var i = tabHref.search('/p/') + 2; i++;){
            if (tabHref[i] === '/'){break}
            productTitle = productTitle + tabHref[i]
        }
        
    }
    
    else if(tabHref.search('amazon.com/') !== -1){
        if(tabHref.search('/dp/') !== -1){
            for(var i = tabHref.search('com/') + 3; i++;){
                if (tabHref[i] === '/'){break}
                productTitle = productTitle + tabHref[i]
            }
            
        }
    }
    else{
        
        productTitle = 'Product: N/A'
    }
    document.getElementById('productTitle').innerText = productTitle.replaceAll('-', ' ') 
    console.log(productTitle, tabHref)
});







