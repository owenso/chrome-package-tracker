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
    console.log(trackingNumber);
    var request = new XMLHttpRequest();

    request.open('POST', 'https://api.packpin.com/v2/trackings');

    request.setRequestHeader('packpin-api-key', mydata.packPinKey);
    request.setRequestHeader('Content-Type', 'application/json');


    request.onreadystatechange = function() {
        if (this.readyState === 4) {
            console.log('Status:', this.status);
            console.log('Headers:', this.getAllResponseHeaders());
            console.log('Body:', this.responseText);
            console.log(typeof(this.responseText));
            // var jsonified = JSON.parse(this.responseText);
            // var packageObject = {
            //     title: title,
            //     status: jsonified.body.items[0].status,
            //     est_del: jsonified.body.items[0].estimated_delivery,
            //     details: jsonified.body.items[0].track_details,
            //     carrier: jsonified.body.items[0].carrier_code,
            //     dest_zip: jsonified.body.items[0].destination_zip,
            // };

            // chrome.storage.sync.set({
            //     trackingNumber: packageObject
            // }, function() {
            //     console.log('saved to synced storage');
            // });
        }
    };

    var body = {
        'code': trackingNumber,
        'description': title
    };

    request.send(JSON.stringify(body));

};

var fillPage = function() {

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

			     	for (var i=0; i<jsonified.body.items.length; i++){
			     		console.log('running x times:');
			     		console.log(i);
			      	$('#package-table tr:last').after('<tr><td>'+jsonified.body.items[i].description+'</td><td>'+jsonified.body.items[i].status+'</td><td>' + jsonified.body.items[i].estimated_delivery+'</td>');
			     	}
        }
    };
    request.send();
};
