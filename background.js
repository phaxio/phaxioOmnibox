chrome.experimental.omnibox.onInputChanged.addListener(function (text, suggest) {

    if (isIdQuery(text)){
        suggestions.push({ content: 'View fax ' + text.trim(), description: 'View fax ' + text.trim() });
    }
    else if (isDownloadQuery(text)){
        suggestions.push({ content: 'Download fax ' + text.trim(), description: 'Download fax ' + text.trim() });
    }
    else if (isTagQuery(text)){
        suggestions.push({ content: 'Search for faxes with tag "' + text.trim() + '"', description: 'Search for fax with tags "' + text.trim() + '"' });
    }
    else if (isPhoneNumberQuery(text)){
        suggestions.push({ content: 'Search for fax to phone number "' + text.trim() + '"', description: 'Search for fax to phone number "' + text.trim() + '"' });
    }

});

chrome.experimental.omnibox.onInputEntered.addListener(function (text) {
    if (isIdQuery(text)){
        var cleanId = text.trim().replace("#", "");
        navigate("https://www.phaxio.com/viewFax?faxId=" + cleanId );
    }
    else if (isDownloadQuery(text)){
        var cleanId = text.trim().replace("#", "");
        navigate("https://www.phaxio.com/viewFax/file?fileType=payload&faxId=" + cleanId );
    }
    else if (isTagQuery(text) || isPhoneNumberQuery(text)){
        navigate("https://www.phaxio.com/logs?log_filter%5Bquery%5D=" + text.trim());
    }
}

function isPhoneNumberQuery(text){
    return !isTagQuery(text);
}

function isTagQuery(text){
    return text.trim().indexOf(":") != -1;
}

function isIdQuery(text){
    return text.trim().indexOf("#") == 0  && isNumeric(text.trim().replace("#", ""));
}

function isDownloadQuery(text){
    return text.trim.indexOf("v" == 0) && isNumeric(text.trim().replace("v", ""));
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
