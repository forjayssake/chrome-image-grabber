
chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "fetchImages") {

        var imageHtml = buildImageList(request.source);
        message.innerHTML = imageHtml;
    }
});

function buildImageList(imageObj)
{
    var images  = new Array();
    var imageList = '';
    var imageKeys = Object.keys(imageObj);
    
    if (imageKeys.length == 0)
    {
        imageList = '<div class="alert alert-danger">No Images Found on This Page.</div>';
    } else {
        imageList = '<div class="alert alert-success">' + imageKeys.length + ' Images Found.</div>';
        for (var x = 0; x < imageKeys.length; x++) {
            imageList += imageObj[x];
        }
    }

    return imageList;
}

function onWindowLoad() {

    var message = document.querySelector('#message');

    chrome.tabs.executeScript(null, {
        file: "/content-scripts/getPageSource.js"
    }, function() {
        // If you try and inject into an extensions page or the webstore/NTP you'll get an error
        if (chrome.runtime.lastError) {
            message.innerHTML = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
        }
    });

}

window.onload = onWindowLoad;