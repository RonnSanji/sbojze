
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
	// check if required data is set before entering the IPPT scoreboard
	if(e.row && e.row.viewID == "viewIPPTScoreboard")
	{
		if(Alloy.Globals.ProfileManager.GetProfileByType({type: Alloy.Globals.ProfileManager.AGE_CATEGORY}) == null
			|| Alloy.Globals.ProfileManager.GetProfileByType({type: Alloy.Globals.ProfileManager.VOCATION}) == null
			|| Alloy.Globals.ProfileManager.GetProfileByType({type: Alloy.Globals.ProfileManager.ORD}) == null)
		{
			Alloy.Globals.Utils.PromptAlert({title: "User Data Required", message: Alloy.Globals.AlertMsg.IPPT_SCOREBOARD_DATA_NOT_SET});
			return;
		}
	}
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


//===========================================================================
// EXPORTS
//===========================================================================
// set unack indicator on item
/*
exports.SetUnAckIndicator = function(e)
{
	var type    = e.type
	var visible = e.visible || false
	var number  = e.number || 0
	
	switch(type)
	{
		case "TYPE_MANNING":
		{
			$.viewUnAckManning.visible = visible
			$.labelUnAckManning.text   = number
			// HACK: color sometimes will change to transparent on iOS
			$.viewUnAckManning.backgroundColor = "#395A56"
			break;
		}
		case "TYPE_CALLUP":
		{
			$.viewUnAckCallUp.visible = visible
			$.labelUnAckCallUp.text   = number
			// HACK: color sometimes will change to transparent on iOS
			$.viewUnAckCallUp.backgroundColor = "#395A56"
			break;
		}
	}
};
*/
// switch menu item
exports.SwitchMenuItem = function(e)
{
	var type = e.type;
	var row = null;
	switch(type)
	{
		//case "TYPE_MANNING": row = $.subMenuMyManning; break;					
		//case "TYPE_CALLUP":  row = $.subMenuMyCallUp; break;	
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
