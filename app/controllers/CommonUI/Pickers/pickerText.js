
/*
 * Copyright: Activate Interactive
 * Date: March 01 2014
 * 
 * Title: pickerText.js
 * Description: Text picker
 * 
 * ChangeLog: 
 * 
 * 
 * 
 */

//===========================================================================
// PROPERTIES
//===========================================================================	
var args   = arguments[0] || {};
var zIndex = args.zIndex;
var callbackOnHide = args.callbackOnHide;
var callbackOnChange = args.callbackOnChange;
var defaultValue = args.defaultValue;

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
	var text = e.selectedValue[0];
	Alloy.Globals.Debug("OnPickerChange: " + e.selectedValue);
		
	if(flagIsDonePressed == false)
	{
		if(callbackOnChange)
		{
			$.getView("labelData").text = callbackOnChange(e.selectedValue);
		}
		else
		{
			if(e.selectedValue.length > 1)
			{
				for(var i = 1; i < e.selectedValue.length; i++)
				{
					text = text + e.selectedValue[i];
				}
			}
			else
			{
				text = e.row.value;
				
			}
			$.getView("labelData").text = text;
		}
	}
};

// on done button click
var OnBtnDoneClick = function(e)
{
	if(!flagIsDonePressed)
	{
		flagIsDonePressed = true;
		args.callback({value: $.getView("labelData").text});
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
// construct text column
var ConstructColumn = function()
{
	var arrayColumns = [];
	var arrayRows = [];
	var lengthCol = 1;
	var lengthRow = 0 ;
	if(Alloy.Globals.Utils.IsObjectArray(args.data[0])) 
	{
		lengthCol = args.data.length;
		//lengthRow = args.data[0].length;	
	}
	else
	{
		//lengthRow = args.data.length;	
		args.data = [args.data];	
	}
	
	for(var i = 0; i < lengthCol; i++)
	{
		var pickerCol = Ti.UI.createPickerColumn();
		if(Ti.Platform.Android) pickerCol.width = (80 / lengthCol) + "%";
		lengthRow = args.data[i].length;
		for(var j = 0; j < lengthRow; j++)
		{
			pickerCol.addRow(Ti.UI.createPickerRow({title: Alloy.Globals.Utils.TruncateString(args.data[i][j], 30), value: args.data[i][j]}));
		}		
		arrayColumns.push(pickerCol);
	}
	$.getView("picker").setColumns(arrayColumns);
	$.getView("labelData").text = (defaultValue) ? defaultValue : args.data[0][0];
	if(OS_ANDROID) 
	{
		if(args.data[0].length > 1)
		{
			$.picker.setSelectedRow(0, 1, false);			
		}		
	}		
};
//===========================================================================
// END OF FUNCTIONS
//===========================================================================	


//===========================================================================
// LOGICS
//===========================================================================	
ConstructColumn();
//if(OS_ANDROID) $.picker.fireEvent("change");
$.viewPickerBase.bottom = Alloy.CFG.PICKER_TEXT_BOTTOM_POS;
if(zIndex) $.viewPickerBase.zIndex = zIndex;
//===========================================================================
// END OF LOGICS
//===========================================================================	


//===========================================================================
// EXPORTS
//===========================================================================	
// show picker
/*
exports.Show = function(data)
{
	// can only test for true
	if($.viewPickerBase.visible != true) 
	{
		flagIsDonePressed = false
		if(!Alloy.Globals.Utils.IsObjectArray(data)) data = [data]
				
		for(var i = 0; i < data.length; i++)
		{
			var row = 0
			var col = 0
			if(data != null)
			{
				row = (data[i].row) ? data[i].row : 0
				col = (data[i].col) ? data[i].col : 0
			}
			//alert(JSON.stringify("row = " + row + "col = " + col))
			
			$.getView("picker").setSelectedRow(col, row)
		}
		
		// animate up
		$.viewPickerBase.visible = true
		var anim = Ti.UI.createAnimation();
		anim.bottom = "0dip"
		anim.duration = Alloy.CFG.PICKER_ANIMATE_SPEED
		$.viewPickerBase.animate(anim);
		if(Ti.Platform.Android)
			Alloy.CFG.REF_WIN.addEventListener("android:back", OnAndroidBackClick)
	}
}
*/
exports.Show = function(data)
{
	// can only test for true
	if($.viewPickerBase.visible != true) 
	{
		flagIsDonePressed = false;
		if(!Alloy.Globals.Utils.IsObjectArray(data)) data = [data];				
		
		for(var i = 0; i < data.length; i++)
		{
			var row = 0;
			var col = 0;
			if(data != null)
			{
				row = (data[i].row) ? data[i].row : 0;
				col = (data[i].col) ? data[i].col : 0;
			}
			//alert(JSON.stringify("row = " + row + "col = " + col))
			$.getView("picker").setSelectedRow(col, row);
		}
		
		if(OS_IOS)
		{
			// animate up
			$.viewPickerBase.visible = true;
			var anim = Ti.UI.createAnimation();
			anim.bottom = "0dip";
			anim.duration = Alloy.CFG.PICKER_ANIMATE_SPEED;
			$.viewPickerBase.animate(anim);
		}
		else
		{
			$.viewPickerBase.bottom = 0;
			Alloy.CFG.REF_WIN.addEventListener("android:back", OnAndroidBackClick);
			$.viewPickerBase.visible = true;
		}
		// animate up
		
		/*
		var anim = Ti.UI.createAnimation();
		anim.bottom = "0dip"
		anim.duration = Alloy.CFG.PICKER_ANIMATE_SPEED
		$.viewPickerBase.animate(anim);
		if(Ti.Platform.Android)
			Alloy.CFG.REF_WIN.addEventListener("android:back", OnAndroidBackClick)
		*/
	}
};



// hide picker
/*
exports.Hide = function(noAnimation)
{
	if($.viewPickerBase.visible == true)
	{
		// animate down
		if(noAnimation == null)
		{
			var anim = Ti.UI.createAnimation();
		    anim.bottom = Alloy.CFG.PICKER_TEXT_BOTTOM_POS
		    anim.duration = Alloy.CFG.PICKER_ANIMATE_SPEED
			$.viewPickerBase.animate(anim)
			
			var OnComplete = function()
			{
				anim.removeEventListener("complete", OnComplete)
				$.viewPickerBase.visible = false
			}
			anim.addEventListener("complete", OnComplete)
		}
		else
		{
			$.viewPickerBase.bottom = Alloy.CFG.PICKER_TEXT_BOTTOM_POS
			$.viewPickerBase.visible = false
		}
		if(Ti.Platform.Android)
			Alloy.CFG.REF_WIN.removeEventListener("android:back", OnAndroidBackClick)
	}	
}
*/

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
			};
			anim.addEventListener("complete", OnComplete);
		}
		else
		{
			$.viewPickerBase.bottom = Alloy.CFG.PICKER_TEXT_BOTTOM_POS;
			$.viewPickerBase.visible = false;
			Alloy.CFG.REF_WIN.removeEventListener("android:back", OnAndroidBackClick);
			if(callbackOnHide) callbackOnHide();
		}
		
		/*
		// animate down
		if(noAnimation == null)
		{
			var anim = Ti.UI.createAnimation();
		    anim.bottom = Alloy.CFG.PICKER_TEXT_BOTTOM_POS
		    anim.duration = Alloy.CFG.PICKER_ANIMATE_SPEED
			$.viewPickerBase.animate(anim)
			
			var OnComplete = function()
			{
				anim.removeEventListener("complete", OnComplete)
				$.viewPickerBase.visible = false
			}
			anim.addEventListener("complete", OnComplete)
		}
		else
		{
			$.viewPickerBase.bottom = Alloy.CFG.PICKER_TEXT_BOTTOM_POS
			$.viewPickerBase.visible = false
		}
		if(Ti.Platform.Android)
			Alloy.CFG.REF_WIN.removeEventListener("android:back", OnAndroidBackClick)
		*/
	}	
};
//===========================================================================
// END OF EXPORTS
//===========================================================================	
