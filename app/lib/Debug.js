
/*
 * Copyright: Activate Interactive
 * Date: March 01 2014
 * 
 * Title: Debug.js
 * Description: Show debug information when enabled 
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
// REQUIRED FILES
//===========================================================================	


//===========================================================================
// MODULE DECLARACTION
//===========================================================================
function Debug(string)
{
	if(Alloy.CFG.ISDEBUG)
		Ti.API.debug(string);
}
module.exports = Debug;
//===========================================================================
// END OF MODULE DECLARACTION
//===========================================================================

