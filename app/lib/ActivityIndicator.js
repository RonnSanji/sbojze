
/*
 * Copyright: Activate Interactive
 * Date: March 01 2014
 * 
 * Title: ActivityIndicator.js
 * Description: Activity indicator 
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
module.exports = ActivityIndicator;
function ActivityIndicator(parentView)
{
	/*
	ActivityIndicator.self = Ti.UI.createView({
		width: "100%",
		height: "100%",
		//backgroundColor: "transparent",
		//backgroundColor: Alloy.CFG.COLOR_VIEW_BG,
		//opacity: 0.5,
		zIndex: 90,	
		visible: false			
	})	
	
	var indicator = Ti.UI.createImageView({
	    images: Alloy.CFG.IMG_ACTIVITY_INDICATOR,
	    duration: 180,
	    repeatCount: 0,	    
	    height: "100dip",
	    width: "104dip",
	    backgroundColor:'transparent',
	});
		
	ActivityIndicator.self.Start = function()
	{		
		ActivityIndicator.self.show()	
		indicator.start()	
	}
	ActivityIndicator.self.Stop = function()
	{
		ActivityIndicator.self.hide()
		indicator.stop()
	}
	
	ActivityIndicator.self.add(indicator)
	parentView.add(ActivityIndicator.self)	
	*/
}
//===========================================================================
// END OF MODULE DECLARACTION
//===========================================================================


//===========================================================================	
// PROPERTIES
//===========================================================================
var indicatorCounter  = 0;
var activityIndicator = null;
//===========================================================================	
// END OF PROPERTIES
//===========================================================================


//===========================================================================	
// FUNCTIONS
//===========================================================================

//===========================================================================	
// END OF FUNCTIONS
//===========================================================================


//===========================================================================	
// EXPORTS
//===========================================================================
//module.exports.self = null

/*
// initialise
module.exports.Init = function(parentView)
{
	if(ActivityIndicator.self == null)
	{
		new ActivityIndicator(parentView)
	}	
}
*/
// initialise
module.exports.Init = function(parentView)
{
	activityIndicator = Ti.UI.createView({
		width: "100%",
		height: "100%",
		zIndex: 90,	
		visible: false			
	});
	
	var indicator = Ti.UI.createImageView({
		images: Alloy.CFG.IMG_ACTIVITY_INDICATOR,
	    duration: 180,
	    repeatCount: 0,	    
	    height: "100dip",
	    width: "104dip",
	    backgroundColor:'transparent',
	});
		
	activityIndicator.Start = function()
	{		
		Alloy.Globals.Debug(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Activity Show");
		activityIndicator.show();	
		indicator.start();	
	};
	
	activityIndicator.Stop = function()
	{
		Alloy.Globals.Debug(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Activity Hide");
		activityIndicator.hide();
		indicator.stop();
	};
	
	activityIndicator.add(indicator);
	parentView.add(activityIndicator);
};

// show indicator
module.exports.Show = function(e)
{
	var args = e || {};
	var note = args.note;
	if(activityIndicator)
	{
		Alloy.Globals.Debug(">>>>>[Activity indicator " + indicatorCounter + " " + note + " show!!!]");
		indicatorCounter = indicatorCounter + 1;
		//Alloy.Globals.Debug("Indicator counter = " + indicatorCounter);
		activityIndicator.Start();
	}
};

// hide indicator
module.exports.Hide = function(e)
{
	var args      = e || {};
	var forceStop = args.forceStop;
	var note      = args.note;
	if(activityIndicator)
	{			
		indicatorCounter = indicatorCounter - 1;
		//Alloy.Globals.Debug("Indicator counter = " + indicatorCounter);
		Alloy.Globals.Debug(">>>>>[Activity indicator " + indicatorCounter + " " + note + " hide!!!]");
		
		if(indicatorCounter <= 0 || forceStop)
		{
			indicatorCounter = 0;
			activityIndicator.Stop();
		}
	}
};

// get status
module.exports.IsRunning = function()
{
	if(indicatorCounter <= 0)
		return false;
	else
		return true;
};
//===========================================================================	
// END OF EXPORTS
//===========================================================================