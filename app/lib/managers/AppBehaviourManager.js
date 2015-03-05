
/*
 * Copyright: Activate Interactive
 * Date: March 01 2014
 * 
 * Title: AppBehaviourManager.js
 * Description: Manages native app behaviour
 * 
 * ChangeLog: 
 * 
 * 
  * Notes:
 * iOS
 * 	- home to background (pausing, paused)
 *  - resume from background (resuming, resumed)
 * 
 * 	- swipe out notification/control panel (pausing)
 *  - close notification/control panel (resumed)
 * 
 * Functions:
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
function AppBehaviourManager(){}
module.exports = AppBehaviourManager;
//===========================================================================
// END OF MODULE DECLARACTION
//===========================================================================	


//===========================================================================
// EXPORTS
//===========================================================================
// initialise
module.exports.Init = function(win)
{
	if(win)
	{
		if(OS_IOS)
		{
			var OnWinOpen = function()
			{
				win.removeEventListener("open", OnWinOpen);
				Alloy.Globals.Debug("[App is opened]");
				Ti.fireEvent("appOpened");
			};
			win.addEventListener("open", OnWinOpen);
			
			Ti.App.addEventListener("pause", function(){
				Alloy.Globals.Debug("[App is pausing]");
				Ti.fireEvent("appPausing");
			});
			Ti.App.addEventListener("paused", function(){
				Alloy.Globals.Debug("[App is paused]");
				Ti.fireEvent("appPaused");
			});
			Ti.App.addEventListener("resume", function(){
				Alloy.Globals.Debug("[App is resuming]");
				Ti.fireEvent("appResuming");
			});
			Ti.App.addEventListener("resumed", function(){
				Alloy.Globals.Debug("[App is resumed]");
				Ti.fireEvent("appResumed");
			});
		}		
		else
		{
			win.addEventListener("open", function(){
				Alloy.Globals.Debug("[App is opened]");
				Ti.fireEvent("appOpened");
				if(!win.activityListenerLoaded)
				{					
					var activity = win.activity;
					
					activity.addEventListener("pause", function(){
						Alloy.Globals.Debug("[App is paused]");
						Ti.fireEvent("appPaused");
					});
					activity.addEventListener("resume", function(){
						Alloy.Globals.Debug("[App is resumed]");
						Ti.fireEvent("appResumed");
					});
					
					activity.addEventListener("start", function(){
						Alloy.Globals.Debug("[App is started]");
						Ti.fireEvent("appStarted");
					});
					activity.addEventListener("stop", function(){
						Alloy.Globals.Debug("[App is stopped]");
						Ti.fireEvent("appStopped");
					});			
				}
				win.activityListenerLoaded = true;				
			});
			
			win.addEventListener("close", function(){
				Alloy.Globals.Debug("[App is closed]");
				Ti.fireEvent("appClosed");
			});
			
			Ti.Android.currentActivity.addEventListener("start", function(){
				Alloy.Globals.Debug("[Activity is started]");
				Ti.fireEvent("activityStarted");
			});
			Ti.Android.currentActivity.addEventListener("stop", function(){
				Alloy.Globals.Debug("[Activity is stopped]");
				Ti.fireEvent("activityStopped");
			});
		}
	}	
};

// register listener
module.exports.RegisterListener = function(e)
{
	var type     = e.type;
	var callback = e.callback;
	
	switch(type)
	{
		case Alloy.CFG.APP_OPEN:
		{
			Ti.addEventListener("appOpened", callback);
			break;
		}
		case Alloy.CFG.APP_CLOSE:
		{
			Ti.addEventListener("appClosed", callback);
			break;
		}	
		case Alloy.CFG.APP_PAUSE:
		{
			Ti.addEventListener("appPausing", callback);
			break;
		}	
		case Alloy.CFG.APP_PAUSED:
		{
			Ti.addEventListener("appPaused", callback);
			break;
		}		
		case Alloy.CFG.APP_RESUMED:
		{
			Ti.addEventListener("appResumed", callback);
			break;
		}	
		case Alloy.CFG.ACTIVITY_START:
		{
			Ti.addEventListener("activityStarted", callback);
			break;
		}	
		case Alloy.CFG.ACTIVITY_STOP:
		{
			Ti.addEventListener("activityStopped", callback);
			break;
		}			
	}
};

// unregister listener
module.exports.UnRegisterListener = function(e)
{
	var type     = e.type;
	var callback = e.callback;
	
	switch(type)
	{
		case Alloy.CFG.APP_OPEN:
		{
			Alloy.Globals.Debug("Add listener");
			Ti.removeEventListener("appOpened", callback);
			break;
		}
		case Alloy.CFG.APP_CLOSE:
		{
			Ti.removeEventListener("appClosed", callback);
			break;
		}	
		case Alloy.CFG.APP_PAUSE:
		{
			Ti.removeEventListener("appPausing", callback);
			break;
		}	
		case Alloy.CFG.APP_PAUSED:
		{
			Ti.removeEventListener("appPaused", callback);
			break;
		}		
		case Alloy.CFG.APP_RESUMED:
		{
			Ti.removeEventListener("appResumed", callback);
			break;
		}	
		case Alloy.CFG.ACTIVITY_START:
		{
			Ti.removeEventListener("activityStarted", callback);
			break;
		}	
		case Alloy.CFG.ACTIVITY_STOP:
		{
			Ti.removeEventListener("activityStopped", callback);
			break;
		}					
	}
};
//===========================================================================
// END OF EXPORTS
//===========================================================================