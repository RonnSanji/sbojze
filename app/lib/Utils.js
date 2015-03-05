
/*
 * Copyright: Activate Interactive
 * Date: March 01 2014
 * 
 * Title: Utils.js
 * Description: Utility functions 
 * 
 * ChangeLog: 
 * 
 * 
 */

//===========================================================================
// REQUIRED FILES
//===========================================================================
var Alloy = require("alloy"), _ = require("alloy/underscore")._, Backbone = require("alloy/backbone");
//===========================================================================
// END OF REQUIRED FILES
//===========================================================================


//===========================================================================
// MODULE DECLARACTION
//===========================================================================
function Utils(){}
module.exports = Utils;
//===========================================================================
// END OF MODULE DECLARACTION
//===========================================================================


//===========================================================================	
// EXPORTS
//===========================================================================
// convert from numeric number to Day
module.exports.ConvertFromNumToDay = function(num)
{
	switch(num.toString())
	{
		case "0": return "Sun";
		case "1": return "Mon";
		case "2": return "Tue";
		case "3": return "Wed";
		case "4": return "Thu";
		case "5": return "Fri";
		case "6": return "Sat";
		default: return num;
	}
};

// convert from numeric number to Month
module.exports.ConvertFromNumToMonth = function(num)
{
	switch(num.toString())
	{
		case "0": return "January";
		case "1": return "Feburary";
		case "2": return "March";
		case "3": return "April";
		case "4": return "May";
		case "5": return "June";
		case "6": return "July";
		case "7": return "August";
		case "8": return "September";
		case "9": return "October";
		case "10": return "November";
		case "11": return "December";
	}
};

// convert from Month (eg Jan) to numeric number
module.exports.ConvertFromMonthToNum = function(Mth)
{
	switch(Mth)
	{
		case "Jan": return "0";
		case "Feb": return "1";
		case "Mar": return "2";
		case "Apr": return "3";
		case "May": return "4";
		case "Jun": return "5";
		case "Jul": return "6";
		case "Aug": return "7";
		case "Sep": return "8";
		case "Oct": return "9";
		case "Nov": return "10";
		case "Dec": return "11";
	}
};

// check if two dates are equal
module.exports.IsDatesEqual = function(e)
{
	var dateA = e.dateA;
	var dateB = e.dateB;
	if(dateA && dateB)
	{
		return (dateA.getDate() == dateB.getDate()
			&& dateA.getMonth() == dateB.getMonth()
			&& dateA.getFullYear() == dateB.getFullYear());
	}	
	return false;	
};

// convert from date obj to Day, DD/MM/YYYY 
module.exports.ConvertFromDateToDayDDMMYYYY = function(date)
{
	var day = date.getDay();
	var DD  = date.getDate();
	var MM  = date.getMonth() + 1;
	var YYYY = date.getFullYear();
		
	if(DD.toString().length < 2) DD = "0" + DD;
	if(MM.toString().length < 2) MM = "0" + MM;
	
	return Utils.ConvertFromNumToDay(day) + ", " + DD + "/" + MM + "/" + YYYY;
};

// convert from Day DD/MM/YYYY to date obj
module.exports.ConvertFromDayDDMMYYYYToDate = function(e)
{
	var DDMMYYYY  = e.date.split(" ")[1];
	var sep       = e.separator || "/";
	var clearTime = e.clearTime || false;
	
	DDMMYYYY = DDMMYYYY.split(sep);
		
	var newDate = new Date(Date.UTC(DDMMYYYY[2], DDMMYYYY[1] - 1, DDMMYYYY[0], 0, 0, 0, 0));
	var UTC = new Date(Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 0, 0, 0, 0));
	if(clearTime)
	{
		return new Date(UTC.getFullYear(), UTC.getMonth(), UTC.getDate(), 0, 0, 0, 0);
	}
	return UTC;
};

// convert from date obj to YYYYMMDD 
module.exports.ConvertFromDateToYYYYMMDD = function(e)
{
	var date = e.date;
	var DD  = date.getDate();
	var MM  = date.getMonth() + 1;
	var YYYY = date.getFullYear();
		
	if(DD.toString().length < 2) DD = "0" + DD;
	if(MM.toString().length < 2) MM = "0" + MM;
	
	return YYYY.toString() + MM.toString() + DD.toString();
};

// convert from date obj to DD/MM/YYYY 
module.exports.ConvertFromDateToDDMMYYYY = function(date)
{
	var DD  = date.getDate();
	var MM  = date.getMonth() + 1;
	var YYYY = date.getFullYear();
		
	if(DD.toString().length < 2) DD = "0" + DD;
	if(MM.toString().length < 2) MM = "0" + MM;
	
	return DD + "/" + MM + "/" + YYYY;
};

