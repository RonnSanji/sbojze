var args = arguments[0] || {};

var dp_width_rate = Alloy.Globals.DP_WIDTH_RATE;
// if(Ti.Platform.osname == 'android')
// {
	// dp_width_rate = Titanium.Platform.displayCaps.platformWidth / Titanium.Platform.displayCaps.logicalDensityFactor / 720;
// }
// else{
	// dp_width_rate = Titanium.Platform.displayCaps.platformWidth / 720;
// }

// var statusBarheight;
// if(Ti.Platform.osname == 'android'){
	// statusBarheight = 25;
// }else{
	// statusBarheight = 20;
// }
// $.navigator.top = statusBarheight;

$.menuBtn.width = 50*dp_width_rate;
$.menuBtn.height = 50*dp_width_rate;

$.editBtn.width = 50*dp_width_rate;
$.editBtn.height = 50*dp_width_rate;

$.title.font = {
	fontSize:36*dp_width_rate,
	fontWeight:"bold",
};

//function

$.menuBtn.addEventListener('click',function(){
	Ti.App.fireEvent('showMenu',{});
});