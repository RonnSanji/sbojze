
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
module.exports.Init = function(baseView, controller)
{	
	ControllerManager.baseView  = baseView;
	ControllerManager.defaultController = controller;
	ControllerManager.currController = controller;
	
	// add default view to parent
	ControllerManager.baseView.add(ControllerManager.defaultController.getView());
	
	// register listener
	Alloy.CFG.REF_NAVIGATION_BAR.RegisterListener({type: Alloy.CFG.NAVBAR_BASE_ANIMATE_END, callback: OnNavBaseAnimateEnd});
};

// switch view
module.exports.SwitchView = function(e)
{
	var viewPath  = e.path;
	var viewTitle = e.title;
	var viewID    = e.id;
	
	var nextController = null;
   	var nextView       = null;  	
   	
   	Alloy.CFG.REF_WIN.SetViewProtector(true);
   	
   	if((viewID == ControllerManager.currController.getView().id) && Alloy.Globals.WebServiceManager.HasError())
   	{
   		ControllerManager.RefreshView();
   	}
   	// only change view if different id
   	else if(viewID != ControllerManager.currController.getView().id)
	{
		// use default if error creating controller
	   	try
	   	{
	   		nextController = Alloy.createController(viewPath);
	   		nextView = nextController.getView();
	   	}
	   	catch(err)
	   	{
	   		Alloy.Globals.ErrorLog({type: Alloy.Globals.ErrorLog.CHANGE_VIEW_ERROR, desc: JSON.stringify(err)});
	   		nextController =  ControllerManager.defaultController;
	   		nextView = ControllerManager.defaultController.getView();
	   	}
	   	
	   	Alloy.CFG.REF_NAVIGATION_BAR.HideAllBtns(true);
	   	   		
		if(nextController)
		{
			// show title
			Alloy.CFG.REF_NAVIGATION_BAR.getView("title").text = viewTitle;
			
			// on islogin return
			var OnIsLoginReturn = function(e)
			{
				ControllerManager.baseView.add(nextView);
				if(e == true && nextController.OnEnter)
				{
					nextController.OnEnter();	
					if(nextController.OnFirstLoad) nextController.OnFirstLoad();
					nextController.hasEntered = true;  
				}				
				
				if(ControllerManager.currController != null) 
				{
					ControllerManager.baseView.remove(ControllerManager.currController.getView());	
					if(ControllerManager.currController.OnExit && ControllerManager.currController.hasEntered) 
					{
						ControllerManager.currController.OnExit();
					}
					Alloy.Globals.LoginManager.DestroyLoginView(ControllerManager.currController);
					if(ControllerManager.currController.OnDestroy) ControllerManager.currController.OnDestroy();
					ControllerManager.currController.destroy();
					ControllerManager.currController = null;
				}				
				ControllerManager.prevController = ControllerManager.currController;
				ControllerManager.currController = nextController;		
			};			
			Alloy.Globals.LoginManager.IsLogin({controllerView: nextController, callback: OnIsLoginReturn});		
		} 	
	}   	   	
		
	// animate view	
	if(Alloy.CFG.REF_VIEW_BASE.rect.x > 0)
		Alloy.CFG.REF_NAVIGATION_BAR.getView("btnMenu").fireEvent("click");
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
		ControllerManager.baseView.add(nextController.getView());
		ControllerManager.baseView.remove(ControllerManager.currController.getView());
		
		// destroy current controller
		if(ControllerManager.currController.OnExit) ControllerManager.currController.OnExit();
		if(ControllerManager.currController.OnDestroy) ControllerManager.currController.OnDestroy();
		ControllerManager.currController.destroy();
		
		// recreate current controller
		ControllerManager.currController = Alloy.createController(currPath);
		
		var OnIsLoginReturn = function(e)
		{
			// add the current controller
			ControllerManager.baseView.add(ControllerManager.currController.getView());
			flagIsLogin = e;
			if(flagIsLogin && ControllerManager.currController.OnEnter)
			{
				ControllerManager.currController.OnEnter();	
				if(ControllerManager.currController.OnFirstLoad) ControllerManager.currController.OnFirstLoad(extraParams);
				ControllerManager.currController.hasEntered = true;  
			}
			
			// remove the dummy controller
			ControllerManager.baseView.remove(nextController.getView());
			if(nextController.OnExit) nextController.OnExit();	
			if(nextController.OnDestroy) nextController.OnDestroy();	
			nextController.destroy();
		};
		Alloy.CFG.REF_NAVIGATION_BAR.HideAllBtns(true);
		Alloy.Globals.LoginManager.IsLogin({controllerView: ControllerManager.currController, callback: OnIsLoginReturn});		
	}			
};

