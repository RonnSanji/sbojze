
/*
 * Copyright: Activate Interactive
 * Date: March 01 2014
 * 
 * Title: pickerDate.js
 * Description: Date picker
 * 
 * ChangeLog: 
 * 
 * 
 * 
 */

//===========================================================================
// PROPERTIES
//===========================================================================	
var args      = arguments[0] || {};
var protector = args.protector;
var maxDate   = args.maxDate;
var minDate   = args.minDate;
var zIndex    = args.zIndex;
var callbackOnHide = args.callbackOnHide;

var pickerAndroid      = null;
var pickerAndroidCover = null;

// flags
var flagIsDonePressed = false;
//===========================================================================
// END OF PROPERTIES
//===========================================================================	


//===========================================================================
// HANDLERS
//===========================================================================	
// on picker selection change
var OnPickerChange = function(e)
{
	$.getView("labelData").text = Alloy.Globals.Utils.ConvertFromDateToDayDDMMYYYY(e.value);
};

// on done button click
var OnBtnDoneClick = function(e)
{
	if(!flagIsDonePressed)
	{
		flagIsDonePressed = true;
		if(pickerAndroid)
		{
			args.callback({value: pickerAndroid.value});
		}
		else
		{
			args.callback({value: $.getView("picker").value});
		}		
		$.Hide();
	}
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
// FUNCTIONS
//===========================================================================	
// create picker
var CreatePicker = function(date)
{
	if(minDate && maxDate)
	{
		pickerAndroid = Ti.UI.createPicker({
			type: Ti.UI.PICKER_TYPE_DATE,
			selectionIndicator: "true",
			value: date,
			minDate: minDate,
			maxDate: maxDate,
			
		});	
	}
	else if(minDate)
	{
		pickerAndroid = Ti.UI.createPicker({
			type: Ti.UI.PICKER_TYPE_DATE,
			value: date,
			selectionIndicator: "true",
			minDate: minDate,
		});	
	}
	else if(maxDate)
	{
		pickerAndroid = Ti.UI.createPicker({
			type: Ti.UI.PICKER_TYPE_DATE,
			value: date,
			selectionIndicator: "true",
			maxDate: maxDate
		});	
	}
	else
	{
		pickerAndroid = Ti.UI.createPicker({
			type: Ti.UI.PICKER_TYPE_DATE,
			value: date,
			selectionIndicator: "true",
		});	
	}
		
	pickerAndroidCover = Ti.UI.createView({
		height: "55dip",
		//top: "40dip",
		//backgroundColor: "yellow"
	});
	
	$.viewPickerBg.add(pickerAndroid);
	$.viewPickerBg.add(pickerAndroidCover);
	pickerAndroid.addEventListener("change", OnPickerChange);
};

// destroy picker
var DestroyPicker = function()
{
	if(pickerAndroid)
	{
		$.viewPickerBg.removeAllChildren();
		pickerAndroid.removeEventListener("change", OnPickerChange);
		pickerAndroid      = null;
		pickerAndroidCover = null;
	}	
};
//===========================================================================
// END OF FUNCTIONS
//===========================================================================	


//===========================================================================
// LOGICS
//===========================================================================	
if(maxDate) $.getView("picker").maxDate = maxDate;
if(minDate) $.getView("picker").minDate = minDate;
$.viewPickerBase.bottom = Alloy.CFG.PICKER_DATE_BOTTOM_POS;
if(zIndex) $.viewPickerBase.zIndex = zIndex;
if(OS_ANDROID)
{
	$.viewPickerBg.removeAllChildren();
}
/*
if(OS_ANDROID && (maxDate || minDate))
{
	//CreatePicker()
	
	$.picker.visible = false
	if(minDate && maxDate)
	{
		pickerAndroid = Ti.UI.createPicker({
			type: Ti.UI.PICKER_TYPE_DATE,
			selectionIndicator: "true",
			minDate: minDate,
			maxDate: maxDate
		})	
	}
	else if(minDate)
	{
		pickerAndroid = Ti.UI.createPicker({
			type: Ti.UI.PICKER_TYPE_DATE,
			selectionIndicator: "true",
			minDate: minDate,
		})	
	}
	else if(maxDate)
	{
		pickerAndroid = Ti.UI.createPicker({
			type: Ti.UI.PICKER_TYPE_DATE,
			selectionIndicator: "true",
			maxDate: maxDate
		})	
	}
	
	$.viewPickerBg.add(pickerAndroid)
	$.viewPickerBg.add(Ti.UI.createView({
		height: "55dip",
		top: "40dip"
	}))
	pickerAndroid.addEventListener("change", OnPickerChange)
	
}
else if(OS_ANDROID)
{
	$.viewCover.visible = true
} 
*/
//===========================================================================
// END OF LOGICS
//===========================================================================	


//===========================================================================
// EXPORTS
//===========================================================================
// set minimum date
exports.SetMinDate = function(date)
{
	if(OS_ANDROID)
	{
		minDate = date;
	}
	else
	{
		$.picker.setMinDate(date);
	}
};

// set maximum date
exports.SetMaxDate = function(date)
{
	if(OS_ANDROID)
	{
		maxDate = date;
	}
	else
	{
		$.picker.setMaxDate(date);
	}
};

// show picker
exports.Show = function(date)
{
	// can only test for true
	if($.viewPickerBase.visible != true) 
	{
		if(protector) protector.visible = true;
		flagIsDonePressed = false;
		var newDate = (date) ? date : new Date();
		if(OS_IOS)
		{
			if($.picker.minDate && newDate < $.picker.minDate)
				newDate = $.picker.minDate;	
		}
		else
		{
			if(minDate && newDate < minDate)
				newDate = minDate;	
		}
		
		$.getView("labelData").text = Alloy.Globals.Utils.ConvertFromDateToDayDDMMYYYY(newDate);
		$.getView("picker").value = newDate;
				
		if(OS_IOS)
		{
			$.viewPickerBase.visible = true;
			var anim = Ti.UI.createAnimation();
			anim.bottom = "0dip";
			anim.duration = Alloy.CFG.PICKER_ANIMATE_SPEED;
			$.viewPickerBase.animate(anim);					
		}
		else
		{
			CreatePicker(newDate);
			Alloy.CFG.REF_WIN.addEventListener("android:back", OnAndroidBackClick);
			$.viewPickerBase.bottom = 0;
			$.viewPickerBase.visible = true;
		}	
			
	}
};

// hide picker
exports.Hide = function(noAnimation)
{
	if($.viewPickerBase.visible == true)
	{		
		if(OS_IOS)
		{
			// animate down
			var anim = Ti.UI.createAnimation();
		    anim.bottom = Alloy.CFG.PICKER_TEXT_BOTTOM_POS;
		    anim.duration = Alloy.CFG.PICKER_ANIMATE_SPEED;
			$.viewPickerBase.animate(anim);
			var OnComplete = function()
			{
				anim.removeEventListener("complete", OnComplete);
				$.viewPickerBase.visible = false;
				if(protector) protector.visible = false;
			};
			anim.addEventListener("complete", OnComplete);
		}
		else
		{
			$.viewPickerBase.bottom = Alloy.CFG.PICKER_TEXT_BOTTOM_POS;
			$.viewPickerBase.visible = false;
			if(protector) protector.visible = false;
			DestroyPicker();
			Alloy.CFG.REF_WIN.removeEventListener("android:back", OnAndroidBackClick);
			if(callbackOnHide) callbackOnHide();
		}
	}	
};
//===========================================================================
// END OF EXPORTS
//===========================================================================
