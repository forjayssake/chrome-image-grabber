function fetchImageTags(document_root)
{
    var images = new Array();
    var allImages = document_root.getElementsByTagName("img");
    for (var i = 0, max = allImages.length; i < max; i++) {

        var width = allImages[i].naturalWidth;
        var height = allImages[i].naturalHeight;

        if (width >= 20 && height >= 20) {
            images.push('<img title="' + allImages[i].title + '" src="' + allImages[i].src + '">');
        }
    }

    return images;
};

chrome.runtime.sendMessage({
    action: "fetchImages",
    source: fetchImageTags(document)
});