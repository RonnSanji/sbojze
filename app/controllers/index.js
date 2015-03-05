
/*
 * Copyright: Activate Interactive
 * Date: April 16 2014
 * 
 * Title: index.js
 * Description: 
 * 
 * ChangeLog: 
 *  
 * 
 */

//===========================================================================
// PROPERTIES
//===========================================================================	
Alloy.CFG.REF_WIN             = $.index;
Alloy.CFG.REF_VIEW_BASE       = $.viewBase;
Alloy.CFG.REF_VIEW_MENU       = $.viewMenu;
Alloy.CFG.REF_NAVIGATION_BAR  = $.navigationBar;
//===========================================================================
// END OF PROPERTIES
//===========================================================================	


//===========================================================================
// HANDLERS
//===========================================================================	
// handler for android back button
var OnAndroidBack = function(e)
{	
	Alloy.Globals.Debug("NavigationBar isRunning = " + $.navigationBar.isRunning);
	if($.navigationBar.isRunning || Alloy.Globals.ActivityIndicator.IsRunning()) return;
	
	if($.navigationBar.getView("btnBack").visible == true)
		$.navigationBar.getView("btnBack").fireEvent("click");
	else if($.navigationBar.getView("btnMenu").visible == true)
	{
		Alloy.Globals.Debug("Base rect pos = " + $.viewBase.rect.x);
		if($.viewBase.rect.x == 0)
		{
			$.navigationBar.getView("btnMenu").fireEvent("click");
		}
		else if($.viewBase.rect.x == 260)
		{
			var IsYes = function(e)
			{			
				Clean();	
				$.index.close();
			};			
			var IsNo = function(e)
			{
				// do nothing
			};
			
			Alloy.Globals.Utils.PromptAlert({
				title: "Exit program", 
				message: Alloy.Globals.AlertMsg.EXIT_PROGRAM_CONFIRMATION,
				btns: ["Yes", "No"], 
				callbacks:[IsYes, IsNo]
			});
		}
	}	
};

// on navigation menu open
var OnNavMenuOpen = function(e)
{
	$.getView("viewProtectorPage").visible = true;
};

// on navigation menu close
var OnNavMenuClose = function(e)
{
	$.getView("viewProtectorPage").visible = false;
};

// on fetch maintenance notice
var OnFetchMaintenanceNotice = function()
{	
	Alloy.Globals.Utils.FetchMaintenanceNotice();
};

// ** on set flurry analytic  Can Remove RW
// var OnSetFlurryAnalytic = function()
// {
	// if(OS_ANDROID)
	// {
		// // init flurry after activity stop due to window parameter model not defined (Google Map V2)
		// setTimeout(function(){
			// Alloy.Globals.FlurryAnalytics.Init();
		// }, 1000);
	// }
	// else
	// {
		// Alloy.Globals.FlurryAnalytics.Init();
	// }	
// };
//===========================================================================
// END OF HANDLERS
//===========================================================================	


//===========================================================================
// FUNCTIONS
//===========================================================================	
// initialise
var Init = function()
{
	// if(OS_ANDROID)
	// {
		// var musicPlayer = require('managers/android/MusicPlayerManager');
		// musicPlayer.instance();
		// musicPlayer.registerMusicPlayer();
	// }   RW can removed 
	
	// configuartion for distribution build
	if(Alloy.CFG.APPLICATION_BUILD == Alloy.CFG.BUILD.DISTRIBUTION)
	{
		Alloy.CFG.SERVER_TYPE = Alloy.CFG.SERVER.PRODUCTION;
	}
	
	// set default state
	/*
	if(Alloy.Globals.ResourceMgr.Load({title: Alloy.CFG.RESOURCE_PROFILE_OVERSEAS_NOTIFICATION}) == null)
		Alloy.Globals.ResourceMgr.Save({title: Alloy.CFG.RESOURCE_PROFILE_OVERSEAS_NOTIFICATION, data: true});
	if(Alloy.Globals.ResourceMgr.Load({title: Alloy.CFG.RESOURCE_PROFILE_AUTO_SYNC_CALENDAR}) == null)
		Alloy.Globals.ResourceMgr.Save({title: Alloy.CFG.RESOURCE_PROFILE_AUTO_SYNC_CALENDAR, data: false});
	*/
	
	// initialise 
	//Alloy.Globals.ProfileManager.Init();
	//Alloy.Globals.AppBehaviourManager.Init(Alloy.CFG.REF_WIN);
	Alloy.Globals.ActivityIndicator.Init(Alloy.CFG.REF_WIN);
	Alloy.Globals.ControllerManager.Init(Alloy.CFG.REF_VIEW_BASE, Alloy.createController("menu/viewSplash"));
	//Alloy.Globals.LoginManager.Init();
	
	//Enable push notification uncomment below
	//RegisterPushNotification();
		
	// register listeners
	Alloy.CFG.REF_NAVIGATION_BAR.RegisterListener({type: Alloy.CFG.NAVBAR_MENU_OPEN, callback: OnNavMenuOpen});
	Alloy.CFG.REF_NAVIGATION_BAR.RegisterListener({type: Alloy.CFG.NAVBAR_MENU_CLOSE, callback: OnNavMenuClose});
	//Alloy.Globals.AppBehaviourManager.RegisterListener({type: Alloy.CFG.APP_OPEN, callback: OnFetchMaintenanceNotice});
	//Alloy.Globals.AppBehaviourManager.RegisterListener({type: Alloy.CFG.APP_RESUMED, callback: OnFetchMaintenanceNotice});
	
	
	
	//if(OS_IOS) 
		//Alloy.Globals.AppBehaviourManager.RegisterListener({type: Alloy.CFG.APP_OPEN, callback: OnSetFlurryAnalytic});
	//else
		//Alloy.Globals.AppBehaviourManager.RegisterListener({type: Alloy.CFG.ACTIVITY_STOP, callback: OnSetFlurryAnalytic});
	
	// check if app is first installed and show disclaimer
	if(Ti.App.Properties.getBool(Alloy.CFG.RESOURCE_FLAG_APP_INSTALLED, false) == false)
	{
		Alloy.Globals.Utils.PromptAlert({title: "Disclaimer", message: Alloy.Globals.AlertMsg.APP_DISCLAIMER});
		Ti.App.Properties.setBool(Alloy.CFG.RESOURCE_FLAG_APP_INSTALLED, true);
	}
	
	// slide menu after delay
	setTimeout(AutoSlideAtLaunch, 100);	
};

