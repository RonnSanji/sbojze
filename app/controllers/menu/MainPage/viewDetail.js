var args = arguments[0] || {};

var position = args.position;

var dp_width_rate;
if(Ti.Platform.osname == 'android')
{
	dp_width_rate = Titanium.Platform.displayCaps.platformWidth / Titanium.Platform.displayCaps.logicalDensityFactor / 720;
}
else{
	dp_width_rate = Titanium.Platform.displayCaps.platformWidth / 720;
}

$.addressTitle.top = "10%";
$.addressTitle.font = {
	fontSize:36*dp_width_rate,
	fontWeight:"bold",
};

$.addressInfoImage.top = "5%";
$.addressInfoImage.left = "5%";
$.addressInfoImage.width = 40*dp_width_rate;
$.addressInfoImage.height = 40*dp_width_rate;

$.addressInfoText.left = "5%";
$.addressInfoText.top = "5%";
$.addressInfoText.width = "78%";
$.addressInfoText.font = {
	fontSize:28*dp_width_rate,
	fontWeight:"normal",
};

$.addressPhoneImage.top = "5%";
$.addressPhoneImage.left = "5%";
$.addressPhoneImage.width = 40*dp_width_rate;
$.addressPhoneImage.height = 40*dp_width_rate;

$.addressPhoneText.left = "5%";
$.addressPhoneText.top = "5%";
$.addressPhoneText.width = "78%";
$.addressPhoneText.font = {
	fontSize:28*dp_width_rate,
	fontWeight:"normal",
};

$.StartTimeTitle.font = {
	fontSize:30*dp_width_rate,
	fontWeight:"bold",
};
$.DurationTitle.font = {
	fontSize:30*dp_width_rate,
	fontWeight:"bold",
};
$.AttireTitle.font = {
	fontSize:30*dp_width_rate,
	fontWeight:"bold",
};

$.StartTimeContent.font = {
	fontSize:30*dp_width_rate,
	fontWeight:"normal",
};
$.DurationContent.font = {
	fontSize:30*dp_width_rate,
	fontWeight:"normal",
};
$.AttireContent.font = {
	fontSize:30*dp_width_rate,
	fontWeight:"normal",
};

// $.vacancyCurrent.borderWidth = 1;
$.vacancyCurrent.top = "25%";
$.vacancyCurrent.height = "75%";
$.vacancyCurrent.bottom = 0;
$.vacancyCurrent.font = {
	fontSize:80*dp_width_rate,
	fontWeight:"bold",
};

// $.vacancyMax.borderWidth = 1;
$.vacancyMax.height = "40%";
$.vacancyMax.bottom = 0;
$.vacancyMax.font = {
	fontSize:44*dp_width_rate,
	fontWeight:"normal",
};

$.vacancyTitle.font = {
	fontSize:28*dp_width_rate,
	fontWeight:'bold',
};

$.dateImage.top = "15%",
$.dateImage.width = 100*dp_width_rate;
$.dateImage.height = 100*dp_width_rate;
$.dateText.font = {
	fontSize:28*dp_width_rate,
	fontWeight:'normal',
};

$.applyText.font = {
	fontSize:30*dp_width_rate,
	fontWeight:"bold",
};

//setValues
$.photo.image = position.image;