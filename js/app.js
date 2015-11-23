window.onload = function() {
    $('#tracker-submit').click(takeTracking);
};
var mydata = JSON.parse(data);

var takeTracking = function() {
    var code = $('#tracking-num').val();
    var title = $('#tracking-title').val();
    $('#tracking-num').val('');
    $('#tracking-title').val('');
    makeRequest(code, title);
};


var makeRequest = function(trackingNumber, title) {

    var request = new XMLHttpRequest();

    request.open('GET', 'https://api.packpin.com/v2/trackings');

    request.setRequestHeader('packpin-api-key', mydata.packPinKey);
    request.setRequestHeader('Content-Type', 'application/json');


    request.onreadystatechange = function() {
        if (this.readyState === 4) {
            console.log('Status:', this.status);
            console.log('Headers:', this.getAllResponseHeaders());
            console.log('Body:', this.responseText);
            var jsonified = JSON.parse(this.responseText);
            var packageObject = {
                title: title,
                status: jsonified.body.items[0].status,
                est_del: jsonified.body.items[0].estimated_delivery,
                details: jsonified.body.items[0].track_details,
                carrier: jsonified.body.items[0].carrier_code,
                dest_zip: jsonified.body.items[0].destination_zip,
            };
            
            chrome.storage.sync.set({
                trackingNumber: packageObject
            }, function() {
                console.log('saved to synced storage');
            });
        }
    };

    var body = {
        'code': trackingNumber
    };

    request.send(JSON.stringify(body));

};