// convert from date obj to DD/MM/YYYY hh:mm
module.exports.ConvertFromDateToDDMMYYYYhhmm = function(e)
{
	var date = e.date;
	var DD   = date.getDate();
	var MM   = date.getMonth() + 1;
	var YYYY = date.getFullYear();
	var hh   = date.getHours();
	var mm   = date.getMinutes();
		
	if(DD.toString().length < 2) DD = "0" + DD;
	if(MM.toString().length < 2) MM = "0" + MM;
	if(hh.toString().length < 2) hh = "0" + hh;
	if(mm.toString().length < 2) mm = "0" + mm;
	
	return DD + "/" + MM + "/" + YYYY + " " + hh + ":" + mm;
};

// convert from DD/MM/YYYY to date obj
module.exports.ConvertFromDDMMYYYYToDate = function(e)
{
	var DDMMYYYY  = e.date;
	var sep       = e.separator || "/";
	var clearTime = e.clearTime || false;
	
	DDMMYYYY = DDMMYYYY.split(sep);
		
	var newDate = new Date(Date.UTC(DDMMYYYY[2], DDMMYYYY[1] - 1, DDMMYYYY[0], 0, 0, 0, 0));
	var UTC = new Date(Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 0, 0, 0, 0));
	if(clearTime)
	{
		return new Date(UTC.getFullYear(), UTC.getMonth(), UTC.getDate(), 0, 0, 0, 0);
	}
	return UTC;
};

// convert from DD MMM YYYY to date obj
module.exports.ConvertFromDD_MMM_YYYYToDate = function(e)
{
	var DDMMYYYY  = e.date;
	var clearTime = e.clearTime || false;
	
	DDMMYYYY = DDMMYYYY.split(" ");
		
	var newDate = new Date(Date.UTC(DDMMYYYY[2], Utils.ConvertFromMonthToNum(DDMMYYYY[1]), DDMMYYYY[0], 0, 0, 0, 0));
	var UTC = new Date(Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 0, 0, 0, 0));
	if(clearTime)
	{
		return new Date(UTC.getFullYear(), UTC.getMonth(), UTC.getDate(), 0, 0, 0, 0);
	}
	return UTC;
};


// convert from DDMMYYYY to date obj
module.exports.ConvertFromDDMMYYYYNoSeparatorToDate = function(e)
{
	var DDMMYYYY  = e.date;
	var clearTime = e.clearTime || false;
	
	var YYYY = DDMMYYYY.slice(4);
	var MM   = DDMMYYYY.slice(2,4);
	var DD   = DDMMYYYY.slice(0,2);
			
	var newDate = new Date(Date.UTC(YYYY, MM - 1, DD, 0, 0, 0, 0));
	var UTC = new Date(Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 0, 0, 0, 0));
	if(clearTime)
	{
		return new Date(UTC.getFullYear(), UTC.getMonth(), UTC.getDate(), 0, 0, 0, 0);
	}
	return UTC;
};

// convert from YYYYMMDD with seperator to date obj
module.exports.ConvertFromYYYYMMDDToDate = function(e)
{
	var separator = e.separator || "/";
	var YYYYMMDD  = e.date;
	var clearTime = e.clearTime || false;
	
	YYYYMMDD = YYYYMMDD.split(separator);
		
	var newDate = new Date(Date.UTC(YYYYMMDD[0], YYYYMMDD[1] - 1, YYYYMMDD[2], 0, 0, 0, 0));
	var UTC     = new Date(Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 0, 0, 0, 0));
	if(clearTime)
	{
		return new Date(UTC.getFullYear(), UTC.getMonth(), UTC.getDate(), 0, 0, 0, 0);
	}
	return UTC;
};

// convert from YYYYMMDD to date obj
module.exports.ConvertFromYYYYMMDDNoSeperatorToDate = function(e)
{
	var YYYYMMDD  = e.date;
	var clearTime = e.clearTime || false;
	
	var YYYY = YYYYMMDD.slice(0,4);
	var MM   = YYYYMMDD.slice(4,6);
	var DD   = YYYYMMDD.slice(6);
	
	var newDate = new Date(Date.UTC(parseInt(YYYY, 10), parseInt(MM, 10) - 1, parseInt(DD, 10), 0, 0, 0));
	var UTC     = new Date(Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 0, 0, 0, 0));
	if(clearTime)
	{
		return new Date(UTC.getFullYear(), UTC.getMonth(), UTC.getDate(), 0, 0, 0, 0);
	}
	return UTC;
};