// slide open menu when launch
var AutoSlideAtLaunch = function()
{
	if(Alloy.CFG.REF_VIEW_BASE.rect.x == 0 && !Alloy.CFG.FLAG_MENU_TOUCHED)
		$.navigationBar.getView("btnMenu").fireEvent("click");
};

// clean up
var Clean = function()
{
	Alloy.Globals.Debug("Clean up all the mess");
	//Alloy.Globals.FlurryAnalytics.Clean();
	Alloy.Globals.ControllerManager.Clean();
	//Alloy.Globals.WorkoutTrackerManager.Clean();
	Alloy.CFG.REF_NAVIGATION_BAR.UnRegisterListener({type: Alloy.CFG.NAVBAR_MENU_OPEN, callback: OnNavMenuOpen});
	Alloy.CFG.REF_NAVIGATION_BAR.UnRegisterListener({type: Alloy.CFG.NAVBAR_MENU_CLOSE, callback: OnNavMenuClose});
	
	//Alloy.Globals.AppBehaviourManager.UnRegisterListener({type: Alloy.CFG.APP_OPEN, callback: OnFetchMaintenanceNotice});
	//Alloy.Globals.AppBehaviourManager.UnRegisterListener({type: Alloy.CFG.APP_RESUMED, callback: OnFetchMaintenanceNotice});
	
	//if(OS_IOS)
		//Alloy.Globals.AppBehaviourManager.UnRegisterListener({type: Alloy.CFG.APP_OPEN, callback: OnSetFlurryAnalytic});
	//else
		//Alloy.Globals.AppBehaviourManager.UnRegisterListener({type: Alloy.CFG.ACTIVITY_STOP, callback: OnSetFlurryAnalytic});
	/*
	if(OS_ANDROID)
	{
		var musicPlayerMgr = require('managers/android/MusicPlayerManager');
		musicPlayerMgr.stop();
		Alloy.Globals.ResourceMgr.Delete({title: Alloy.CFG.RESOURCE_WORKOUT_TIMER});
	}
	
	var workoutTimer = require("WorkoutTimer");
	workoutTimer.Stop();
	*/
};

// set protector screen on win
var SetViewProtector = function(state)
{
	$.getView("viewProtectorWin").visible = state;
};

