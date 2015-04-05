//PROPERTIES
var args = arguments[0] || {};
//END OF PEPERTIES

//FORMAT
var dp_width_rate = Alloy.Globals.DP_WIDTH_RATE;

$.menuBtn.width = 50*dp_width_rate;
$.menuBtn.height = 50*dp_width_rate;

$.title.font = {
	fontSize:32*dp_width_rate,
	fontWeight:"bold",
};
//END OF FORMAT

//HANDLER
$.menuBtn.addEventListener('click',function(){
	Ti.App.fireEvent('showMenu',{});
});
//END OF HANDLER
