
/*
 * Copyright: Activate Interactive
 * Date: March 01 2014
 * 
 * Title: viewMenu.js
 * Description: Menu view
 * 
 * ChangeLog: 
 * 
 * 
 * 
 */

//===========================================================================
// HANDLERS
//===========================================================================	
// on menu item click
var OnItemClick = function(e) 
{  	

	if(Alloy.CFG.REF_VIEW_BASE.rect.x > 0)
	{		
		if(Alloy.Globals.ControllerManager.isRunning == false)
		{
			Alloy.Globals.ControllerManager.isRunning = true;
			Alloy.Globals.ControllerManager.SwitchView({
				path: e.row.path, 
				title: e.row.children[0].text,
				id: e.row.viewID
			});
		}		
    }
};
//===========================================================================
// END OF HANDLERS
//===========================================================================	

// switch menu item
exports.SwitchMenuItem = function(e)
{
	var type = e.type;
	var row = null;
	switch(type)
	{
		case "TYPE_UPDATE_CONTACT":  row = $.subMenuUpdateContact; break;
	}
	if(row)
	{
		if(Alloy.Globals.ControllerManager.isRunning == false)
		{
			Alloy.Globals.ControllerManager.isRunning = true;
			Alloy.Globals.ControllerManager.SwitchView({
				path: row.path, 
				title: row.children[0].text,
				id: row.viewID
			});
		}		
	}
};
//===========================================================================
// END OF EXPORTS
//===========================================================================
