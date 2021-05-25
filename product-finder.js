chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    var productTitle = tabs[0].title;   //title
    document.getElementById('productTitle').innerText = productTitle 
    console.log(productTitle)
});