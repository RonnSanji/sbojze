
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

var dp_width_rate;
if(Ti.Platform.osname == 'android')
{
	dp_width_rate = Titanium.Platform.displayCaps.platformWidth / Titanium.Platform.displayCaps.logicalDensityFactor / 720;
}
else{
	dp_width_rate = Titanium.Platform.displayCaps.platformWidth / 720;
}

$.photo.width = dp_width_rate*100;
$.photo.height = dp_width_rate*100;
$.menuTitle.font = {
	fontSize: 40*dp_width_rate,
	fontWeight: 'bold',
};

$.homeIcon.width = dp_width_rate*70;
$.homeIcon.height = dp_width_rate*70;
$.homeTitle.font = {
	fontSize: 36*dp_width_rate,
	fontWeight: 'bold',
};

$.profileIcon.width = dp_width_rate*70;
$.profileIcon.height = dp_width_rate*70;
$.profileTitle.font = {
	fontSize: 36*dp_width_rate,
	fontWeight: 'bold',
};

$.searchIcon.width = dp_width_rate*70;
$.searchIcon.height = dp_width_rate*70;
$.searchTitle.font = {
	fontSize: 36*dp_width_rate,
	fontWeight: 'bold',
};

$.manageIcon.width = dp_width_rate*70;
$.manageIcon.height = dp_width_rate*70;
$.manageTitle.font = {
	fontSize: 36*dp_width_rate,
	fontWeight: 'bold',
};

$.settingsIcon.width = dp_width_rate*70;
$.settingsIcon.height = dp_width_rate*70;
$.settingsTitle.font = {
	fontSize: 36*dp_width_rate,
	fontWeight: 'bold',
};

$.enquiryIcon.width = dp_width_rate*70;
$.enquiryIcon.height = dp_width_rate*70;
$.enquiryTitle.font = {
	fontSize: 36*dp_width_rate,
	fontWeight: 'bold',
};

$.logoutIcon.width = dp_width_rate*50;
$.logoutIcon.height = dp_width_rate*50;
$.logoutTitle.font = {
	fontSize: 28*dp_width_rate,
	fontWeight: 'bold',
};

var OnItemClick = function(path,title,viewID) 
{  	

	if(Alloy.CFG.REF_VIEW_BASE.rect.x > 0)
	{		
		if(Alloy.Globals.ControllerManager.isRunning == false)
		{
			Alloy.Globals.ControllerManager.isRunning = true;
			Alloy.Globals.ControllerManager.SwitchView({
				path: path, 
				title: title,
				id: viewID,
			});
		}		
    }
};