// register push notification
var RegisterPushNotification = function()
{
	if(OS_ANDROID)
	{
	
		var gcm = require('net.iamyellow.gcmjs');
			var pendingData = gcm.data;
			if (pendingData && pendingData !== null) {
				// if we're here is because user has clicked on the notification
				// and we set extras for the intent 
				// and the app WAS NOT running
				// (don't worry, we'll see more of this later)
				Ti.API.info('******* data (started) ' + JSON.stringify(pendingData));
			}
			
			gcm.registerForPushNotifications({
				success: function (ev) {
					// on successful registration
					Ti.API.info('******* success, ' + ev.deviceToken);				
					// // send request to gateway once token is retrieved
					Ti.App.deviceToken =ev.deviceToken;
				},
				error: function (ev) {
					// when an error occurs
					Ti.API.info('******* error, ' + ev.error);
				},
				callback: function (ev) {
					// when a gcm notification is received WHEN the app IS IN FOREGROUND

					alert(JSON.stringify(ev));
					
					
				},
				unregister: function (ev) {
					// on unregister 
					Ti.API.info('******* unregister, ' + ev.deviceToken);
				},
				data: function (data) {
					// if we're here is because user has clicked on the notification
					// and we set extras in the intent 
					// and the app WAS RUNNING (=> RESUMED)
					// (again don't worry, we'll see more of this later)
					Ti.API.info('******* data (resumed) ' + JSON.stringify(data));
				}
			});
	}	
	else
	{
		 // Check if the device is running iOS 8 or later
			if(parseInt(Ti.Platform.version.split(".")[0]) >= 8)
			{
				 function registerForPush() {
	        		Ti.Network.registerForPushNotifications({
	            		success: deviceTokenSuccess,
	            		error: deviceTokenError,
	            		callback: receivePush
	        });
	        // Remove event listener once registered for push notifications
	        Ti.App.iOS.removeEventListener('usernotificationsettings', registerForPush); 
	    	};
	 
		// Wait for user settings to be registered before registering for push notifications
	    	Ti.App.iOS.addEventListener('usernotificationsettings', registerForPush);
	 
	    // Register notification types to use
	    	Ti.App.iOS.registerUserNotificationSettings({
		    types: [
	            Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT,
	            Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND,
	            Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE
	        ]
	    	});
	
			}
			else
			{
				// For iOS 7 and earlier
				Ti.Network.registerForPushNotifications({
		        // Specifies which notifications to receive
		        types: [
		            Ti.Network.NOTIFICATION_TYPE_BADGE,
		            Ti.Network.NOTIFICATION_TYPE_ALERT,
		            Ti.Network.NOTIFICATION_TYPE_SOUND
		        ],
		        success: deviceTokenSuccess,
		        error: deviceTokenError,
		        callback: receivePush
		   		 });
			}
      }
};

function receivePush(e) {
   // alert('Received push: ' + JSON.stringify(e));
};
// Save the device token for subsequent API calls
function deviceTokenSuccess(e) {

    Ti.App.deviceToken = e.deviceToken;
};

function deviceTokenError(e) {
    alert('Failed to register for push notifications! ' + e.error);
};
//===========================================================================
// END OF FUNCTIONS
//===========================================================================	


//===========================================================================
// LOGICS
//===========================================================================	
$.index.open();
$.index.SetViewProtector = SetViewProtector;
Init();
//===========================================================================
// END OF LOGICS
//===========================================================================	


//===========================================================================
// UNDER CONSTRUCTION
//===========================================================================	
// extra behavoiour, under construction
var isTouchMoved = false;
var isSwiped = false;
var isEnded = true;
var curX = null;
var OnTouchMove = function(e)
{
	/*
	if(curX != null)
	{
		var point = Alloy.CFG.REF_VIEW_BASE.convertPointToView({x: e.x, y: e.y}, $.index)
		var delta = (point.x - curX)
	    Alloy.Globals.Debug(delta)
	    if(delta >= 0 && delta <= Alloy.CFG.BASEVIEW_ANINMATE_FINAL_POS)
	    {
	    	Alloy.CFG.REF_VIEW_BASE.left = delta
	    	isTouchMoved = true
	    }
	    	
	}
	*/
};
var OnTouchStart = function(e)
{	
	/*
	isEnded = false
	setTimeout(function(){
		if(isEnded == false && isSwiped == false)
			curX = e.x
	}, 100)
	*/
};
var OnTouchEnd = function(e)
{
	/*
	isEnded = true
	isSwiped = false
	curX = null
	if(isTouchMoved == true)
	{
		var anim = Ti.UI.createAnimation();
		var point = Alloy.CFG.REF_VIEW_BASE.convertPointToView({x: e.x, y: e.y}, $.index)
		if(point.x > 150)
		{
			anim.left = Alloy.CFG.BASEVIEW_ANINMATE_FINAL_POS
		}
		else
		{
			anim.left = 0
		}
		anim.duration = Alloy.CFG.BASEVIEW_ANINMATE_SPEED;
		Alloy.CFG.REF_VIEW_BASE.animate(anim);	
		isTouchMoved = false
	}
	*/
};
var OnSwipe = function(e)
{
	/*
	if($.navigationBar.getView("btnMenu").visible == true)
	{
		if(isEnded == false) return
		isSwiped = true
		//e.cancelBubble = true
		if(e.direction == "right")
		{
			if(Alloy.CFG.REF_VIEW_BASE.rect.x == 0)
			{
				$.navigationBar.getView("btnMenu").fireEvent("click")
			}
		}
		else if(e.direction == "left")
		{
			if(Alloy.CFG.REF_VIEW_BASE.rect.x > 0)
			{
				$.navigationBar.getView("btnMenu").fireEvent("click")
			}
		}			
	}	
	*/
};
//===========================================================================
// END OF UNDER CONSTRUCTION
//===========================================================================

