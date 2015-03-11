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

$.backBtn.width = 60*dp_width_rate;
$.backBtn.height = 60*dp_width_rate;

$.favouriteBtn.width = 60*dp_width_rate;
$.favouriteBtn.height = 60*dp_width_rate;

$.title.font = {
	fontSize:36*dp_width_rate,
	fontWeight:"bold",
};

$.backBtn.addEventListener('click',function(){
	Ti.App.fireEvent('backBtn',{});
});
