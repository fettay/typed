// JavaScript Document

//------------------------------ MAKE LIST FOR MYSQL (1)
$(function() {
$( "#sortlist" ).sortable({
	update: function(){
		$('#message').html('Items have been moved but not saved');
	}
});
});


//------------------------------ SORT LIST NORMAL (2)
//$(function() {
//$( "#sortlistTwo" ).sortable({
//});
//});

//------------------------------ SORT LIST TWO COLUMNS (3)
$(function() {
$( "#sortlist, #sortlistRem, #sortlistRes, #sortlistThree, #sortlistFour" ).sortable({
	connectWith: ".connectMe" // MAKE SURE THE CLASS OF EACH TABLE IS CALLED THIS
}).disableSelection();
});

//------------------------------ COOKIE SESSION SAVES


// set the list selector
var setSelector = "#sortlistTwo";
// set the cookie name
var setCookieName = "listOrder";
// set the cookie expiry time (days):
var setCookieExpiry = 7;
 


 
// code executed when the document loads
$(function() {
	// here, we allow the user to sort the items
	$(setSelector).sortable({
		axis: "y",
		cursor: "move",
		update: function() { getOrder(); }
	});
 
});