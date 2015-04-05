//PROPERTIES
var args = arguments[0] || {};
var date = args.initValue;
$.datePicker.value = date;
$.dateDisplay.text = Alloy.Globals.commonFunc.formatDate(date);

var animation_up = Titanium.UI.createAnimation();
animation_up.bottom = 0;
var animation_down = Titanium.UI.createAnimation();
animation_down.bottom = "-50%";
//END OF PEPERTIES

//FORMAT
var dp_width_rate = Alloy.Globals.DP_WIDTH_RATE;
$.dateDisplay.font = {
	fontSize:40*dp_width_rate,
	fontWeight:"bold",
}; 
$.doneBtn.font = {
	fontSize:34*dp_width_rate,
	fontWeight:"bold",
};
//END OF FORMAT

//FUNCTION
var upAnimation_onComplete = function(){
	$.pickerView.touchEnabled = true;
	animation_up.removeEventListener('complete',upAnimation_onComplete);
}; 

var upAnimation = function(){
	animation_up.addEventListener('complete',upAnimation_onComplete);
	$.pickerView.visible = true;
	$.pickerView.animate(animation_up);
};

var downAnimation_onComplete = function(){
	$.pickerView.visible = false;
	args.callback({value: $.datePicker.value});
	animation_down.removeEventListener('complete',downAnimation_onComplete);
};
var downAnimation = function(){
	animation_down.addEventListener('complete',downAnimation_onComplete);
	$.pickerView.touchEnabled = false;
	$.pickerView.animate(animation_down);
};

var init = function(){
	upAnimation();
};
//END OF FUNCTION

//HANDLER
$.datePicker.addEventListener('change',function(){
	var date = $.datePicker.value;
	$.dateDisplay.text = Alloy.Globals.commonFunc.formatDate(date);
});
$.doneBtn.addEventListener('click',function(){
	downAnimation();
});
//END OF HANDLER

//LOGIC
init();
//END OF LOGIC