// convert from YYYYMMDD with separator to DD/MM/YYYY
module.exports.ConvertFromYYYYMMDDWithSeperatorToDDMMYYYYWithSlashes = function(e)
{
	var YYYYMMDD  = e.date;
	var separator = e.separator;
	var myDate = YYYYMMDD.split(separator);
	var YYYY = myDate[0];
	var MM   = myDate[1];
	var DD   = myDate[2];
		
	return DD + "/" + MM + "/" + YYYY;
};

// convert from DD MMM YYYY (eg 9 Jul 2013)  DD/MM/YYYY 
module.exports.ConvertFromDDmmmYYYYToDDMMYYYY = function(e)
{
	var DDMMYYYY = e.date.split(" ");
	
	var DD  = DDMMYYYY[0];
	var MM  = parseInt(Utils.ConvertFromMonthToNum(DDMMYYYY[1])) + 1;
	var YYYY = DDMMYYYY[2];
		
	if(DD.toString().length < 2) DD = "0" + DD;
	if(MM.toString().length < 2) MM = "0" + MM;
	
	return  DD + "/" + MM + "/" + YYYY;
};

// convert from DDMMYYYY to YYYYMMDD
module.exports.ConvertFromDDMMYYYYToYYYYMMDD = function(DDMMYYYY)
{
	return DDMMYYYY.slice(4) + DDMMYYYY.slice(2,4) + DDMMYYYY.slice(0,2);
};

// convert from DDMMYYYY to DD/MM/YYYY
module.exports.ConvertFromDDMMYYYYToDDMMYYYYWithSlashes = function(DDMMYYYY)
{
	return DDMMYYYY.slice(0,2) + "/" + DDMMYYYY.slice(2,4) + "/" + DDMMYYYY.slice(4);
};

// convert from DDMMYYYY with separator to YYYYMMDD
module.exports.ConvertFromDDMMYYYYWithSeparatorToYYYYMMDD = function(e)
{
	var DDMMYYYY = e.date;
	var separator = e.separator;
	var myDate = DDMMYYYY.split(separator);
	return myDate[2] + myDate[1] + myDate[0];
};

// convert from DDMMYY with separator to DD/MM/YYYY
module.exports.ConvertFromDDMMYYYYWithSeparatorToYYYYMMDDWithSlashes = function(e)
{
	var date = e.date;
	var separator = e.separator;
	var DDMMYYYY = date.split(separator);	
	return DDMMYYYY[0] + "/" + DDMMYYYY[1] + "/" + "20" + DDMMYYYY[2];
};

// convert from YYYYMMDD to DD/MM/YYYY
module.exports.ConvertFromYYYYMMDDToDDMMYYYYWithSeparator = function(e)
{
	var YYYYMMDD  = e.date;
	var separator = e.separator;
	return YYYYMMDD.slice(6) + separator + YYYYMMDD.slice(4,6) + separator + YYYYMMDD.slice(0,4);
};

// get time from date in HH:SS
module.exports.GetTimeFromDateInHHMM = function(date)
{
	var HH = date.getHours();
	var MM = date.getMinutes();
	
	if(HH.toString().length < 2) HH = "0" + HH;
	if(MM.toString().length < 2) MM = "0" + MM;
	
	return HH + ":" + MM;
};

// convert from time in HH:SS to date
module.exports.ConvertFromTimeInHHMMToDate = function(time)
{
	var HHSS = time.split(":");
	var date = new Date();
	var UTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0));
	return new Date(UTC.getFullYear(), UTC.getMonth(), UTC.getDate(), HHSS[0], HHSS[1], 0, 0);
};

// convert from DD/MM/YYYY hh:mm period (12/12/2014 12:00AM) to date
module.exports.ConvertFromMaintenanceDateToDate = function(e)
{
	var DDMMYYYY = e.date;
	var TIME     = e.time;
	
	DDMMYYYY = DDMMYYYY.split("/");
	TIME     = TIME.split(":");
	PERIOD   = TIME[1].slice(2);
	
	var hh = TIME[0];
	var mm = TIME[1].slice(0, 2);
	
	if(PERIOD == "PM" && (parseInt(hh) != 12))
	{
		hh = (parseInt(hh) + 12);
	} 
	
	if(PERIOD == "AM" && (parseInt(hh) == 12))
	{
		hh = 0;
	}
	
	if(hh.toString().length < 2) hh = "0" + hh;
	if(mm.toString().length < 2) mm = "0" + mm;
	
	return new Date(DDMMYYYY[2], DDMMYYYY[1] - 1, DDMMYYYY[0], hh, mm, 0, 0);
};

