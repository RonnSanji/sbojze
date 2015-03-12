
/*
 * Copyright: Activate Interactive
 * Date: March 01 2014
 * 
 * Title: pickerTime.js
 * Description: Time picker
 * 
 * ChangeLog: 
 * 
 * 
 * 
 */

//===========================================================================
// PROPERTIES
//===========================================================================	
var args = arguments[0] || {};
//===========================================================================
// END OF PROPERTIES
//===========================================================================	


//===========================================================================
// HANDLERS
//===========================================================================	
// on picker selection change
var OnPickerChange = function(e)
{
	$.getView("labelData").text = Alloy.Globals.Utils.GetTimeFromDateInHHMM(e.value);
};

// on done button click
var OnBtnDoneClick = function(e)
{
	args.callback({value: $.getView("picker").value});
	$.Hide();
};

// on android back button click
var OnAndroidBackClick = function(e)
{
	$.Hide();
};
//===========================================================================
// END OF HANDLERS
//===========================================================================	


//===========================================================================
// LOGICS
//===========================================================================	
$.viewPickerBase.bottom = Alloy.CFG.PICKER_BOTTOM_POS;
if(Ti.Platform.Android)
{
	$.viewCover.visible = true;
	$.picker.format24 = true;
} 
//===========================================================================
// END OF LOGICS
//===========================================================================	


//===========================================================================
// EXPORTS
//===========================================================================
// show picker
exports.Show = function(data)
{
	// can only test for true
	if($.viewPickerBase.visible != true) 
	{
		var newValue = (data) ? data : new Date();
		$.getView("labelData").text = Alloy.Globals.Utils.GetTimeFromDateInHHMM(newValue);
		$.getView("picker").value = newValue;
			
		$.viewPickerBase.visible = true;
		var anim = Ti.UI.createAnimation();
		anim.bottom = "0dip";
		anim.duration = Alloy.CFG.PICKER_ANIMATE_SPEED;
		$.viewPickerBase.animate(anim);
		if(Ti.Platform.Android)
			Alloy.CFG.REF_WIN.addEventListener("android:back", OnAndroidBackClick);
	}
};

// hide picker
exports.Hide = function()
{
	if($.viewPickerBase.visible == true)
	{
		var anim = Ti.UI.createAnimation();
	    anim.bottom = Alloy.CFG.PICKER_BOTTOM_POS;
	    anim.duration = Alloy.CFG.PICKER_ANIMATE_SPEED;
		$.viewPickerBase.animate(anim);
		
		var OnComplete = function()
		{
			anim.removeEventListener("complete", OnComplete);
			$.viewPickerBase.visible = false;
		};
		anim.addEventListener("complete", OnComplete);
		
		if(Ti.Platform.Android)
			Alloy.CFG.REF_WIN.removeEventListener("android:back", OnAndroidBackClick);
	}	
};
//===========================================================================
// END OF EXPORTS
//===========================================================================
