var Phaxio = {};

Phaxio.isPhoneNumberQuery = function(text){
    return !Phaxio.isTagQuery(text);
};

Phaxio.isTagQuery = function(text){
    return text.indexOf(":") != -1;
};

Phaxio.isIdQuery = function(text){
    return text.indexOf("#") == 0  && Phaxio.isNumeric(text.replace("#", ""));
};

Phaxio.isDownloadQuery = function(text){
    return text.indexOf("v") == 0 && Phaxio.isNumeric(text.replace("v", ""));
};

Phaxio.isNumeric = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

chrome.omnibox.onInputChanged.addListener(function (text, suggest) {

	var suggestions = [];
	contentText = text + ' ';
    if (Phaxio.isIdQuery(text)){
        suggestions.push({ content: contentText, description: 'View fax ' + text });
    }
    else if (Phaxio.isDownloadQuery(text)){
        suggestions.push({ content: contentText, description: 'Download fax ' + text });
    }
    else if (Phaxio.isTagQuery(text)){
        suggestions.push({ content: contentText, description: 'Search for fax with tags "' + text + '"' });
    }
    else if (Phaxio.isPhoneNumberQuery(text)){
        suggestions.push({ content: contentText, description: 'Search for fax to phone number "' + text + '"' });
    }

    suggest(suggestions);

});

chrome.omnibox.onInputEntered.addListener(function (text) {
    var url = "";
    if (Phaxio.isIdQuery(text)){
        var cleanId = text.replace("#", "");
        url = "https://console.phaxio.com/viewFax?faxId=" + cleanId;
    }
    else if (Phaxio.isDownloadQuery(text)){
        var cleanId = text.replace("#", "").replace("v", "");
        url = "https://console.phaxio.com/viewFax/file?fileType=payload&faxId=" + cleanId;
    }
    else if (Phaxio.isTagQuery(text) || Phaxio.isPhoneNumberQuery(text)){
        url = "https://console.phaxio.com/logs?log_filter%5Bquery%5D=" + text;
    }

    chrome.tabs.update({
     'url': url
	});
});