// calculate days between dates 
module.exports.CalculateDaysBetweenDates = function(e)
{
	var dateFrom = e.dateFrom;
	var dateTo   = e.dateTo;
	Alloy.Globals.Debug("dateTo = " + dateTo);
	Alloy.Globals.Debug("dateFrom = " + dateFrom);
	var oneDay = 86400000; // milliseconds	
	
	return Math.round(Math.abs((dateFrom.getTime() - dateTo.getTime()) / oneDay));
};


// sleep for a period of time
module.exports.Sleep = function(e) 
{
	var milliseconds = e.time;
	
	var start = new Date().getTime();
   	while((new Date().getTime() - start) < milliseconds){
   		// Do nothing
   	}
};

// check if object is an array
module.exports.IsObjectArray = function(obj)
{
    return Object.prototype.toString.call(obj) == '[object Array]';
};

// check if object is a string
module.exports.IsObjectString = function(obj)
{
    return Object.prototype.toString.call(obj) == '[object String]';
};

// check if object is empty
module.exports.IsObjectEmpty = function(obj) 
{ 
  var isEmpty = true; 
  for(keys in obj) 
  { 
     isEmpty = false; 
     break; // exiting since we found that the object is not empty 
  } 
  return isEmpty; 
};

// check if object is string and return
module.exports.GetString = function(obj)
{
	return (Utils.IsObjectString(obj) ? obj : "");
};

// check if string is empty and return {}
module.exports.SetStringToObject = function(str)
{
	return ((str == "") ? {} : str);
};

