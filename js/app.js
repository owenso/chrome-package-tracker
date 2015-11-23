window.onload = function (){
	$('#tracker-submit').click(takeTracking);
};
var code;
var mydata = JSON.parse(data);

var takeTracking = function(){
	code = $('#tracking-num').val();
	console.log($('#tracking-num').val());
	$('#tracking-num').val('');


	var request = new XMLHttpRequest();

request.open('POST', 'https://api.packpin.com/v2/carriers/detect');

request.setRequestHeader('packpin-api-key', mydata.packPinKey);
request.setRequestHeader('Content-Type', 'application/json');


request.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);
  }
};

var body = {
  'code': '9361289949018104956352'
};

request.send(JSON.stringify(body));


};