// add view
module.exports.AddView = function(viewPath, params)
{
	// return if controller is running
	if(ControllerManager.isRunning == true) return;
	
	var flagOnEnter = false; // for loading of loginView
	// create next controller
	var nextController = Alloy.createController(viewPath, params);
	
	// add protector
	Alloy.CFG.REF_WIN.SetViewProtector(true);
	ControllerManager.isRunning = true;
	
	// exit current controller
	Alloy.CFG.REF_NAVIGATION_BAR.HideAllBtns();
	if(ControllerManager.currController.OnExit) ControllerManager.currController.OnExit();
	
	var nextView = nextController.getView();
	nextView.left = "99%";	
	
	ControllerManager.currController.getView().add(nextView);
	ControllerManager.arrayControllers.push(ControllerManager.prevController);
	ControllerManager.prevController = ControllerManager.currController;
	ControllerManager.currController = nextController;	
	
	var OnIsLoginReturn = function(e)
	{
		flagOnEnter = e;
		
		if(nextController.NO_ANIMATE)
		{
			nextView.left = 0;
			if(nextController.OnEnter && flagOnEnter == true) 
			{
				nextController.OnEnter();	
				if(nextController.OnFirstLoad) nextController.OnFirstLoad();
				nextController.hasEntered = true;  
			}	
			// clear protector
			Alloy.CFG.REF_WIN.SetViewProtector(false);	
			ControllerManager.isRunning = false;
		}
		else if(ControllerManager.currController.USE_INTERVAL_ANIMATE)
		{
			var moveLeft = function()
			{	
				if(nextView.left <= 10 )
				{
					nextView.left = 0;	
					clearInterval(interval);
					if(nextController.OnEnter && flagOnEnter == true) 
					{
						nextController.OnEnter();	
						if(nextController.OnFirstLoad) nextController.OnFirstLoad();
						nextController.hasEntered = true;  
					}	
					// clear protector
					Alloy.CFG.REF_WIN.SetViewProtector(false);	
					ControllerManager.isRunning = false;
					//$.getView().fireEvent("animateEnd")
					//$.isRunning = false
				}
				else
					nextView.left -= 10;			
			};	
			nextView.left = nextView.rect.x;
			var interval = setInterval(moveLeft, 5);
							
		}
		else
		{
			var anim = Ti.UI.createAnimation();
		    anim.left = 0;
		    anim.opacity = 1;
		    anim.duration = Alloy.CFG.BASEVIEW_ANINMATE_SPEED;
			nextView.animate(anim);
			
			var OnComplete = function()
			{
				anim.removeEventListener("complete", OnComplete);
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
			anim.addEventListener("complete", OnComplete);
		}		
		//Alloy.Globals.Debug(JSON.stringify(ControllerManager.arrayControllers))		
		Alloy.Globals.Debug("Array of controller = " + ControllerManager.arrayControllers.length);
	};
	
	Alloy.Globals.LoginManager.IsLogin({controllerView: nextController, callback: OnIsLoginReturn});
	
};

// remove view
module.exports.RemoveView = function(viewPath)
{
	// get current view
	var currView = ControllerManager.currController.getView();	
	
	// workaround to fix some stupid issue	
	if(ControllerManager.currController.OnExitWorkaround)
	{
		ControllerManager.currController.OnExitWorkaround();
	}
	
	Alloy.CFG.REF_WIN.SetViewProtector(true);
	
	Alloy.CFG.REF_NAVIGATION_BAR.HideAllBtns();
	// exit current controller
	if(ControllerManager.currController.OnExit && ControllerManager.currController.hasEntered)
	{
		ControllerManager.currController.OnExit();
	}
	
	var OnComplete = function(e)
	{
		/*	
		anim.removeEventListener("complete", OnComplete)
		//Alloy.Globals.LoginManager.DestroyLoginView()
		// enter previous view
		if(ControllerManager.prevController.OnEnter) ControllerManager.prevController.OnEnter()
		// exit current view
				
		if(ControllerManager.currController.OnDestroy) ControllerManager.currController.OnDestroy()
		ControllerManager.prevController.getView().remove(currView)
		ControllerManager.currController.destroy()
		ControllerManager.currController = null
		
		ControllerManager.currController = ControllerManager.prevController
		ControllerManager.prevController = ControllerManager.arrayControllers.pop()
		
		Alloy.CFG.REF_WIN.SetViewProtector(false)
		*/
		
		if(e && e.source) e.source.removeEventListener("complete", OnComplete);
		//Alloy.Globals.LoginManager.DestroyLoginView()
		// enter previous view
		
				
		if(ControllerManager.currController.OnDestroy) ControllerManager.currController.OnDestroy();
		ControllerManager.prevController.getView().remove(currView);
		ControllerManager.currController.destroy();
		ControllerManager.currController = null;
		
		var prevController = ControllerManager.prevController;
		
		ControllerManager.currController = ControllerManager.prevController;
		ControllerManager.prevController = ControllerManager.arrayControllers.pop();
		
		if(prevController.OnEnter) prevController.OnEnter();
		// exit current view	
		
		Alloy.CFG.REF_WIN.SetViewProtector(false);		
	};
	
	if(ControllerManager.currController.NO_ANIMATE)
	{
		currView.left = "99%";
		OnComplete();		
	}	
	else if(ControllerManager.currController.USE_INTERVAL_ANIMATE)
	{
		var moveRight = function()
		{	
			if(currView.left >= (Alloy.CFG.BASEVIEW_ANINMATE_FINAL_POS - 10))
			{
				currView.left = Alloy.CFG.BASEVIEW_ANINMATE_FINAL_POS;	
				clearInterval(interval);
				OnComplete();
			}
			else
				currView.left += 10;				
		};	
		currView.left = currView.rect.x;
		var interval = setInterval(moveRight, 5);						
	}	
	else
	{
		var anim = Ti.UI.createAnimation();
	    anim.left = "99%"; // iOS got issue when set to 100%, the view won't animate
	    anim.opacity = 1;
	    anim.duration = Alloy.CFG.BASEVIEW_ANINMATE_SPEED;
		currView.animate(anim);
		anim.addEventListener("complete", OnComplete);		
	}
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