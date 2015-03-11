
/*
 * Copyright: Activate Interactive
 * Date: March 01 2014
 * 
 * Title: ControllerManager.js
 * Description: Manages flow of controllers  
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
function ControllerManager(){}
module.exports = ControllerManager;
module.exports.baseView          = null;
module.exports.defaultController = null;
module.exports.prevController    = null;
module.exports.currController    = null;
module.exports.arrayControllers  = [];
module.exports.isRunning         = false;
//add by me

module.exports.baseNavigator     = null;
module.exports.baseContent       = null;
module.exports.defaultNavigator  = null;
module.exports.prevNavigator     = null;
module.exports.currNavigator     = null;
module.exports.arrayNavigators   = [];

//===========================================================================
// END OF MODULE DECLARACTION
//===========================================================================


//===========================================================================
// HANDLERS
//===========================================================================	
// this is to make sure nothing is trigger during animation
var OnNavBaseAnimateEnd = function(e)
{
	Alloy.CFG.REF_WIN.SetViewProtector(false);
	ControllerManager.isRunning = false;
	Alloy.Globals.Debug("Controller isRunning = " + ControllerManager.isRunning);
};
//===========================================================================
// END OF HANDLERS
//===========================================================================	


//===========================================================================
// EXPORTS
//===========================================================================	
// initialise
module.exports.Init = function(baseView, baseNavigator, baseContent, controller, navigatorController)
{	
	ControllerManager.baseView  = baseView;
	ControllerManager.baseNavigator = baseNavigator;
	ControllerManager.baseContent = baseContent;
	ControllerManager.defaultController = controller;
	ControllerManager.currController = controller;
	ControllerManager.defaultNavigator  = navigatorController;
	ControllerManager.currNavigator     = navigatorController;
	
	// add default view to parent
	ControllerManager.baseContent.add(ControllerManager.defaultController.getView());
	ControllerManager.baseNavigator.add(ControllerManager.defaultNavigator.getView());
	
	// register listener
	// Alloy.CFG.REF_NAVIGATION_BAR.RegisterListener({type: Alloy.CFG.NAVBAR_BASE_ANIMATE_END, callback: OnNavBaseAnimateEnd});
};

// switch view
module.exports.SwitchView = function(e)
{
	var viewPath  = e.path;
	var navPath = e.navPath;
	var viewTitle = e.title;
	var viewID    = e.id;

	var nextController = null;
   	var nextView       = null;  	
   	var nextNavigator  = null;
   	var nextNavView    = null;
   	
   	Alloy.CFG.REF_WIN.SetViewProtector(true);
   	Ti.API.info("******path: ",viewPath);
   	Ti.API.info("******title: ",viewTitle);
	Ti.API.info("******id: ",viewID);
   	
   	if(viewID != ControllerManager.currController.getView().id)
	{
	Ti.API.info("******controller id: ",ControllerManager.currController.getView().id);	
		// use default if error creating controller
	   	try
	   	{
	   		nextController = Alloy.createController(viewPath);
	   		nextNavigator = Alloy.createController(navPath);
	   		Ti.API.info("******new ncontroller id: ",nextController.getView().id);
	   		nextView = nextController.getView();
	   		nextNavView = nextNavigator.getView();
	   	}
	   	catch(err)
	   	{
	   		nextController =  ControllerManager.defaultController;
	   		nextView = nextController.getView();
	   		nextNavigator = ControllerManager.defaultNavigator;
	   		nextNavView = nextNavigator.getView();
	   	}
	   	
	   	// Alloy.CFG.REF_NAVIGATION_BAR.HideAllBtns(true);
	   	   		
		if(nextController && nextNavigator)
		{
			ControllerManager.baseContent.add(nextView);
			ControllerManager.baseNavigator.add(nextNavView);

			if(ControllerManager.currController != null) 
			{
				ControllerManager.baseContent.remove(ControllerManager.currController.getView());	
				if(ControllerManager.currController.OnExit && ControllerManager.currController.hasEntered) 
				{
					ControllerManager.currController.OnExit();
				}
				if(ControllerManager.currController.OnDestroy){
					ControllerManager.currController.OnDestroy();
				}
				ControllerManager.currController.destroy();
				ControllerManager.currController = null;
			}				
			ControllerManager.prevController = ControllerManager.currController;
			ControllerManager.currController = nextController;	
			ControllerManager.prevNavigator  = ControllerManager.currNavigator;
			ControllerManager.currNavigator	 = nextNavigator;
		} 	
	}   	   	
		
	// animate view	
	if(Alloy.CFG.REF_VIEW_BASE.rect.x > 0){
		Ti.App.fireEvent('showMenu',{});
		// Alloy.CFG.REF_WIN.SetViewProtector(false);
	}
		// Alloy.CFG.REF_NAVIGATION_BAR.getView("btnMenu").fireEvent("click");
	else
	{
		Alloy.CFG.REF_WIN.SetViewProtector(false);
		ControllerManager.isRunning = false;
	}
};


// refresh view
module.exports.RefreshView = function(extraParams)
{
	var currPath = ControllerManager.currController.__controllerPath;
	var viewPath = Alloy.CFG.PATH_DUMMY;
	var nextController = null;
   	var flagIsLogin    = false;
   	
   	// clear any activity indicator
   	//Alloy.Globals.ActivityIndicator.Hide({forceStop: true, note: "ControllerManager RefreshView force stop"})
   	
   	// refresh if has login status
   	if(ControllerManager.currController.LOGIN_TYPE != null)
	{
		// create new controller (a dummy controller)
		nextController = Alloy.createController(viewPath);
				
		if(nextController.OnEnter) nextController.OnEnter();	
		ControllerManager.baseContent.add(nextController.getView());
		ControllerManager.baseContent.remove(ControllerManager.currController.getView());
		
		// destroy current controller
		if(ControllerManager.currController.OnExit) ControllerManager.currController.OnExit();
		if(ControllerManager.currController.OnDestroy) ControllerManager.currController.OnDestroy();
		ControllerManager.currController.destroy();
		
		// recreate current controller
		ControllerManager.currController = Alloy.createController(currPath);
		
		var OnIsLoginReturn = function(e)
		{
			// add the current controller
			ControllerManager.baseContent.add(ControllerManager.currController.getView());
			flagIsLogin = e;
			if(flagIsLogin && ControllerManager.currController.OnEnter)
			{
				ControllerManager.currController.OnEnter();	
				if(ControllerManager.currController.OnFirstLoad) ControllerManager.currController.OnFirstLoad(extraParams);
				ControllerManager.currController.hasEntered = true;  
			}
			
			// remove the dummy controller
			ControllerManager.baseContent.remove(nextController.getView());
			if(nextController.OnExit) nextController.OnExit();	
			if(nextController.OnDestroy) nextController.OnDestroy();	
			nextController.destroy();
		};
		Alloy.CFG.REF_NAVIGATION_BAR.HideAllBtns(true);
		//Alloy.Globals.LoginManager.IsLogin({controllerView: ControllerManager.currController, callback: OnIsLoginReturn});		
	}			
};

// add view
module.exports.AddView = function(viewPath, navPath, params)
{
	// return if controller is running
	if(ControllerManager.isRunning == true) return;
	
	var flagOnEnter = false; // for loading of loginView
	// create next controller
	var nextController = Alloy.createController(viewPath, params);
	var nextNavigator = Alloy.createController(navPath);
	
	// add protector
	Alloy.CFG.REF_WIN.SetViewProtector(true);
	ControllerManager.isRunning = true;
	
	// exit current controller
	// Alloy.CFG.REF_NAVIGATION_BAR.HideAllBtns();
	if(ControllerManager.currController.OnExit) {
		ControllerManager.currController.OnExit();
	}
	
	var baseView = ControllerManager.baseView;
	var nextView = nextController.getView();
	var nextNavView = nextNavigator.getView();
	baseView.left = "99%";	
	
	ControllerManager.currNavigator.getView().add(nextNavView);
	ControllerManager.arrayNavigators.push(ControllerManager.prevNavigator);
	ControllerManager.prevNavigator = ControllerManager.currNavigator;
	ControllerManager.currNavigator = nextNavigator;
	
	ControllerManager.currController.getView().add(nextView);
	ControllerManager.arrayControllers.push(ControllerManager.prevController);
	ControllerManager.prevController = ControllerManager.currController;
	ControllerManager.currController = nextController;	
	
	//add by me
	var animation = Titanium.UI.createAnimation();
	animation.left = 0;
	animation.opacity = 1;
    animation.duration = Alloy.CFG.BASEVIEW_ANINMATE_SPEED;
    
    var AnimComplete = function()
	{
		animation.removeEventListener("complete", AnimComplete);
		if(nextController.OnEnter && flagOnEnter == true) 
		{
			nextController.OnEnter();	
			if(nextController.OnFirstLoad) nextController.OnFirstLoad();
			nextController.hasEntered = true;  
		}	
		// clear protector
		Alloy.CFG.REF_WIN.SetViewProtector(false);	
		ControllerManager.isRunning = false;
	};
	animation.addEventListener("complete", AnimComplete);
    
	baseView.animate(animation);
};

// remove view
module.exports.RemoveView = function()
{
	// get current view
	var baseView = ControllerManager.baseView;
	var currView = ControllerManager.currController.getView();	
	var currNavView = ControllerManager.currNavigator.getView();	
	
	// workaround to fix some stupid issue	
	if(ControllerManager.currController.OnExitWorkaround)
	{
		ControllerManager.currController.OnExitWorkaround();
	}
	
	Alloy.CFG.REF_WIN.SetViewProtector(true);
	
	// Alloy.CFG.REF_NAVIGATION_BAR.HideAllBtns();
	// exit current controller
	if(ControllerManager.currController.OnExit && ControllerManager.currController.hasEntered)
	{
		ControllerManager.currController.OnExit();
	}
	
	var animation = Titanium.UI.createAnimation();
	animation.left = "99%";
	
	var OnComplete = function(e)
	{		
		animation.removeEventListener('complete',OnComplete);
		if(ControllerManager.currController.OnDestroy) {
			ControllerManager.currController.OnDestroy();
		}
		ControllerManager.prevController.getView().remove(currView);
		ControllerManager.currController.destroy();
		ControllerManager.currController = null;
		
		var prevController = ControllerManager.prevController;
		
		ControllerManager.currController = ControllerManager.prevController;
		ControllerManager.prevController = ControllerManager.arrayControllers.pop();
		
		if(prevController.OnEnter) {
			prevController.OnEnter();
		}
		
		ControllerManager.prevNavigator.getView().remove(currNavView);
		ControllerManager.currNavigator.destroy();
		ControllerManager.currNavigator = null;
		ControllerManager.currNavigator = ControllerManager.prevNavigator;
		ControllerManager.prevNavigator = ControllerManager.arrayNavigators.pop();
		
		// exit current view	
		
		Alloy.CFG.REF_WIN.SetViewProtector(false);		
	};
	
	animation.addEventListener("complete",OnComplete);
	currView.animate(animation);
};

// return to main
module.exports.ReturnToMainView = function(e)
{
	var args = e || {};
	var toRefresh = args.toRefresh || false;
	var extraParams = args.extraParams;
	
	var length = ControllerManager.arrayControllers.length;	
	// if previous controller exist
	if(length > 0)
	{
		// exit and destroy current controller
		if(ControllerManager.currController.OnExit) ControllerManager.currController.OnExit();
		if(ControllerManager.currController.OnDestroy) ControllerManager.currController.OnDestroy();
				
		if(length > 1)
		{
			// hide previous view
			ControllerManager.prevController.getView().visible = false;		
				
		}
		ControllerManager.prevController.getView().remove(ControllerManager.currController.getView());
		ControllerManager.currController.destroy();	
			
		for(var i = (length - 1); i >= 1; i--)
		{
			if(ControllerManager.prevController.OnDestroy) ControllerManager.prevController.OnDestroy();
			
			// hide previous view
			if(i > 1)
				ControllerManager.arrayControllers[i].getView().visible = false;
				
			ControllerManager.arrayControllers[i].getView().remove(ControllerManager.prevController.getView());
			ControllerManager.prevController.destroy();		
			ControllerManager.prevController = ControllerManager.arrayControllers[i];		
		}		
		
		Alloy.CFG.REF_NAVIGATION_BAR.HideAllBtns();
		
		// enter main controller	
		ControllerManager.currController = ControllerManager.prevController;
		if(ControllerManager.currController.OnEnter) ControllerManager.currController.OnEnter(extraParams);
		ControllerManager.prevController = null;
		
		// clear the array
		ControllerManager.arrayControllers.length = 0;	
	}	
	
	// refresh view
	if(toRefresh) 
	{
		//Alloy.Globals.LoginManager.CheckElapsedTime({expiryTime: 5})
		ControllerManager.RefreshView(extraParams);
	}
};

// get current controller
module.exports.GetCurrentController = function()
{
	return ControllerManager.currController;
};

// enter controller after login
module.exports.EnterController = function(controller)
{
	if(controller.OnEnter)
	{
		controller.OnEnter();
		if(controller.OnFirstLoad) controller.OnFirstLoad();
		controller.hasEntered = true;
	}	
};

// clean up
module.exports.Clean = function()
{
	// destroy any existing controller
	if(ControllerManager.currController != null)
	{
		if(ControllerManager.currController.OnExit) ControllerManager.currController.OnExit();
		if(ControllerManager.currController.OnDestroy) ControllerManager.currController.OnDestroy();
	}
	
	// unregister listener
	Alloy.CFG.REF_NAVIGATION_BAR.UnRegisterListener({type: Alloy.CFG.NAVBAR_BASE_ANIMATE_END, callback: OnNavBaseAnimateEnd});
};
//===========================================================================
// EXPORTS
//===========================================================================	