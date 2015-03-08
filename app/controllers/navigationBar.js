
/*
 * Copyright: Activate Interactive
 * Date: March 01 2014
 * 
 * Title: navigationBar.js
 * Description: Navigator Bar
 *
 * ChangeLog: 
 *  
 * 
 */

//===========================================================================
// HANDLERS
//===========================================================================	
// on button menu click
var OnBtnMenuClick = function(e) 
{  
	Alloy.Globals.Debug("Navigator fire event animate ");
	$.getView().fireEvent("animateBegin");
	Alloy.CFG.FLAG_MENU_TOUCHED = true;
	$.isRunning = true;
	if(Ti.Platform.Android && Alloy.Globals.ControllerManager.GetCurrentController().USE_INTERVAL_ANIMATE)
	{		
		// HACK: force filter menu to hide due to slow android response
		Alloy.CFG.REF_VIEW_MENU_FILTER.getView("table").visible = false;	
		
		var moveLeft = function()
		{	
			if(Alloy.CFG.REF_VIEW_BASE.left <= 10 )
			{
				Alloy.CFG.REF_VIEW_BASE.left = 0;	
				clearInterval(interval);
				$.getView().fireEvent("animateEnd");
				$.isRunning = false;
			}
			else
				Alloy.CFG.REF_VIEW_BASE.left -= 10;				
		};		
		var moveRight = function()
		{	
			if(Alloy.CFG.REF_VIEW_BASE.left >= (Alloy.CFG.BASEVIEW_ANINMATE_FINAL_POS - 10))
			{
				Alloy.CFG.REF_VIEW_BASE.left = Alloy.CFG.BASEVIEW_ANINMATE_FINAL_POS;	
				clearInterval(interval);
				$.getView().fireEvent("animateEnd");
				$.isRunning = false;
			}
			else
				Alloy.CFG.REF_VIEW_BASE.left += 10;				
		};						
		var interval = null;
		if(Alloy.CFG.REF_VIEW_BASE.rect.x > 0)
		{
			$.getView().fireEvent("close");
			interval = setInterval(moveLeft, 5);
	    }    	
	    else
	    {
	    	$.getView().fireEvent("open");
	    	interval = setInterval(moveRight, 5);		
	    }
		Alloy.CFG.REF_VIEW_BASE.left = 	Alloy.CFG.REF_VIEW_BASE.rect.x;
	}
	else
	{
		Alloy.Globals.Debug("Navigator fire event animate by animation");
				
		var anim = Ti.UI.createAnimation();
		Alloy.Globals.Debug("Base rect position is at " + Alloy.CFG.REF_VIEW_BASE.rect.x);
		Alloy.Globals.Debug("Base left position is at " + Alloy.CFG.REF_VIEW_BASE.left);
		if(Alloy.CFG.REF_VIEW_BASE.rect.x > 0)
		{
			$.getView().fireEvent("close");
			anim.left = 0;
		}    	
	    else
	    {
	    	$.getView().fireEvent("open");
	    	anim.left = Alloy.CFG.BASEVIEW_ANINMATE_FINAL_POS;
	    }
	    	
		anim.duration = Alloy.CFG.BASEVIEW_ANINMATE_SPEED;
		Alloy.CFG.REF_VIEW_BASE.animate(anim);	
		
		var OnComplete = function()
		{
			anim.removeEventListener("complete", OnComplete);
			Alloy.CFG.REF_VIEW_BASE.left = anim.left;
			$.getView().fireEvent("animateEnd");
			$.isRunning = false;
		};
		anim.addEventListener("complete", OnComplete);
	}	
};

// on button back click
var OnBtnBackClick = function(e) 
{  
	Alloy.Globals.ControllerManager.RemoveView();
};

// on button action click
var OnBtnActionClick = function(e)
{
	// do nothing	
};
//===========================================================================
// END OF HANDLERS
//===========================================================================	


//===========================================================================
// FUNCTIONS
//===========================================================================
// hide all buttons when view's in transition
var HideAllBtns = function(exceptMenu)
{
	Alloy.Globals.Debug("Hide all btns");
	//$.btnAction.visible = false
	// $.btnAction.hide();
	// $.btnBack.visible   = false;
	// if(!exceptMenu)
		// $.btnMenu.visible = false;
};
//===========================================================================
// END OF FUNCTIONS
//===========================================================================


//===========================================================================
// LOGICS
//===========================================================================	
$.HideAllBtns = HideAllBtns;
// for android. to check if the process is still running
$.isRunning = false;

// if(Alloy.CFG.APPLICATION_BUILD == Alloy.CFG.BUILD.DEVELOPMENT)
// {
	// $.labelVersion.text = ((OS_ANDROID) ? "Android " : "iOS ") + Alloy.CFG.VERSION_NUM_DEVELOPMENT + "." + Alloy.CFG.SERVER_TYPE;
// }

//$.labelVersion.text = ((OS_ANDROID) ? "Android " : "iOS ") + Alloy.CFG.VERSION_NUM_DEVELOPMENT + "." + Alloy.CFG.SERVER_TYPE
						
//===========================================================================
// END OF LOGICS
//===========================================================================	


//===========================================================================
// EXPORTS
//===========================================================================
// register listener
exports.RegisterListener = function(e)
{
	var type     = e.type;
	var callback = e.callback;
	
	switch(type)
	{
		case Alloy.CFG.NAVBAR_MENU_CLICK:
		{
			$.btnMenu.addEventListener("click", callback);
			break;
		}
		case Alloy.CFG.NAVBAR_MENU_OPEN:
		{
			$.getView().addEventListener("open", callback);
			break;
		}
		case Alloy.CFG.NAVBAR_MENU_CLOSE:
		{
			$.getView().addEventListener("close", callback);
			break;
		}
		case Alloy.CFG.NAVBAR_BASE_ANIMATE_BEGIN:
		{
			$.getView().addEventListener("animateBegin", callback);
			break;
		}
		case Alloy.CFG.NAVBAR_BASE_ANIMATE_END:
		{
			
			$.getView().addEventListener("animateEnd", callback);
			break;
		}
	}
};

// unregister listener
exports.UnRegisterListener = function(e)
{
	var type     = e.type;
	var callback = e.callback;
	
	switch(type)
	{
		case Alloy.CFG.NAVBAR_MENU_CLICK:
		{
			$.btnMenu.removeEventListener("click", callback);
			break;
		}
		case Alloy.CFG.NAVBAR_MENU_OPEN:
		{
			$.getView().removeEventListener("open", callback);
			break;
		}
		case Alloy.CFG.NAVBAR_MENU_CLOSE:
		{
			$.getView().removeEventListener("close", callback);
			break;
		}
		case Alloy.CFG.NAVBAR_BASE_ANIMATE_BEGIN:
		{
			$.getView().removeEventListener("animateBegin", callback);
			break;
		}
		case Alloy.CFG.NAVBAR_BASE_ANIMATE_END:
		{
			$.getView().removeEventListener("animateEnd", callback);
			break;
		}
	}
};
//===========================================================================
// END OF EXPORTS
//===========================================================================

Ti.App.addEventListener('showMenu',OnBtnMenuClick);

Ti.App.addEventListener('switch_mainPage',function(){
	$.viewNavigatorBar.removeAllChildren();
	var navigator = Alloy.createController("navigationBar_mainPage").getView('navigator');
	$.viewNavigatorBar.add(navigator);
});

Ti.App.addEventListener('switch_profile',function(){
	$.viewNavigatorBar.removeAllChildren();
	var navigator = Alloy.createController("navigationBar_profile").getView('navigator');
	$.viewNavigatorBar.add(navigator);
});


