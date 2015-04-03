var args = arguments[0] || {};

var date = args.initValue;
$.datePicker.value = date;

$.dateDisplay.text = Alloy.Globals.commonFunc.formatDate(date);

$.datePicker.addEventListener('change',function(){
	var date = $.datePicker.value;
	$.dateDisplay.text = Alloy.Globals.commonFunc.formatDate(date);
});

var animation_up = Titanium.UI.createAnimation();
animation_up.bottom = 0;
var animation_down = Titanium.UI.createAnimation();
animation_down.bottom = "-50%";

var upAnimation_onComplete = function(){
	$.pickerView.touchEnabled = true;
	animation_up.removeEventListener('complete',upAnimation_onComplete);
}; 

var upAnimation = function(){
	animation_up.addEventListener('complete',upAnimation_onComplete);
	$.pickerView.visible = true;
	$.pickerView.animate(animation_up);
};

upAnimation();

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

$.doneBtn.addEventListener('click',function(){
	downAnimation();
	
});
