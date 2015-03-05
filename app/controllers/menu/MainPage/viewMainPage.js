var args = arguments[0] || {};

//===========================================================================
// EXPORTS
//===========================================================================
// on enter
exports.OnEnter = function(e)
{	
	Alloy.Globals.Debug($.getView().id + " OnEnter");
	Alloy.CFG.REF_NAVIGATION_BAR.getView("btnMenu").visible = true;	
};

// on exit
exports.OnExit = function()
{
	Alloy.Globals.Debug($.getView().id + " OnExit");
};

// on first load
exports.OnFirstLoad = function()
{
	Alloy.Globals.Debug($.getView().id + " OnFirstLoad");	
};

// on destroy
exports.OnDestroy = function()
{
	Alloy.Globals.Debug($.getView().id + " OnDestroy");
	arrayAnnotations = null;
};
//===========================================================================
// END OF EXPORTS
//===========================================================================