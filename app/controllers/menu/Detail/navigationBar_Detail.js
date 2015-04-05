//PROPERTIES
var args = arguments[0] || {};
//END OF PROPERTIES

//FORMAT
var dp_width_rate = Alloy.Globals.DP_WIDTH_RATE;

$.backBtn.width = 60*dp_width_rate;
$.backBtn.height = 60*dp_width_rate;

$.favouriteBtn.width = 60*dp_width_rate;
$.favouriteBtn.height = 60*dp_width_rate;

$.title.font = {
	fontSize:36*dp_width_rate,
	fontWeight:"bold",
};
//END OF FORMAT

//FUNCTION
//END OF FUNCTION

//HANDLER
$.backBtn.addEventListener('click',function(){
	Ti.App.fireEvent('backBtn',{});
});
//END OF HANDLER

//LOGIC
//END OF LOGIC