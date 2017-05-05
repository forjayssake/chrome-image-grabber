function fetchImageTags(document_root)
{
    var images = new Array();
    var allImages = document_root.getElementsByTagName("img");

    for (var i = 0, max = allImages.length; i < max; i++) {

        var width = allImages[i].naturalWidth;
        var height = allImages[i].naturalHeight;

        if (width >= 20 && height >= 20) {
            images.push(
                {
                    src: allImages[i].src,
                    full_link:  '<img class="pageimg" src="' + allImages[i].src + '">',
                    title: allImages[i].title !== '' ? allImages[i].title : 'No Title',
                    height: height,
                    width: width,
                    extension: getExtension(allImages[i].src)
                }
            );
        }
    }

    return images;
};

function getExtension(fileName)
{
    return fileName.substr((~-fileName.lastIndexOf(".") >>> 0) + 2);
};

chrome.runtime.sendMessage({
    action: "fetchImages",
    source: fetchImageTags(document)
});