var switchTab = function(name){
	switch(name){
		case "MainPage":
			$.homeLine.backgroundColor = "#2E2F38";
			$.profileLine.backgroundColor = "#454754";
			$.searchLine.backgroundColor = "#454754";
			$.manageLine.backgroundColor = "#454754";
			$.settingsLine.backgroundColor = "#454754";
			$.enquiryLine.backgroundColor = "#454754";
			$.homeTitle.color = "#4BCFED";
			$.profileTitle.color = "#FFFFFF";
			$.searchTitle.color = "#FFFFFF";
			$.manageTitle.color = "#FFFFFF";
			$.settingsTitle.color = "#FFFFFF";
			$.enquiryTitle.color = "#FFFFFF";
			
			$.homeIcon.image = "/images/menu_home_selected.png";
			$.profileIcon.image = "/images/menu_profile.png";
			$.searchIcon.image = "/images/menu_search.png";
			$.manageIcon.image = "/images/menu_mgmt.png";
			$.settingsIcon.image = "/images/menu_settings.png";
			$.enquiryIcon.image = "/images/menu_enquiry.png";
		break;
		
		case "Profile":
			$.homeLine.backgroundColor = "#454754";
			$.profileLine.backgroundColor = "#2E2F38";
			$.searchLine.backgroundColor = "#454754";
			$.manageLine.backgroundColor = "#454754";
			$.settingsLine.backgroundColor = "#454754";
			$.enquiryLine.backgroundColor = "#454754";
			$.homeTitle.color = "#FFFFFF";
			$.profileTitle.color = "#4BCFED";
			$.searchTitle.color = "#FFFFFF";
			$.manageTitle.color = "#FFFFFF";
			$.settingsTitle.color = "#FFFFFF";
			$.enquiryTitle.color = "#FFFFFF";
			
			$.homeIcon.image = "/images/menu_home.png";
			$.profileIcon.image = "/images/menu_profile_selected.png";
			$.searchIcon.image = "/images/menu_search.png";
			$.manageIcon.image = "/images/menu_mgmt.png";
			$.settingsIcon.image = "/images/menu_settings.png";
			$.enquiryIcon.image = "/images/menu_enquiry.png";
		break;
		
		case "Search":
			$.homeLine.backgroundColor = "#454754";
			$.profileLine.backgroundColor = "#454754";
			$.searchLine.backgroundColor = "#2E2F38";
			$.manageLine.backgroundColor = "#454754";
			$.settingsLine.backgroundColor = "#454754";
			$.enquiryLine.backgroundColor = "#454754";
			$.homeTitle.color = "#FFFFFF";
			$.profileTitle.color = "#FFFFFF";
			$.searchTitle.color = "#4BCFED";
			$.manageTitle.color = "#FFFFFF";
			$.settingsTitle.color = "#FFFFFF";
			$.enquiryTitle.color = "#FFFFFF";
			
			$.homeIcon.image = "/images/menu_home.png";
			$.profileIcon.image = "/images/menu_profile.png";
			$.searchIcon.image = "/images/menu_search_selected.png";
			$.manageIcon.image = "/images/menu_mgmt.png";
			$.settingsIcon.image = "/images/menu_settings.png";
			$.enquiryIcon.image = "/images/menu_enquiry.png";
		break;
		
		case "Manage":
			$.homeLine.backgroundColor = "#454754";
			$.profileLine.backgroundColor = "#454754";
			$.searchLine.backgroundColor = "#454754";
			$.manageLine.backgroundColor = "#2E2F38";
			$.settingsLine.backgroundColor = "#454754";
			$.enquiryLine.backgroundColor = "#454754";
			$.homeTitle.color = "#FFFFFF";
			$.profileTitle.color = "#FFFFFF";
			$.searchTitle.color = "#FFFFFF";
			$.manageTitle.color = "#4BCFED";
			$.settingsTitle.color = "#FFFFFF";
			$.enquiryTitle.color = "#FFFFFF";
			
			$.homeIcon.image = "/images/menu_home.png";
			$.profileIcon.image = "/images/menu_profile.png";
			$.searchIcon.image = "/images/menu_search.png";
			$.manageIcon.image = "/images/menu_mgmt_selected.png";
			$.settingsIcon.image = "/images/menu_settings.png";
			$.enquiryIcon.image = "/images/menu_enquiry.png";
		break;
		
		case "Settings":
			$.homeLine.backgroundColor = "#454754";
			$.profileLine.backgroundColor = "#454754";
			$.searchLine.backgroundColor = "#454754";
			$.manageLine.backgroundColor = "#454754";
			$.settingsLine.backgroundColor = "#2E2F38";
			$.enquiryLine.backgroundColor = "#454754";
			$.homeTitle.color = "#FFFFFF";
			$.profileTitle.color = "#FFFFFF";
			$.searchTitle.color = "#FFFFFF";
			$.manageTitle.color = "#FFFFFF";
			$.settingsTitle.color = "#4BCFED";
			$.enquiryTitle.color = "#FFFFFF";
			
			$.homeIcon.image = "/images/menu_home.png";
			$.profileIcon.image = "/images/menu_profile.png";
			$.searchIcon.image = "/images/menu_search.png";
			$.manageIcon.image = "/images/menu_mgmt.png";
			$.settingsIcon.image = "/images/menu_settings_selected.png";
			$.enquiryIcon.image = "/images/menu_enquiry.png";
		break;
		
		case "Enquiry":
			$.homeLine.backgroundColor = "#454754";
			$.profileLine.backgroundColor = "#454754";
			$.searchLine.backgroundColor = "#454754";
			$.manageLine.backgroundColor = "#454754";
			$.settingsLine.backgroundColor = "#454754";
			$.enquiryLine.backgroundColor = "#2E2F38";
			$.homeTitle.color = "#FFFFFF";
			$.profileTitle.color = "#FFFFFF";
			$.searchTitle.color = "#FFFFFF";
			$.manageTitle.color = "#FFFFFF";
			$.settingsTitle.color = "#FFFFFF";
			$.enquiryTitle.color = "#4BCFED";
			
			$.homeIcon.image = "/images/menu_home.png";
			$.profileIcon.image = "/images/menu_profile.png";
			$.searchIcon.image = "/images/menu_search.png";
			$.manageIcon.image = "/images/menu_mgmt.png";
			$.settingsIcon.image = "/images/menu_settings.png";
			$.enquiryIcon.image = "/images/menu_enquiry_selected.png";
		break;
	}
};

var init = function(){
	$.homeLine.backgroundColor = "#2E2F38";
	$.homeTitle.color = "#4BCFED";
};

init();

$.homeSelect.addEventListener("click",function(){
	var path = Alloy.CFG.PATH_MAINPAGE;
	var title = "MainPage";
	var viewID = "viewMainPage";
	switchTab(title);
	OnItemClick(path,title,viewID);
	Ti.App.fireEvent("switch_mainPage",{});
});

$.profileSelect.addEventListener("click",function(){
	var path = Alloy.CFG.PATH_PROFILE;
	var title = "Profile";
	var viewID = "viewProfile";
	switchTab(title);
	OnItemClick(path,title,viewID);
	Ti.App.fireEvent("switch_profile",{});
});

$.searchSelect.addEventListener("click",function(){
	var path = Alloy.CFG.PATH_SEARCH;
	var title = "Search";
	var viewID = "viewSearch";
	switchTab(title);
	OnItemClick(path,title,viewID);
});

$.manageSelect.addEventListener("click",function(){
	var path = Alloy.CFG.PATH_MANAGE;
	var title = "Manage";
	var viewID = "viewManage";
	switchTab(title);
	OnItemClick(path,title,viewID);
});

$.settingsSelect.addEventListener("click",function(){
	var path = Alloy.CFG.PATH_SETTINGS;
	var title = "Settings";
	var viewID = "viewSettings";
	switchTab(title);
	OnItemClick(path,title,viewID);
});

$.enquirySelect.addEventListener("click",function(){
	var path = Alloy.CFG.PATH_ENQUIRY;
	var title = "Enquiry";
	var viewID = "viewEnquiry";
	switchTab(title);
	OnItemClick(path,title,viewID);
});
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
