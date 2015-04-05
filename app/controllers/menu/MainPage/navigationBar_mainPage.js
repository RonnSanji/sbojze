//PROPERTIES
var args = arguments[0] || {};
//END OF PEPERTIES

//FORMAT
var dp_width_rate = Alloy.Globals.DP_WIDTH_RATE;

$.menuBtn.width = 50*dp_width_rate;
$.menuBtn.height = 50*dp_width_rate;

$.searchBtn.width = 50*dp_width_rate;
$.searchBtn.height = 50*dp_width_rate;

//END OF FORMAT

//FUNCTION
//END OF FUNCTION

//HANDLER
$.menuBtn.addEventListener('click',function(){
	Ti.App.fireEvent('showMenu',{});
});
//END OF HANDLER