// check if NRIC is valid	 	 
module.exports.IsNricValid = function(theNric)
{
	theNric = theNric.toUpperCase();
	var multiples = [2, 7, 6, 5, 4, 3, 2];		
	if(!theNric || theNric == '') 
	{
		return false;
	}
	
	if(theNric.length != 9) 
	{
		return false;
	}
	
	var total = 0, count = 0, numericNric;
	var first = theNric[0], last = theNric[theNric.length - 1];

	if(first != 'S' && first != 'T') 
	{
		return false;
	}
	numericNric = theNric.substr(1, theNric.length - 2);

	if(isNaN(numericNric)) 
	{
		return false;
	}
	
	while(numericNric != 0) 
	{
		total += (numericNric % 10) * multiples[multiples.length - (1 + count++)];
		numericNric /= 10;
		numericNric = Math.floor(numericNric);
	}
	
	var outputs;
	if(first == 'S') 
	{
		outputs = ['J', 'Z', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
	}
	else
	{
		outputs = ['G', 'F', 'E', 'D', 'C', 'B', 'A', 'J', 'Z', 'I', 'H'];
	}

	return last == outputs[total % 11];
};	

// check if passport is valid
module.exports.IsPassportValid = function(passport)
{
	var regex_number = /\d{1}/;
	var regex_alphanum = /^[a-zA-Z0-9]*$/;

	if (passport.length >= 7) //contains at least 7 characters
	{
		if (regex_alphanum.test(passport)) //contains only alphabets and digits
		{
			if (regex_number.test(passport)) //contains at least 1 number
			{
				var counter = 0;
				var sameDigitOccur = 0;
				var consecRunningOccur = 0;

				do
				{
					if (passport.charAt(counter) == passport.charAt(counter + 1)) // same digit check
					{
						sameDigitOccur++;
					}
					
					if ((passport.charAt(counter) - passport.charAt(counter + 1) == 1) || (passport.charAt(counter) - passport.charAt(counter + 1) == -1)) // ascending and descending running numbers check
					{
						consecRunningOccur++;
					}
					counter++;
				}
				while (counter < passport.length - 1);

				if (sameDigitOccur < passport.length - 1 && consecRunningOccur < passport.length - 1)
				{
					return true;
				}
				
				else
				{
					return false;
				}
			}

			else
			{
				return false;
			}
		}
		
		else
		{
			return false;
		}
	}
	
	else
	{
		return false;
	}
};


// check if email is valid
module.exports.IsEmailValid = function(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

// check if value is number
module.exports.IsNumeric = function(value)
{	
	return !isNaN(parseFloat(value)) && isFinite(value);
};

// check if local contact number is valid
module.exports.IsLocalContactNumValid = function(num)
{	
	if(num.length != 8)
		return false;
	else if(isNaN(num))
		return false;
	else if(num[0] == '9' || num[0] == '8' || num[0] == '6')	
		return true;
	else 
		return false;
};

// check if home number is valid
module.exports.IsHomeNumberValid = function(num)
{
	if(num.length != 8)
		return false;
	else if(num[0] != '6')
		return false;
	else if(isNaN(num))
		return false;
	else
		return true;
};

// check if mobile number is valid
module.exports.IsMobileNumberValid = function(num)
{
	
	if(num.length != 8)
		return false;
	else if(isNaN(num))
		return false;
	else if(num[0] == '9' || num[0] == '8')	
		return true;
	else 
		return false;
};

// check if postal code valid
module.exports.IsPostalCodeValid = function(postDist)
{
	if((postDist.length != 6 || !Utils.IsNumeric(postDist) || postDist == "000000"))
		return false;
	else
		return true;
};

// check string is within valid ascii
module.exports.IsStringValidASCII = function(str)
{
	if(typeof(str) !== 'string')
	{
		return false;
	}
	for(var i = 0; i < str.length; i++)
	{
		if(str.charCodeAt(i) > 127)
		{
			return false;
		}
	}
	return true;
};

// check if has character in string
module.exports.HasCharInString = function(str, character)
{
	if(str.indexOf(character) === -1)
		return false;
	else
		return true;
};

// check if has HTML character in string
module.exports.HasHTMLCharInString = function(str)
{
	 if(str.match(/<!--|-->|</) != null)
	 	return true;
	 else
	 	return false;	        
};

// truncate long string
module.exports.TruncateString = function(text, length)
{
	if(text.length > length)
	{
		text = text.substring(0, (length - 1)) + "...";
	}
	return text;
};


// get index for single column array
module.exports.GetIndexFromArray = function(array, text)
{	
	for(var i = 0; i < array.length; i++)
	{
		if(array[i] == text)
			return i;
	}
	return null;
};

// prompt alert 
module.exports.PromptAlert = function(e)
{
	var title     = e.title;
	var message   = e.message;
	var btns      = e.btns || ["OK"];
	var callbacks = e.callbacks; 
	
	var alertDialog = Ti.UI.createAlertDialog({   
		buttonNames: btns, 
		message: message,		    	
		persistent: true,
		title: title
	});
	if(callbacks)
	{
		alertDialog.addEventListener("click", function(e){
			alertDialog.addEventListener("click", function(){});
			if(e.index >= 0 && e.index < btns.length)
			{
				callbacks[e.index]();
			}		
		});
	}	
	alertDialog.show();	
};

// prompt alert 
module.exports.PromptAlert2 = function(e)
{
	var title     = e.title;
	var message   = e.message;
	var btns      = e.btns || ["OK"];
	var callbacks = e.callbacks; 
	
	var alertDialog = Ti.UI.createAlertDialog({   
		buttonNames: btns, 
		message: message,		    	
		persistent: true,
		title: title
	});
	if(callbacks)
	{
		alertDialog.addEventListener("click", function(e){
			alertDialog.addEventListener("click", function(){});
			if(e.index >= 0 && e.index < btns.length)
			{
				callbacks[e.index]();
			}		
		});
	}	
	alertDialog.show();	
};

// load PDF
module.exports.LoadPDF = function(data)
{
	Alloy.Globals.Debug(JSON.stringify(data));
	var filePDF = null;
	var blob = Ti.Utils.base64decode(data)	;
				
	try		
	{						
	   	var instream = Ti.Stream.createStream({
	   		mode: Ti.Stream.MODE_READ,
	   		source: blob  		
	   	});
	   	// open an output stream for a file
	   	// to hold the blob data.
	   	filePDF = Titanium.Filesystem.getFile(Titanium.Filesystem.tempDirectory, "out.pdf");
	   	var outstream = filePDF.open(Titanium.Filesystem.MODE_WRITE);
	    // create a buffer for chunking the data.
	    var buffer = Ti.createBuffer({length: 1024});
	    // read and write chunks.
	    var read_bytes = 0;
	    while ((read_bytes = instream.read(buffer)) > 0) {
	    	outstream.write(buffer, 0, read_bytes);
	    }
	    // cleanup
	    instream.close();
	    outstream.close();
    	return filePDF;    	
   	}
   	catch(err)
   	{
   		Alloy.Globals.ErrorLog({type: Alloy.Globals.ErrorLog.PDF_LOAD_ERROR, desc: JSON.stringify(err)});
   		return null;
   	}	
};

// display PDF
module.exports.DisplayPDF = function(e)
{
	var data = e.data;
	var filePDF = Utils.LoadPDF(data);
	if(filePDF)
	{
		if(OS_IOS)
		{		
			Alloy.Globals.ControllerManager.AddView(Alloy.CFG.UI_VIEW_PDF, {filePDF: filePDF});
		}
		else
		{			
			try
			{
			   Ti.Android.currentActivity.startActivity(Ti.Android.createIntent({
			        action: Ti.Android.ACTION_VIEW,
			        type: 'application/pdf',
			        data: filePDF.nativePath
			    }));
			}
			catch(err)
			{
				Utils.PromptAlert({title: "Alert", message: Alloy.Globals.AlertMsg.NO_PDF_VIEWER});
				Alloy.Globals.ErrorLog({type: Alloy.Globals.ErrorLog.PDF_DISPLAY_ERROR, desc: JSON.stringify(err)});
				//ExceptionMgr.NoShow("MyCallup_CallupDetail:OpenPDF Error", eEx.message)
			 }
		}
	}	
};

// create ios keyboard toolbar
module.exports.CreateiOSKeyboardToolBar = function(textField)
{
	var done = Ti.UI.createButton({
		title: "Done",
		style: Ti.UI.iPhone.SystemButtonStyle.DONE,		
	});
		
	var fixedSpace = Ti.UI.createButton({
		width: "230dip",
		visible: false,
		touchEnabled: false		
	});
		
	var toolBar = Ti.UI.iOS.createToolbar({
		items: [fixedSpace, done],
		bottom: 0,
		borderTop: true,
		borderBottom: false,		
	});
		
	done.addEventListener("click", function(){
		textField.blur();
	});
		
	return toolBar;
};

// resolve the remote path of image for specific device
module.exports.GetImagePath = function(e)
{
	var image = e.image;
	var url   = e.url;
	if(Ti.Platform.Android)
	{
		switch(Ti.Platform.displayCaps.density)
		{
			case "xhigh": url = url + "android/xhdpi/"; break;
			case "high":  url = url + "android/hdpi/";  break;
			default:      url = url + "android/mdpi/";  break;
		}				
	}
	else
	{
		url = url + "iphone/";
		if(Ti.Platform.displayCaps.density == "high")
		{
			var pos = image.indexOf(".");
			image = image.substring(0, pos) + "@2x" + image.substring(pos, image.length);
		}		
	}
	url = url + image;
	return url;
};


// fetch and process maintenance notice
module.exports.FetchMaintenanceNotice = function()
{
	if(Titanium.Network.getNetworkTypeName() == "NONE")
		return;		
		
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('GET', Alloy.CFG.URL_MAINTENANCE_NOTICE);
	
	xhr.onerror = function(e)
	{	
		Alloy.Globals.Debug("On error");
		return;	
	};
	
	xhr.onload = function(e)
	{		
		Alloy.Globals.Debug("On load");	
		var responseXML = null;
		try
		{
			responseXML = xhr.responseXML;
			//var xmlString = "<html><head></head><body><maintenance><start-date>25/02/2014</start-date><start-time>04:00AM</start-time><end-date>25/02/2014</end-date><end-time>06:00PM</end-time><remarks>Regular maintenance</remarks></maintenance></body></html>"
			//responseXML = Ti.XML.parseString(xmlString)
			Alloy.Globals.Debug(xhr.responseText);
		}
		catch(err)
		{
			//ExceptionMgr.NoShow("CommonFunc:GetMaintenanceNotice Error", eEx.message)
			Alloy.Globals.ErrorLog({type: Alloy.Globals.ErrorLog.MAINTENANCE_PARSE_ERROR, desc: JSON.stringify(err)});
			return;
		}	
				
		if(responseXML == null) return;
		
		var responseText = xhr.responseText;
		//var responseText = xmlString
		
		
		//var savedResponse = Alloy.Globals.ResourceMgr.Load({title: Alloy.CFG.RESOURCE_MAINTENANCE_NOTICE});
		// if(savedResponse)
		// {
			// if(responseText == savedResponse.text) 
			// {
				// Alloy.Globals.Debug("data is same");
// 				
				// var obj         = savedResponse.obj;
				// var dteObjStart = Utils.ConvertFromMaintenanceDateToDate({date: obj.dteStart, time: obj.timeStart});
				// var dteObjEnd   = Utils.ConvertFromMaintenanceDateToDate({date: obj.dteEnd, time: obj.timeEnd});
				// var now         = new Date();
				// if((now > dteObjStart) && (now > dteObjEnd))
				// {
					// Alloy.Globals.Debug("Maintenance is over");
					// Alloy.CFG.FLAG_UNDER_MAINTENANCE = false;
					// return;
				// }
// 				
				// var timeStamp = new Date(savedResponse.timeStamp);				
				// if(Utils.IsDatesEqual({dateA: now, dateB: timeStamp}))
				// {
					// Alloy.Globals.Debug("Had already shown");
					// return;
				// }
// 								
				// var numDays = Utils.CalculateDaysBetweenDates({dateFrom: now, dateTo: dteObjStart});
				// Alloy.Globals.Debug("Num days = " + numDays);
				// if(numDays < 3)
				// {
					// Utils.PromptAlert({title: "Maintenance Notice", message: savedResponse.msg});	
					// if(numDays == 0) Alloy.CFG.FLAG_UNDER_MAINTENANCE = true;
// 									
				// }
				// savedResponse.timeStamp = new Date();
				// Alloy.Globals.ResourceMgr.Save({title: Alloy.CFG.RESOURCE_MAINTENANCE_NOTICE, data: savedResponse});				
				// return;
			// }
		// }
				
		try
		{
			var domResponse = responseXML; 		
			var dteStart    = domResponse.getElementsByTagName('start-date').item(0).textContent;
			var dteEnd      = domResponse.getElementsByTagName('end-date').item(0).textContent;
			var timeStart   = domResponse.getElementsByTagName('start-time').item(0).textContent;
			var timeEnd     = domResponse.getElementsByTagName('end-time').item(0).textContent;
			var remarks     = domResponse.getElementsByTagName('remarks').item(0).textContent;				
		}	
		catch(err)
		{
			//ExceptionMgr.NoShow("CommonFunc:GetMaintenanceNotice Error", eEx.message)
			Alloy.Globals.ErrorLog({type: Alloy.Globals.ErrorLog.MAINTENANCE_PARSE_ERROR, desc: JSON.stringify(err)});
			return;
		}		
		
		savedResponse = {
			text: responseText, 
			obj: {dteStart: dteStart, dteEnd: dteEnd, timeStart: timeStart, timeEnd: timeEnd, remarks: remarks}, 
			timeStamp: new Date(),
			msg: "" 
		};
		
		var now         = new Date();
		var dteObjStart = Utils.ConvertFromMaintenanceDateToDate({date: dteStart, time: timeStart});
		var dteObjEnd   = Utils.ConvertFromMaintenanceDateToDate({date: dteEnd, time: timeEnd});
						
		Alloy.Globals.Debug(dteObjStart.toString());
		Alloy.Globals.Debug(dteObjEnd.toString());
		Alloy.Globals.Debug(now.toString());
		
		var PromptMaintenanceMsg = function()
		{
			var msg = Alloy.Globals.AlertMsg.MAINTENANCE_NOTICE.replace("$dteStart", dteStart)
				.replace("$dteEnd", dteEnd)
				.replace("$timeStart", timeStart)
				.replace("$timeEnd", timeEnd)
				.replace("$remarks", remarks);
			Utils.PromptAlert({title: "Maintenance Notice", message: msg});
			savedResponse.msg = msg	;		
		};
			
		if((now > dteObjStart) && (now > dteObjEnd))
		{
			Alloy.Globals.Debug("Maintenance is over");
			Alloy.CFG.FLAG_UNDER_MAINTENANCE = false;
		}
		else if(now < dteObjEnd && now >= dteObjStart)
		{	
			Alloy.Globals.Debug("Inside Maintenance");
			Alloy.CFG.FLAG_UNDER_MAINTENANCE = true;
			PromptMaintenanceMsg();			
		}		
		else if(now < dteObjStart && now < dteObjEnd)
		{
			Alloy.Globals.Debug("Maintenance is coming");
			PromptMaintenanceMsg();
		} 				
		Alloy.Globals.ResourceMgr.Save({title: Alloy.CFG.RESOURCE_MAINTENANCE_NOTICE, data: savedResponse});
	};	
	xhr.send();	
};

// check maintenance notice
module.exports.CheckMaintenanceNotice = function()
{
	var msg = null;
	if(Alloy.CFG.FLAG_UNDER_MAINTENANCE == true)
	{
		//var savedResponse = Alloy.Globals.ResourceMgr.Load({title: Alloy.CFG.RESOURCE_MAINTENANCE_NOTICE});
		// if(savedResponse)
		// {
			// msg = savedResponse.msg;			
		// }
	}
	return msg;
};

// generatr array of number series
module.exports.GenNumSeriesArray = function(e)
{
	var from = parseInt(e.from);
	var to   = parseInt(e.to);
	var array = [];
	for(var i = from; i <= to; i++)
	{
		array.push(i.toString());
	}
	
	return array;
};

// get average speed
module.exports.GetAverageSpeed = function(e)
{
	var distKm      = e.distKm || 0;
	var durationSec = e.durationSec || 0;
	
	Alloy.Globals.Debug("distKm: " + distKm + "\ndurationSec: " + durationSec);
	var minutes = durationSec / 60;
	var hours = minutes / 60;
	Alloy.Globals.Debug("hours: " + hours);
	if(hours <= 0) 
		return 0;
	else 
		return distKm / hours;
};

// get calories mutiplier
module.exports.GetCaloriesMultiplier = function(e)
{
	var weight    = e.weight;
	var sportType = e.sportType;
	var arraySportTypes = Alloy.CFG.ARRAY_SPORT_TYPE;
	
	if(weight <= 0 || weight == null)
		weight = 65;// + Math.random() * 10; // Approximately
	var multiplier = 0;
	
	switch(sportType)
	{
		case arraySportTypes[0]: // Running
			multiplier = (9/3600) * weight;
		break;
		case arraySportTypes[1]: // Cycling
			multiplier = (4/3600) * weight;
		break;
		case arraySportTypes[2]: // Hiking
			multiplier = (7/3600) * weight;
		break;
		case arraySportTypes[3]: // Kayaking
			multiplier = (7/3600) * weight;
		break;
		case arraySportTypes[4]: // Kite Surfing
			multiplier = (5/3600) * weight;
		break;
		case arraySportTypes[5]: // Roller Skating
			multiplier = (5/3600) * weight;
		break;
		case arraySportTypes[6]: // Skate Boarding
			multiplier = (6/3600) * weight;
		break;
	}
	
	return multiplier;
};

// get calories burned
module.exports.GetCaloriesBurned = function(e)
{
	var sportType    = e.sportType;
	var weight       = e.weight;
	var durationSec  = e.durationSec;
	
	var caloriesMultiplier = Utils.GetCaloriesMultiplier({sportType: sportType, weight: weight});
	return durationSec * caloriesMultiplier;
};

// convert fro deg to radian
module.exports.DegToRad = function(deg)
{
	return deg * Math.PI / 180;	
};

// update profile from eIPPT, IPT, RT eligibility response
module.exports.UpdateProfileFromResponse = function(e)
{
	var response = e.response;
	var VOC = response.ipptVocGpCode;	
	var ORD = response.ordInd;
	var CAT = response.catSt;
	
	Alloy.Globals.Debug("VOC : " + VOC + " ORD : " + ORD + " CAT : " + CAT);
	if(VOC)
	{
		var type = null;
		switch(VOC)
		{
			case 'C': type = 0; break;
			case 'G': type = 1; break;
			case 'B': type = 2; break;
			case 'S': type = 3; break;
		}
		Alloy.Globals.ProfileManager.SetProfileByType({
			type: Alloy.Globals.ProfileManager.VOCATION, 
			value: Alloy.CFG.MYPROFILE_ARRAY_VOC[type]
		});
	}
	
	if(ORD)
	{
		var type = null;
		switch(ORD)
		{
			case 'A': type = 0; break;
			case 'B': type = 1; break;
		}
		Alloy.Globals.ProfileManager.SetProfileByType({
			type: Alloy.Globals.ProfileManager.ORD, 
			value: Alloy.CFG.MYPROFILE_ARRAY_ORD[type]
		});
	}
	
	if(CAT)
	{
		var type = null;
		switch(CAT)
		{
			case 'X':  type = 0; break;
			case 'Y':  type = 1; break;
			case 'Y1': type = 2; break;
			case 'Z':  type = 3; break;
			case 'Z1': type = 4; break;
			case 'Z2': type = 5; break;
			case 'Z3': type = 6; break;
		}
		Alloy.Globals.ProfileManager.SetProfileByType({
			type: Alloy.Globals.ProfileManager.AGE_CATEGORY, 
			value: Alloy.CFG.MYPROFILE_ARRAY_AGE_CAT[type]
		});
	}
	
	try
	{
		Alloy.Globals.ProfileManager.Save();
	}
	catch(e)
	{
		return;
	}	 
};
//===========================================================================	
// END OF EXPORTS
//===========================================================================