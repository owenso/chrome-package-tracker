window.onload = function (){
	$('#tracker-submit').click(takeTracking);
};

var takeTracking = function(){
	var trackingNumber = $('#tracking-num').val();
	console.log($('#tracking-num').val());
	$('#tracking-num').val('');
};