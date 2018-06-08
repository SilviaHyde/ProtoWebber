(function() {

var requestText = host.request.text;

var requestCommand;
var requestValue = '';
if (requestText.indexOf(' ') == -1) {
    requestCommand = requestText;
} else {
    requestCommand = requestText.substring(0, requestText.indexOf(' '));
    requestValue = requestText.substring(requestText.indexOf(' '));
}

if (requestCommand == 'echo') {
    return ('you said ' + requestValue + ' and i say oww!')
} else if (requestCommand == 'showid') {
    var allId = host.websocketClients();
    var outValue = '';
    for (var i = 0; i < allId.length; i++) {
        outValue += allId[i];
        if (i < (allId.length - 1)) {
            outValue += ', '
        }
    }
    return outValue
} else if (requestCommand == 'push') {
    var clientId = requestValue.substring(0, requestValue.indexOf(' '));
    var message = requestValue.substring(requestValue.indexOf(' '));
    host.websocketPush(clientId, message);
    return ('pushed to ' + clientId);
} else {
    return 'help | echo {message} | showid | push {id} {message}'
}

})();
