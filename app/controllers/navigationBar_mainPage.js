var args = arguments[0] || {};

var dp_width_rate;
if(Ti.Platform.osname == 'android')
{
	dp_width_rate = Titanium.Platform.displayCaps.platformWidth / Titanium.Platform.displayCaps.logicalDensityFactor / 720;
}
else{
	dp_width_rate = Titanium.Platform.displayCaps.platformWidth / 720;
}

// var statusBarheight;
// if(Ti.Platform.osname == 'android'){
	// statusBarheight = 25;
// }else{
	// statusBarheight = 20;
// }
// $.navigator.top = statusBarheight;

$.menuBtn.width = 50*dp_width_rate;
$.menuBtn.height = 50*dp_width_rate;

$.searchBtn.width = 50*dp_width_rate;
$.searchBtn.height = 50*dp_width_rate;

$.menuBtn.addEventListener('click',function(){
	Ti.App.fireEvent('showMenu',{});
});
