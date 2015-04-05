//PROPERTIES
var args = arguments[0] || {};
//END OF PROPERTIES

//FORMAT
var dp_width_rate = Alloy.Globals.DP_WIDTH_RATE;

$.menuBtn.width = 50*dp_width_rate;
$.menuBtn.height = 50*dp_width_rate;

$.editBtn.width = 50*dp_width_rate;
$.editBtn.height = 50*dp_width_rate;

$.title.font = {
	fontSize:36*dp_width_rate,
	fontWeight:"bold",
};
//END OF FORMAT

//FUNCTION
//END OF FUNCTION

//HANDLER
$.menuBtn.addEventListener('click',function(){
	Ti.App.fireEvent('showMenu',{});
});
//END OF HANDLER

//LOGIC
//END OF LOGIC