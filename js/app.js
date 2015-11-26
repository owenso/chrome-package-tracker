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







////CREATE
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
        }
    };

    var body = {
        'code': trackingNumber,
        'description': title
    };

    request.send(JSON.stringify(body));

};

//INDEX
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
			      	$('#package-table tr:last').after('<tr data-code="' + jsonified.body.items[i].code+ '" data-carrier="'+ jsonified.body.items[i].carrier_code + '"><td>' + jsonified.body.items[i].description+'</td><td>'+jsonified.body.items[i].status+'</td><td>' + jsonified.body.items[i].estimated_delivery+'</td><td>'+ '<img class="deleter" src="../../icons/minus.svg"></td>');
			     	}

			     	$('.deleter').click(deletePkg);

        }
    };
    request.send();
};

//DELETE
var deletePkg = function(){
	var deleteCode = $(this).closest("tr").data().code;
	var deleteCarrier = $(this).closest("tr").data().carrier;
	$(this).closest("tr").remove();

	var request = new XMLHttpRequest();

	request.open('DELETE', 'https://api.packpin.com/v2/trackings/'+deleteCarrier + '/' + deleteCode);
	request.setRequestHeader('packpin-api-key', mydata.packPinKey);
  request.setRequestHeader('Content-Type', 'application/json');

	request.onreadystatechange = function () {
	  if (this.readyState === 4) {
	    console.log('Status:', this.status);
	    console.log('Headers:', this.getAllResponseHeaders());
	    //console.log('Body:', this.responseText);
	  }
	};

	request.send();

};


fillPage();
