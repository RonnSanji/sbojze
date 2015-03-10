// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

var screen_width;
if(Ti.Platform.osname == 'android')
{
	screen_width = Titanium.Platform.displayCaps.platformWidth / Titanium.Platform.displayCaps.logicalDensityFactor;
}
else{
	screen_width = Titanium.Platform.displayCaps.platformWidth;
}

var Alloy = require("alloy"), _ = require("alloy/underscore")._, Backbone = require("alloy/backbone");

 Alloy.Globals.Utils             = require("Utils");
 Alloy.Globals.ActivityIndicator = require("ActivityIndicator");
 Alloy.Globals.AlertMsg          = require("AlertMsg");
 Alloy.Globals.Debug               = require("Debug");
// Alloy.Globals.ErrorLog          = require("ErrorLog");
// Alloy.Globals.NativeCalendar    = require("native/Calendar");
// Alloy.Globals.FlurryAnalytics   = require("FlurryAnalytics");

//** custom modules
// Alloy.Globals.SingpassModule        = (OS_ANDROID) ? require('com.activate.singpassAndroid') : require('com.MySingPassTest');
// Alloy.Globals.CalendarAndroidModule = (OS_ANDROID) ? require("com.activate.synccalendar") : null;
// Ti.include("date.js");

//** managers
// Alloy.Globals.ResourceMgr       = require("managers/ResourceManager");
 Alloy.Globals.ControllerManager = require("managers/ControllerManager");
// Alloy.Globals.LoginManager      = require("managers/LoginManager");
// Alloy.Globals.WebServiceManager = require("managers/WebServiceManager");
// Alloy.Globals.CalendarManager   = require("managers/CalendarManager");
Alloy.Globals.AppBehaviourManager   = require("managers/AppBehaviourManager");
// Alloy.Globals.ProfileManager        = require("managers/ProfileManager");
// Alloy.Globals.WorkoutTrackerManager = require("managers/WorkoutTrackerManager");

//**=====[Ti modules]=======
// Alloy.Globals.Map = require('ti.map');

//======[functions]=======
Alloy.Globals.IsIOS7 = function(){
	// iOS-specific test
	if (Titanium.Platform.name == 'iPhone OS')
	{
		var version = Titanium.Platform.version.split(".");
		var major = parseInt(version[0],10);

		// Can only test this support on a 3.2+ device
		if (major >= 7)
		{
			return true;
		}
	}
	return false;
};

Alloy.Globals.ImageFlip = function()
{
	var t1 = Ti.UI.create2DMatrix();
	return t1.rotate(180);	
};

//======[Configurations/Settings]=======
Alloy.CFG.ISDEBUG = true;
//production*** change above to false

// Alloy.CFG.PATH_MANAGE_IPPT         = "menu/ippt/ManageIPPT/viewManageIPPT";
// Alloy.CFG.PATH_IPPT_RESULTS        = "menu/ippt/IPPTResult/viewIPPTResult";
// Alloy.CFG.PATH_IPPT_SCOREBOARD     = "menu/ippt/IPPTScoreboard/viewIPPTScoreboard";
// Alloy.CFG.PATH_IPPT_REVISED_SCOREBOARD = "menu/ippt/IPPTRevisedScoreboard/viewIPPTRevisedScoreboard";
// Alloy.CFG.PATH_MANAGE_IPT          = "menu/ippt/ManageIPT/viewManageIPT";
// Alloy.CFG.PATH_PPT_STANDARD        = "menu/ippt/PPTStandard/viewPPTStandard";
   
   Alloy.CFG.PATH_MAINPAGE              = "menu/MainPage/viewMainPage";
   Alloy.CFG.PATH_PROFILE               = "menu/Profile/viewProfile";
   Alloy.CFG.PATH_SEARCH               = "menu/Search/viewSearch";
   Alloy.CFG.PATH_MANAGE               = "menu/Manage/viewManage";
   Alloy.CFG.PATH_SETTINGS               = "menu/Settings/viewSettings";
   Alloy.CFG.PATH_ENQUIRY               = "menu/Enquiry/viewEnquiry";
   Alloy.CFG.PATH_DETAIL                = "menu/MainPage/viewDetail";
   
   Alloy.CFG.NAVPATH_MAINPAGE              = "menu/MainPage/navigationBar_mainPage";
   Alloy.CFG.NAVPATH_PROFILE               = "menu/Profile/navigationBar_Profile";
   // Alloy.CFG.NAVPATH_SEARCH               = "menu/Search/viewSearch";
   // Alloy.CFG.NAVPATH_MANAGE               = "menu/Manage/viewManage";
   // Alloy.CFG.NAVPATH_SETTINGS               = "menu/Settings/viewSettings";
   // Alloy.CFG.NAVPATH_ENQUIRY               = "menu/Enquiry/viewEnquiry";
   Alloy.CFG.NAVPATH_DETAIL                = "menu/MainPage/navigationBar_Detail";
   
// Alloy.CFG.PATH_WORKOUT_TRACKER     = "menu/fitness/WorkoutTracker/viewWorkoutTracker";
 Alloy.CFG.PATH_CIRCUIT_TRANINING     = "menu/fitness/CircuitTraining/viewCircuitTraining";
// Alloy.CFG.PATH_IPT_WORKOUT         = "menu/fitness/IPTWorkout/viewIPTWorkout";
// Alloy.CFG.PATH_RT_WORKOUT          = "menu/fitness/RTWorkout/viewRTWorkout";
// Alloy.CFG.PATH_IPPT_IN_YOUR_COMMUNITY     = "menu/fitness/IPPTInYourCommunity/viewIPPTInYourCommunity";
// Alloy.CFG.PATH_BODY_MASS_INDEX_CALCULATOR = "menu/fitness/BodyMassIndexCalculator/viewBodyMassIndexCalculator";
// Alloy.CFG.PATH_WEATHER_FORECAST           = "menu/fitness/WeatherForecast/viewWeatherForecast";
// 
// Alloy.CFG.PATH_UPDATE_CONTACT = "menu/settings/UpdateContact/viewUpdateContact";
// Alloy.CFG.PATH_MY_PROFILE     = "menu/settings/MyProfile/viewMyProfile";
// Alloy.CFG.PATH_USER_GUIDE     = "menu/helpCentre/viewUserGuide";
// Alloy.CFG.PATH_FEEDBACK       = "menu/helpCentre/viewFeedback";
// Alloy.CFG.PATH_CONTACT_US     = "menu/helpCentre/viewContactUs";
// 
// Alloy.CFG.PATH_DUMMY = "menu/viewPathDummy"; // for reloading same view

// views
// Alloy.CFG.VIEW_LOGIN = "menu/viewLogin";

// **images
// Alloy.CFG.IMG_PATH_APP    = "/images/IPPT/";
// Alloy.CFG.IMG_PATH_SHARED = "/images/ShareItems/";
// 
// Alloy.CFG.IMG_SIDEMENU_ICON_MANAGE_IPPT                = Alloy.CFG.IMG_PATH_APP + "sidemenu_icon_ippt.png";
// Alloy.CFG.IMG_SIDEMENU_ICON_BODY_MASS_INDEX_CALCULATOR = Alloy.CFG.IMG_PATH_APP + "sidemenu_icon_calculator.png";
// Alloy.CFG.IMG_SIDEMENU_ICON_IPT_WORKOUT                = Alloy.CFG.IMG_PATH_APP + "sidemenu_icon_calendar1.png";
// Alloy.CFG.IMG_SIDEMENU_ICON_RT_WORKOUT                 = Alloy.CFG.IMG_PATH_APP + "sidemenu_icon_calendar2.png";
// Alloy.CFG.IMG_SIDEMENU_ICON_PPT_STANDARD               = Alloy.CFG.IMG_PATH_APP + "sidemenu_icon_chart.png";
// Alloy.CFG.IMG_SIDEMENU_ICON_IPPT_SCOREBOARD            = Alloy.CFG.IMG_PATH_APP + "sidemenu_icon_clipboard.png";
// Alloy.CFG.IMG_SIDEMENU_ICON_IPPT_REVISED_SCOREBOARD    = Alloy.CFG.IMG_PATH_APP + "sidemenu_icon_diary1.png";
// Alloy.CFG.IMG_SIDEMENU_ICON_MANAGE_IPT                 = Alloy.CFG.IMG_PATH_APP + "sidemenu_icon_diary2.png";
// Alloy.CFG.IMG_SIDEMENU_ICON_MANAGE_RT                  = Alloy.CFG.IMG_PATH_APP + "sidemenu_icon_diary3.png";
// Alloy.CFG.IMG_SIDEMENU_ICON_IPPT_IN_YOUR_COMMUNITY     = Alloy.CFG.IMG_PATH_APP + "sidemenu_icon_mapmarker.png";
// Alloy.CFG.IMG_SIDEMENU_ICON_IPPT_RESULT                = Alloy.CFG.IMG_PATH_APP + "sidemenu_icon_note.png";
// Alloy.CFG.IMG_SIDEMENU_ICON_UPDATE_CONTACT             = Alloy.CFG.IMG_PATH_APP + "sidemenu_icon_smartphone.png";
// Alloy.CFG.IMG_SIDEMENU_ICON_WORKOUT_TRACKER            = Alloy.CFG.IMG_PATH_APP + "sidemenu_icon_stopwatch.png";
// Alloy.CFG.IMG_SIDEMENU_ICON_CIRCUIT_TRAINING           = Alloy.CFG.IMG_PATH_APP + "sidemenu_icon_checklist.png";
// Alloy.CFG.IMG_SIDEMENU_ICON_WEATHER_FORECAST           = Alloy.CFG.IMG_PATH_APP + "sidemenu_icon_weather.png";
// Alloy.CFG.IMG_SIDEMENU_ICON_MY_PROFILE                 = Alloy.CFG.IMG_PATH_APP + "sidemenu_icon_portrait.png";
// Alloy.CFG.IMG_SIDEMENU_ICON_USER_GUIDE                 = Alloy.CFG.IMG_PATH_APP + "sidemenu_icon_question.png";
// Alloy.CFG.IMG_SIDEMENU_ICON_FEEDBACK                   = Alloy.CFG.IMG_PATH_APP + "sidemenu_icon_pencil.png";
// Alloy.CFG.IMG_SIDEMENU_ICON_CONTACT_US                 = Alloy.CFG.IMG_PATH_APP + "sidemenu_icon_phone.png";
// Alloy.CFG.IMG_SIDEMENU_ICON_LOGOUT                     = Alloy.CFG.IMG_PATH_APP + "sidemenu_icon_exit.png";
// 
// Alloy.CFG.IMG_MEDAL_BRONZE                            = Alloy.CFG.IMG_PATH_APP + "medal_bronze.png";
// Alloy.CFG.IMG_MEDAL_SILVER                            = Alloy.CFG.IMG_PATH_APP + "medal_silver.png";
// Alloy.CFG.IMG_MEDAL_GOLD                              = Alloy.CFG.IMG_PATH_APP + "medal_gold.png";
// 
// Alloy.CFG.IMG_SIDEMENU_SHADOW_BG         = Alloy.CFG.IMG_PATH_SHARED + "sidemenu_shadow_bg.png";
// Alloy.CFG.IMG_SIDEMENU_ITEM_BG           = Alloy.CFG.IMG_PATH_SHARED + "sidemenu_item_bg.png";
// Alloy.CFG.IMG_SIDEMENU_ITEM_BG_PRESS     = Alloy.CFG.IMG_PATH_SHARED + "sidemenu_item_bg_press.png";
// Alloy.CFG.IMG_SIDEMENU_CHECKBOX          = Alloy.CFG.IMG_PATH_SHARED + "sidemenu_checkbox.png";
// Alloy.CFG.IMG_SIDEMENU_CHECKBOX_SELECTED = Alloy.CFG.IMG_PATH_SHARED + "sidemenu_checkbox_selected.png";
// Alloy.CFG.IMG_SIDEMENU_CATEGORY_BG       = Alloy.CFG.IMG_PATH_SHARED + "sidemenu_category_bg.png";
// Alloy.CFG.IMG_SIDEMENU_HEADER_BG         = Alloy.CFG.IMG_PATH_SHARED + "sidemenu_header_bg.png";
// Alloy.CFG.IMG_SIDEMENU_APP_ICON          = "/appicon.png";
// 
// Alloy.CFG.IMG_HEADER_BG = Alloy.CFG.IMG_PATH_SHARED + "header_bg.png";
// Alloy.CFG.IMG_FOOTER_BG = Alloy.CFG.IMG_PATH_SHARED + "footer_bg.png";
// 
// Alloy.CFG.IMG_BTN_MENU            = Alloy.CFG.IMG_PATH_SHARED + "button_menu.png";
// Alloy.CFG.IMG_BTN_MENU_PRESS      = Alloy.CFG.IMG_PATH_SHARED + "button_menu_press.png";
// Alloy.CFG.IMG_BTN_ACTION          = Alloy.CFG.IMG_PATH_SHARED + "button_add.png";
// Alloy.CFG.IMG_BTN_ACTION_PRESS    = Alloy.CFG.IMG_PATH_SHARED + "button_add_press.png";
// Alloy.CFG.IMG_BTN_BACK            = Alloy.CFG.IMG_PATH_SHARED + "button_back.png";
// Alloy.CFG.IMG_BTN_BACK_PRESS      = Alloy.CFG.IMG_PATH_SHARED + "button_back_press.png";
// Alloy.CFG.IMG_BTN_BG_PRESS        = Alloy.CFG.IMG_PATH_SHARED + "button_bg_press.png";
// Alloy.CFG.IMG_BTN_BG              = Alloy.CFG.IMG_PATH_SHARED + "button_bg.png";
// Alloy.CFG.IMG_BTN_BG_GREY_OFF     = Alloy.CFG.IMG_PATH_SHARED + "button_grey_off_bg.png";
// Alloy.CFG.IMG_BTN_REMOVE          = Alloy.CFG.IMG_PATH_SHARED + "button_remove.png";
// Alloy.CFG.IMG_BTN_REMOVE_PRESS    = Alloy.CFG.IMG_PATH_SHARED + "button_remove_press.png";
// Alloy.CFG.IMG_BTN_EDIT            = Alloy.CFG.IMG_PATH_SHARED + "button_edit.png";
// Alloy.CFG.IMG_BTN_EDIT_PRESS      = Alloy.CFG.IMG_PATH_SHARED + "button_edit_press.png";
// Alloy.CFG.IMG_BTN_REFRESH         = Alloy.CFG.IMG_PATH_SHARED + "button_refresh.png";
// Alloy.CFG.IMG_BTN_REFRESH_PRESS   = Alloy.CFG.IMG_PATH_SHARED + "button_refresh_press.png";
// Alloy.CFG.IMG_BTN_FILTER          = Alloy.CFG.IMG_PATH_SHARED + "button_filter.png";
// Alloy.CFG.IMG_BTN_FILTER_PRESS    = Alloy.CFG.IMG_PATH_SHARED + "button_filter_press.png";
// Alloy.CFG.IMG_BTN_YES_BG          = Alloy.CFG.IMG_PATH_SHARED + "button_yes_bg.png";
// Alloy.CFG.IMG_BTN_YES_BG_PRESS    = Alloy.CFG.IMG_PATH_SHARED + "button_yes_bg_press.png";
// Alloy.CFG.IMG_BTN_NO_BG           = Alloy.CFG.IMG_PATH_SHARED + "button_no_bg.png";
// Alloy.CFG.IMG_BTN_NO_BG_PRESS     = Alloy.CFG.IMG_PATH_SHARED + "button_no_bg_press.png";
// Alloy.CFG.IMG_BTN_GREY_OFF_BG     = Alloy.CFG.IMG_PATH_SHARED + "button_grey_off_bg.png";
// Alloy.CFG.IMG_BTN_GREY_OFF_BG_PRESS = Alloy.CFG.IMG_PATH_SHARED + "button_grey_off_bg_press.png";
// Alloy.CFG.IMG_BTN_GREY_ON_BG        = Alloy.CFG.IMG_PATH_SHARED + "button_grey_on_bg.png";
// Alloy.CFG.IMG_BTN_GREY_ON_BG_PRESS  = Alloy.CFG.IMG_PATH_SHARED + "button_grey_on_bg_press.png";
// Alloy.CFG.IMG_BTN_CHECKIN         = Alloy.CFG.IMG_PATH_SHARED + "button_checkin.png";
// Alloy.CFG.IMG_BTN_CHECKIN_PRESS   = Alloy.CFG.IMG_PATH_SHARED + "button_checkin_press.png";
// Alloy.CFG.IMG_TAB_ON_BG           = Alloy.CFG.IMG_PATH_SHARED + "tab_on_bg.png";
// Alloy.CFG.IMG_TAB_OFF_BG          = Alloy.CFG.IMG_PATH_SHARED + "tab_off_bg.png";
// 
// Alloy.CFG.IMG_CALENDAR_DATE_BG       = Alloy.CFG.IMG_PATH_SHARED + "calendar_date_bg.png";
// Alloy.CFG.IMG_CALENDAR_DATE_ON_BG    = Alloy.CFG.IMG_PATH_SHARED + "calendar_date_on_bg.png";
// Alloy.CFG.IMG_CALENDAR_END_SHADOW    = Alloy.CFG.IMG_PATH_SHARED + "calendar_end_shadow.png";
// Alloy.CFG.IMG_CALENDAR_EVENT         = Alloy.CFG.IMG_PATH_SHARED + "calendar_event.png";
// Alloy.CFG.IMG_CALENDAR_EVENT_ON      = Alloy.CFG.IMG_PATH_SHARED + "calendar_event_on.png";
// Alloy.CFG.IMG_CALENDAR_HEADER_BG     = Alloy.CFG.IMG_PATH_SHARED + "calendar_header_bg.png";
// Alloy.CFG.IMG_CALENDAR_TODAY_BG      = Alloy.CFG.IMG_PATH_SHARED + "calendar_today_bg.png";
// Alloy.CFG.IMG_CALENDAR_TODAY_ON      = Alloy.CFG.IMG_PATH_SHARED + "calendar_today_on.png";
// 
// Alloy.CFG.IMG_FORM_SWITCH_HANDLE       = Alloy.CFG.IMG_PATH_SHARED + "form_switch_handle.png";
// Alloy.CFG.IMG_FORM_SWITCH_MASK         = Alloy.CFG.IMG_PATH_SHARED + "form_switch_mask.png";
// Alloy.CFG.IMG_FORM_SWITCH_LEFT         = Alloy.CFG.IMG_PATH_SHARED + "form_switch_left.png";
// Alloy.CFG.IMG_FORM_SWITCH_LEFT_ACTIVE  = Alloy.CFG.IMG_PATH_SHARED + "form_switch_left_active.png";
// Alloy.CFG.IMG_FORM_SWITCH_RIGHT        = Alloy.CFG.IMG_PATH_SHARED + "form_switch_right.png";
// Alloy.CFG.IMG_FORM_SWITCH_RIGHT_ACTIVE = Alloy.CFG.IMG_PATH_SHARED + "form_switch_right_active.png";
// Alloy.CFG.IMG_FORM_SWITCH_CHECKBOX_ON  = Alloy.CFG.IMG_PATH_SHARED + "form_checkbox_on.png";
// Alloy.CFG.IMG_FORM_SWITCH_CHECKBOX_OFF = Alloy.CFG.IMG_PATH_SHARED + "form_checkbox_off.png";
// Alloy.CFG.IMG_FORM_RADIO_ON            = Alloy.CFG.IMG_PATH_SHARED + "form_radio_on.png";
// Alloy.CFG.IMG_FORM_RADIO_OFF           = Alloy.CFG.IMG_PATH_SHARED + "form_radio_off.png";
// 
// Alloy.CFG.IMG_ICON_MORE       = Alloy.CFG.IMG_PATH_SHARED + "icon_more.png";
// Alloy.CFG.IMG_ICON_EXPAND     = Alloy.CFG.IMG_PATH_SHARED + "icon_expand.png";
// Alloy.CFG.IMG_ICON_COLLAPSE   = Alloy.CFG.IMG_PATH_SHARED + "icon_collapse.png";
// Alloy.CFG.IMG_ICON_TICK_OFF   = Alloy.CFG.IMG_PATH_SHARED + "icon_tick_off.png";
// Alloy.CFG.IMG_ICON_TICK_ON    = Alloy.CFG.IMG_PATH_SHARED + "icon_tick_on.png";
// Alloy.CFG.IMG_ICON_TICK_GREEN = Alloy.CFG.IMG_PATH_SHARED + "icon_tick_green.png";
// Alloy.CFG.IMG_ICON_QUESTION   = Alloy.CFG.IMG_PATH_SHARED + "icon_question.png";
// Alloy.CFG.IMG_ICON_PIN        = Alloy.CFG.IMG_PATH_SHARED + "icon_pin.png";
// Alloy.CFG.IMG_ICON_NEXT_WHITE = Alloy.CFG.IMG_PATH_SHARED + "icon_next_white.png";
// Alloy.CFG.IMG_ICON_PREV_WHITE = Alloy.CFG.IMG_PATH_SHARED + "icon_prev_white.png";
// Alloy.CFG.IMG_ICON_NEXT       = Alloy.CFG.IMG_PATH_SHARED + "icon_next.png";
// Alloy.CFG.IMG_ICON_PREV       = Alloy.CFG.IMG_PATH_SHARED + "icon_prev.png";
// 
// Alloy.CFG.IMG_CORNER_ALL    = Alloy.CFG.IMG_PATH_SHARED + "corner_all.png";
// Alloy.CFG.IMG_CORNER_TOP    = Alloy.CFG.IMG_PATH_SHARED + "corner_top.png";
// Alloy.CFG.IMG_CORNER_BOTTOM = Alloy.CFG.IMG_PATH_SHARED + "corner_bottom.png";
// 
// Alloy.CFG.IMG_EMPTYLIST_BG  = Alloy.CFG.IMG_PATH_SHARED + "emptylist_bg.png";
// 
// Alloy.CFG.IMG_DEFAULT_SPLASH = (OS_ANDROID) ? (Alloy.CFG.IMG_PATH_APP + "splash.png") : "/Default.png";
// Alloy.CFG.IMG_SAF_LOGO       = Alloy.CFG.IMG_PATH_SHARED + "logo.png";
// /*
// Alloy.CFG.IMG_TIMELINE_BAR_BOTTOM = Alloy.CFG.IMG_PATH_APP + "timeline_bar_bottom.png";
// Alloy.CFG.IMG_TIMELINE_BAR_TOP    = Alloy.CFG.IMG_PATH_APP + "timeline_bar_top.png";
// Alloy.CFG.IMG_TIMELINE_BOX_1      = Alloy.CFG.IMG_PATH_APP + "timeline_box_1.png";
// Alloy.CFG.IMG_TIMELINE_BOX_2      = Alloy.CFG.IMG_PATH_APP + "timeline_box_2.png";
// Alloy.CFG.IMG_TIMELINE_BOX_3      = Alloy.CFG.IMG_PATH_APP + "timeline_box_3.png";
// Alloy.CFG.IMG_TIMELINE_BOX_4      = Alloy.CFG.IMG_PATH_APP + "timeline_box_4.png";
// Alloy.CFG.IMG_TIMELINE_LABEL      = Alloy.CFG.IMG_PATH_APP + "timeline_label.png";
// Alloy.CFG.IMG_TIMELINE_MARKER     = Alloy.CFG.IMG_PATH_APP + "timeline_marker.png";
// 
// Alloy.CFG.IMG_BOOKLET_ICON_ATTENDANCE         = Alloy.CFG.IMG_PATH_APP + "booklet_icon_attendance.png";
// Alloy.CFG.IMG_BOOKLET_ICON_ATTENDANCE_OFFLINE = Alloy.CFG.IMG_PATH_APP + "booklet_icon_attendance_offline.png";
// Alloy.CFG.IMG_BOOKLET_ICON_AWARDS             = Alloy.CFG.IMG_PATH_APP + "booklet_icon_awards.png";
// Alloy.CFG.IMG_BOOKLET_ICON_AWARDS_OFFLINE     = Alloy.CFG.IMG_PATH_APP + "booklet_icon_awards_offline.png";
// Alloy.CFG.IMG_BOOKLET_ICON_IPPT               = Alloy.CFG.IMG_PATH_APP + "booklet_icon_ippt.png";
// Alloy.CFG.IMG_BOOKLET_ICON_IPPT_OFFLINE       = Alloy.CFG.IMG_PATH_APP + "booklet_icon_ippt_offline.png";
// Alloy.CFG.IMG_BOOKLET_ICON_OVERSEAS           = Alloy.CFG.IMG_PATH_APP + "booklet_icon_overseas.png";
// Alloy.CFG.IMG_BOOKLET_ICON_OVERSEAS_OFFLINE   = Alloy.CFG.IMG_PATH_APP + "booklet_icon_overseas_offline.png";
// Alloy.CFG.IMG_BOOKLET_ICON_PAY                = Alloy.CFG.IMG_PATH_APP + "booklet_icon_pay.png";
// Alloy.CFG.IMG_BOOKLET_ICON_PAY_OFFLINE        = Alloy.CFG.IMG_PATH_APP + "booklet_icon_pay_offline.png";
// Alloy.CFG.IMG_BOOKLET_ICON_PERMIT             = Alloy.CFG.IMG_PATH_APP + "booklet_icon_permit.png";
// Alloy.CFG.IMG_BOOKLET_ICON_PERMIT_OFFLINE     = Alloy.CFG.IMG_PATH_APP + "booklet_icon_permit_offline.png";


// Alloy.CFG.IMG_WEATHER_ICON_CLOUDY             = Alloy.CFG.IMG_PATH_APP + "weather_icon_cloudy.png";
// Alloy.CFG.IMG_WEATHER_ICON_FAIRDAY            = Alloy.CFG.IMG_PATH_APP + "weather_icon_fairday.png";
// Alloy.CFG.IMG_WEATHER_ICON_FAIRNIGHT          = Alloy.CFG.IMG_PATH_APP + "weather_icon_fairnight.png";
// Alloy.CFG.IMG_WEATHER_ICON_HAZY               = Alloy.CFG.IMG_PATH_APP + "weather_icon_hazy.png";
// Alloy.CFG.IMG_WEATHER_ICON_PARTLYCLOUDY       = Alloy.CFG.IMG_PATH_APP + "weather_icon_partlycloudy.png";
// Alloy.CFG.IMG_WEATHER_ICON_PASSINGSHOWERS     = Alloy.CFG.IMG_PATH_APP + "weather_icon_passingshowers.png";
// Alloy.CFG.IMG_WEATHER_ICON_RAIN               = Alloy.CFG.IMG_PATH_APP + "weather_icon_rain.png";
// Alloy.CFG.IMG_WEATHER_ICON_SHOWERS            = Alloy.CFG.IMG_PATH_APP + "weather_icon_showers.png";
// Alloy.CFG.IMG_WEATHER_ICON_THUNDERYSHOWERS    = Alloy.CFG.IMG_PATH_APP + "weather_icon_thunderyshowers.png";
// Alloy.CFG.IMG_WEATHER_ICON_WINDY              = Alloy.CFG.IMG_PATH_APP + "weather_icon_windy.png";
// 
// Alloy.CFG.IMG_WORKOUT_ICON_RUNNING            = Alloy.CFG.IMG_PATH_APP + "workout_icon_running.png";
// Alloy.CFG.IMG_WORKOUT_ICON_CYCLING            = Alloy.CFG.IMG_PATH_APP + "workout_icon_cycling.png";
// Alloy.CFG.IMG_WORKOUT_ICON_HIKING             = Alloy.CFG.IMG_PATH_APP + "workout_icon_hiking.png";
// Alloy.CFG.IMG_WORKOUT_ICON_KAYAK              = Alloy.CFG.IMG_PATH_APP + "workout_icon_kayak.png";
// Alloy.CFG.IMG_WORKOUT_ICON_OTHERS             = Alloy.CFG.IMG_PATH_APP + "workout_icon_others.png";
// Alloy.CFG.IMG_WORKOUT_ICON_ROLLERSKATE        = Alloy.CFG.IMG_PATH_APP + "workout_icon_rollerskate.png";
// Alloy.CFG.IMG_WORKOUT_ICON_SKATEBOARD         = Alloy.CFG.IMG_PATH_APP + "workout_icon_skateboard.png";
// Alloy.CFG.IMG_WORKOUT_ICON_SURFING            = Alloy.CFG.IMG_PATH_APP + "workout_icon_surfing.png";
// 
// Alloy.CFG.IMG_CIRCUIT_BICYCLES 				  	= Alloy.CFG.IMG_PATH_APP  + "circuit_bicycles.png";
// Alloy.CFG.IMG_CIRCUIT_RUSSION_TWIST 		  	= Alloy.CFG.IMG_PATH_APP  + "circuit_bodyweight_russian_twist.png";
// Alloy.CFG.IMG_CIRCUIT_BURPEES 				  	= Alloy.CFG.IMG_PATH_APP  + "circuit_burpees.png";
// Alloy.CFG.IMG_CIRCUIT_DIVE_BOMBER_PUSHUP 		= Alloy.CFG.IMG_PATH_APP  + "circuit_dive_bomber_pushups.png";
// Alloy.CFG.IMG_CIRCUIT_FLUTTER_FROGGERS			= Alloy.CFG.IMG_PATH_APP  + "circuit_flutter_froggers.png";
// Alloy.CFG.IMG_CIRCUIT_FLUTTER_KICKS 			= Alloy.CFG.IMG_PATH_APP  + "circuit_flutter_kicks.png";
// Alloy.CFG.IMG_CIRCUIT_FROGGERS_WITH_SWING 		= Alloy.CFG.IMG_PATH_APP  + "circuit_froggers_with_swing.png";
// Alloy.CFG.IMG_CIRCUIT_FROGGERS 					= Alloy.CFG.IMG_PATH_APP  + "circuit_froggers.png"; 
// Alloy.CFG.IMG_CIRCUIT_HIP_LIFTS 				= Alloy.CFG.IMG_PATH_APP  + "circuit_hip_lifts.png";
// Alloy.CFG.IMG_CIRCUIT_JUMPING_JACKS 			= Alloy.CFG.IMG_PATH_APP  + "circuit_jumping_jacks.png";
// Alloy.CFG.IMG_CIRCUIT_LUNGES 				  	= Alloy.CFG.IMG_PATH_APP  + "circuit_lunges.png";
// Alloy.CFG.IMG_CIRCUIT_MODIFFIED_TRICEP_PUSHUPS 	= Alloy.CFG.IMG_PATH_APP  + "circuit_modiffied_tricep_pushups.png";
// Alloy.CFG.IMG_CIRCUIT_MOUNTAIN_CLIMBERS 	 	= Alloy.CFG.IMG_PATH_APP  + "circuit_mountain_climbers.png";
// Alloy.CFG.IMG_CIRCUIT_SQUATS 				  	= Alloy.CFG.IMG_PATH_APP  + "circuit_squats.png";
// Alloy.CFG.IMG_CIRCUIT_T_PUSHUPS 				= Alloy.CFG.IMG_PATH_APP  + "circuit_t_pushups.png";
// 
// 
// 
// Alloy.CFG.IMG_MAP_INDICATOR_SAFRA            = Alloy.CFG.IMG_PATH_APP + "map_indicator_safra.png";
// Alloy.CFG.IMG_MAP_INDICATOR_FCC              = Alloy.CFG.IMG_PATH_APP + "map_indicator_fcc.png";
// Alloy.CFG.IMG_MAP_INDICATOR_APPICON          = Alloy.CFG.IMG_PATH_APP + "map_indicator_appicon.png";

// **Alloy.CFG.IMG_ACTIVITY_INDICATOR = [
	// "/images/activityIndicator/Loading1.png",
	// "/images/activityIndicator/Loading2.png",
	// "/images/activityIndicator/Loading3.png",
	// "/images/activityIndicator/Loading4.png",
// ];

// **font
Alloy.CFG.FONT_FAMILY_COMMON        = "Arial";
Alloy.CFG.FONT_FAMILY_IPHONE_NORMAL = 'Helvetica Neue 55 Roman';

// color
Alloy.CFG.COLOR_SIDEMENU_BG             = "#71918E";
Alloy.CFG.COLOR_SIDEMENU_CATEGORY_TITLE = "#CAD6D5";

Alloy.CFG.COLOR_VIEW_BG           = "#DCE0DE";
Alloy.CFG.COLOR_VIEW_CAPTION      = '#5C5050';
Alloy.CFG.COLOR_VIEW_DARK_BG      = '#321C1C';
Alloy.CFG.COLOR_VIEW_HIGHLIGHT_BG = "#EDEFD9";

// **CommonUI
// Alloy.CFG.UI_ROW_SELECTOR = "CommonUI/rowSelector";
// Alloy.CFG.UI_TAB_BAR      = "CommonUI/tabBar";
// Alloy.CFG.UI_TAB_BUTTON   = "CommonUI/tabButton";
// Alloy.CFG.UI_TABLE        = "CommonUI/table";
// Alloy.CFG.UI_TABLE_HEADER = "CommonUI/tableHeader";
// Alloy.CFG.UI_TABLE_ROW    = "CommonUI/tableRow";
// Alloy.CFG.UI_BOTTOM_BAR   = "CommonUI/bottomBar";
// Alloy.CFG.UI_BUTTON       = "CommonUI/button";
// Alloy.CFG.UI_TEXTFIELD    = "CommonUI/textField";
// Alloy.CFG.UI_TEXTAREA     = "CommonUI/textArea";
// Alloy.CFG.UI_CHECKBOX     = "CommonUI/checkBox";
// Alloy.CFG.UI_RADIO_BUTTON = "CommonUI/radioButton";
// Alloy.CFG.UI_ROW_READONLYTEXT = "CommonUI/rowReadOnlyText";
// Alloy.CFG.UI_PICKERS_TEXT = "CommonUI/Pickers/pickerText";
// Alloy.CFG.UI_PICKERS_DATE = "CommonUI/Pickers/pickerDate";
// Alloy.CFG.UI_VIEW_PDF     = "CommonUI/pageViewPDF";
// 
// Alloy.CFG.UI_VIEW_UI_CORNER  = "CommonUI/viewUICorner";
// Alloy.CFG.UI_TABLE_ROW_DUMMY = "CommonUI/tableRowDummy";
// Alloy.CFG.UI_VIEW_DUMMY      = "CommonUI/viewDummy";


// properties
Alloy.CFG.BASEVIEW_ANINMATE_SPEED     = 300;
// Alloy.CFG.BASEVIEW_ANINMATE_FINAL_POS = 260; //+ "dip"
Alloy.CFG.BASEVIEW_ANINMATE_FINAL_POS = screen_width*0.67;
Alloy.CFG.ONE_THIRD_PERCENTAGE        = (100 / 3) + "%";
Alloy.CFG.TWO_THIRD_PERCENTAGE        = ((100 / 3) * 2) + "%";
Alloy.CFG.VIEW_LOGIN_SCROLLABLE       = (Ti.Platform.Android && Ti.Platform.displayCaps.platformHeight < 500) ? true : false;
Alloy.CFG.SET_WINDOW_TOP_FOR_IOS_7    = (Alloy.Globals.IsIOS7()) ? "20dip" : 0;
Alloy.CFG.ROW_SELECTION_STYLE_NONE    = (Ti.Platform.Android) ? 0 : Ti.UI.iPhone.TableViewCellSelectionStyle.NONE;
Alloy.CFG.ROW_SELECTION_STYLE_DEFAULT = (Ti.Platform.Android) ? 0 : Ti.UI.iPhone.TableViewCellSelectionStyle.BLUE;
Alloy.CFG.PICKER_DATE_BOTTOM_POS      = (Ti.Platform.Android) ? -170 : "-70%";
Alloy.CFG.PICKER_TEXT_BOTTOM_POS      = (Ti.Platform.Android) ? -150 : "-70%";
Alloy.CFG.PICKER_ANIMATE_SPEED        = (Ti.Platform.Android) ? 300 : 400;
Alloy.CFG.TEXTFIELD_TEXT_BUFFER       = (Ti.Platform.Android) ? 0 : "10dip";
Alloy.CFG.FLIP_IMAGE                  = Alloy.Globals.ImageFlip();
Alloy.CFG.FLAG_MENU_TOUCHED           = false;
Alloy.CFG.FLAG_UNDER_MAINTENANCE      = false;

// text
Alloy.CFG.TEXT_DISCLAIMER = 
	"\nDisclaimer:\nThe user is reminded that he is logging into a program or data " +
	"that is used directly in connection with or necessary for the security, " + 
	"defence or international relations of Singapore. " + 
	"Any unauthorised access, use, modification, interception, or obstruction of use " +
	"(including such attempts) of the computer, program or data would attract an enhanced " +
	"penalty (for an offence involving protected computers) under the Computer Misuse Act. " +
	"If found guilty, an offender can be fined up to $100,000 and/or imprisoned up to 20 years. " +
	"If you are not authorised to use this system, do not log in or attempt to log in."+ "\n\n\n\n\n";

Alloy.CFG.TEXT_EXITPERMIT_DISCLAIMER = 
	"Under the Enlistment Act (Chapter 93), all male Singapore citizens and Permanent Residents aged 13 years " + 
	"and above are required to comply with the exit control regulation. \nPre-enlistees from aged 13 years, full-time " + 
	"National Servicemen, Regulars (who have not completed MTE) are required to apply for Exit Permit if they intend " + 
	"to travel or remain overseas for 3 months or longer. \nFor Regulars who completed their MTE and Operationally Ready " + 
	"National Servicemen (ie. NSmen), Exit Permit is required if they are travelling and remaining overseas for 6 months " + 
	"and longer in a single trip.\n\n";

//======[Circuit Training Exercise Description]=======	

	
Alloy.CFG.TEXT_CIRCUIT_TRAINING =
   "Are you in need of a full-body workout session, but lack the time to do so? Look no further, for this circuit trains "+
   "your entire body and challenges you to push yourself to the limit. And the best part? It only takes 20-30 mintues!";
   					  
Alloy.CFG.TEXT_CIRCUIT_TRAINING_1_LIST 		= ["MOUNTAIN CLIMBERS","FLUTTER KICKS","SQUATS","DIVE BOMBER PUSH-UPS","FROGGERS","BICYCLES","LUNGES","T PUSH-UPS"];
Alloy.CFG.TEXT_CIRCUIT_TRAINING_2_LIST 		= ["JUMPING JACKS","HIP LIFTS","MODIFIED TRICEP PUSH-UPS","FROGGERS WITH SWING","SQUATS","BODYWEIGHT RUSSION TWIST","DIVE BOMBER PUSH-UPS","BURPEES"];

//======[My Profile]=======
Alloy.CFG.MYPROFILE_ARRAY_AGE_CAT    = ["X (Below 25)", "Y (25 to 29)", "Y1 (30 to 34)", "Z (35 to 39)", "Z1 (40 to 44)", "Z2 (45 to 49)", "Z3 (50 and above)"];
Alloy.CFG.MYPROFILE_ARRAY_VOC        = ["Commando/Naval Diver", "Guardsman", "Combat", "Service"];
Alloy.CFG.MYPROFILE_ARRAY_ORD        = ["After 1 Apr 1994", "Before 1 Apr 1994"];

//Alloy.CFG.MYPROFILE_ARRAY_ALERT_BY   = ["None", "SMS", "Email"];
Alloy.CFG.MYPROFILE_ARRAY_ALERT_BY   = ["None", "SMS", "Email","Push Notification"];
Alloy.CFG.MYPROFILE_ARRAY_NO_OF_DAYS = ["1", "2", "3", "4", "5"];
Alloy.CFG.MYPROFILE_ARRAY_WEIGHT     = [["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]];
Alloy.CFG.MYPROFILE_ARRAY_HEIGHT     = [["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]];
Alloy.CFG.MYPROFILE_ARRAY_STOP_WATCH_VOICE_INTERVALS = ["10", "20", "30", "60"];
Alloy.CFG.MYPROFILE_ARRAY_DIST_REMINDER_INTERVALS = ["0.25", "0.5", "1", "2"];

//======[Feedback]=======
Alloy.CFG.FEEDBACK_ARRAY_PERS      = ["Pre-Enlistee", "NSF", "NSmen-MINDEF", "Regular", "Public", "Others"];
Alloy.CFG.FEEDBACK_ARRAY_SUBJECTS  = [
	"Feedback on MyIPPT", 
	"Feedback on IPPT"
];
Alloy.CFG.FEEDBACK_EMAIL_SUBJECT   = "MyIPPT Feedback";
Alloy.CFG.FEEDBACK_EMAIL_RECIPIETS = ['contact@ns.sg'];
Alloy.CFG.FEEDBACK_COMMENTS_LENGTH = 1500;
Alloy.CFG.FEEDBACK_COMMENTS_TITLE  = "Comments: (" + Alloy.CFG.FEEDBACK_COMMENTS_LENGTH + " characters left)";

//======[Navigationbar listener]=======
Alloy.CFG.NAVBAR_MENU_CLICK         = 0;
Alloy.CFG.NAVBAR_MENU_OPEN          = 1;
Alloy.CFG.NAVBAR_MENU_CLOSE         = 2;
Alloy.CFG.NAVBAR_BASE_ANIMATE_BEGIN = 3;
Alloy.CFG.NAVBAR_BASE_ANIMATE_END   = 4;

//======[App listener]=======
Alloy.CFG.APP_OPEN       = 0;
Alloy.CFG.APP_CLOSE      = 1;
Alloy.CFG.APP_PAUSE      = 2;
Alloy.CFG.APP_PAUSED     = 3;
Alloy.CFG.APP_RESUME     = 4;
Alloy.CFG.APP_RESUMED    = 5;
Alloy.CFG.APP_START      = 6;
Alloy.CFG.APP_STOP       = 7;
Alloy.CFG.ACTIVITY_START = 8;   
Alloy.CFG.ACTIVITY_STOP  = 9;

//======[Login]=======
Alloy.CFG.LOGIN_COMMON   = 0;
Alloy.CFG.LOGIN_PORTAL   = 1;
Alloy.CFG.LOGIN_SINGPASS = 2;

//======[ServiceNames]=======
// eSelfUpdate
Alloy.CFG.SERVICENAME_ESELFUPDATE_CHECK_ELIGIBILITY           = "NSP_WS_Selfupd_CheckEligibility";
Alloy.CFG.SERVICENAME_ESELFUPDATE_GET_SU_ITEMS                = "NSP_WS_Selfupd_GetSuItems";
Alloy.CFG.SERVICENAME_ESELFUPDATE_VERIFY_DOB_AND_SET_SU_ITEMS = "NSP_WS_Selfupd_VerifyDobAndSetSuItems";

// ippt
Alloy.CFG.SERVICENAME_IPPT_CHECK_BOOKING_ELIGIBLE  = "NSP_WS_IPPT_CheckBookingEligible";
Alloy.CFG.SERVICENAME_IPPT_GET_FCC_LIST            = "NSP_WS_IPPT_GetFccList";
Alloy.CFG.SERVICENAME_IPPT_GET_AVAILABLE_IPPT_SESS_DETAIL = "NSP_WS_IPPT_GetAvailableIpptSessDetail";
Alloy.CFG.SERVICENAME_IPPT_GET_BOOKED_IPPT         = "NSP_WS_IPPT_GetBookedIppt";
Alloy.CFG.SERVICENAME_IPPT_CANCEL_IPPT_SESS        = "NSP_WS_IPPT_CancelIpptSess";		
Alloy.CFG.SERVICENAME_IPPT_BOOK_IPPT_SESS_W_REM    = "NSP_WS_IPPT_BookIpptSess_wRem";
Alloy.CFG.SERVICENAME_IPPT_BOOK_IPT_SESS_W_REM     = "NSP_WS_IPPT_BookIptSess_wRem";
Alloy.CFG.SERVICENAME_IPPT_BOOK_RT_SESS_W_REM     = "NSP_WS_IPPT_BookRtSess_wRem";
Alloy.CFG.SERVICENAME_IPPT_GET_BOOKED_IPT          = "NSP_WS_IPPT_GetBookedIpt";
Alloy.CFG.SERVICENAME_IPPT_CANCEL_IPT_SESS         = "NSP_WS_IPPT_CancelIptSess";	
Alloy.CFG.SERVICENAME_IPPT_GET_AVAILABLE_IPT_SESS_DETAIL = "NSP_WS_IPPT_GetAvailableIptSessDetail";
Alloy.CFG.SERVICENAME_IPPT_GET_NEW_IPT_ATTENDANCE  = "NSP_WS_IPPT_GetNewIPTAttendance";	
Alloy.CFG.SERVICENAME_IPPT_GET_BOOKED_RT           = "NSP_WS_IPPT_GetBookedRt";
Alloy.CFG.SERVICENAME_IPPT_GET_NEW_RT_ATTENDANCE  = "NSP_WS_IPPT_GetNewRTAttendance";	
Alloy.CFG.SERVICENAME_IPPT_CANCEL_RT_SESS         = "NSP_WS_IPPT_CancelRtSess";	
Alloy.CFG.SERVICENAME_IPPT_GET_AVAILABLE_RT_SESS_DETAIL = "NSP_WS_IPPT_GetAvailableRtSessDetail";
Alloy.CFG.SERVICENAME_IPPT_GET_IPPT_RESULTS_DETAIL = "NSP_WS_IPPT_GetIPPTResultsDetail";

// nsconnect
Alloy.CFG.SERVICENAME_NSCONNECT_POST_WALL_MESSAGE = "NSP_WS_NSConnect_PostWallMessage";

// ns notification
Alloy.CFG.SERVICENAME_NSNOTIFY_DO_REGISTRATION    = "NSP_WS_NOTIFY_doRegistration";

//======[Resources]======= 
Alloy.CFG.RESOURCE_KEY              = "key";
Alloy.CFG.RESOURCE_LOGIN_TIMESTAMP  = "loginTimestamp";
Alloy.CFG.RESOURCE_LOGIN_CREDENTIAL = "loginCredential";

Alloy.CFG.RESOURCE_PROFILE_AUTO_SYNC_CALENDAR    = "profileAutoSyncCalendar";

Alloy.CFG.RESOURCE_EXISTING_ACTIVITY_HAS_SYNCED  = "existingActivityHasSynced";

Alloy.CFG.RESOURCE_MAINTENANCE_NOTICE              = "maintenanceNotice";

Alloy.CFG.RESOURCE_PROFILE                         = "resourceProfile";

Alloy.CFG.RESOURCE_IPT_WORKOUT                     = "resourceIPTWorkout";
Alloy.CFG.RESOURCE_RT_WORKOUT                      = "resourceRTWorkout";

Alloy.CFG.RESOURCE_WORKOUT_TIMER                   = "resourceWorkoutTimer";
Alloy.CFG.RESOURCE_WORKWOUT_CALENDAR_HISTORY       = "resourceWorkoutCalendarHistory";

Alloy.CFG.RESOURCE_IPPT_FFI_ACK_STATUS             = "resourceIPPTFFIAckStatus";

Alloy.CFG.RESOURCE_CALENDAR_STORED_IDS             = "resourceCalendarStoredIDs";
Alloy.CFG.RESOURCE_SYNC_ONCE                       = "resourceSyncOnce";
// due to background tracking for android, 
// service file is unable to access Alloy
Alloy.CFG.RESOURCE_FLAG_APP_RESUMED                  = "flagAppResumed";
Alloy.CFG.RESOURCE_FLAG_APP_INSTALLED                = "flagAppInstalled";
Alloy.CFG.RESOURCE_FLAG_APP_INSTALLED2               = "flagAppInstalled2";
//======[URLs]=======
Alloy.CFG.URL_USER_GUIDE_REMOTE  = "http://lifestyle.www.ns.sg/myippt/";
Alloy.CFG.URL_MAINTENANCE_NOTICE = "http://ns.sg/cs/content/content/miscellaneous/maintenance-page.html";

// Weather forecast
Alloy.CFG.URL_WEATHERFORECAST_PSI            = 'http://app2.nea.gov.sg/data/rss/nea_psi.xml';
Alloy.CFG.URL_WEATHERFORECAST_WEATHER_NOW    = 'http://www.weather.gov.sg/wip/pp/rndops/web/rss/rssNcast_NEW.xml';
Alloy.CFG.URL_WEATHERFORECAST_WEATHER_12HOUR = 'http://www.weather.gov.sg/wip/pp/rndops/web/rss/rssForecast_new.xml';

//======[Map annotations]======
// IPPT in your community
// Fitness Conditioning Centre (FCC) - 4 Main FCC
Alloy.CFG.MAP_ANNOTATION_IPPT_IN_YOUR_COMMUNITY_MAIN_FCC_LIST = 
[
	{latitude:1.42242, longitude:103.82591, title:'Khatib FCC (North)', subtitle:'', pincolor:Alloy.Globals.ANNOTATION_PURPLE, fbPageId: '114063545334685', email:'oc_khatibfcc@starnet.gov.sg', tel:'62100310'},
	{latitude:1.32983, longitude:103.77366, title:'Maju FCC (South)', subtitle:'', pincolor:Alloy.Globals.ANNOTATION_PURPLE, fbPageId: '138272186244125', email:'oc_majufcc@starnet.gov.sg', tel:'65590235'},
	{latitude:1.31815, longitude:103.95377, title:'Bedok FCC (East)', subtitle:'', pincolor:Alloy.Globals.ANNOTATION_PURPLE, fbPageId: '157379011094788', email:'oc_bedokfcc@starnet.gov.sg', tel:'65592073'},
	{latitude:1.39906, longitude:103.74259, title:'Kranji FCC (West)', subtitle:'', pincolor:Alloy.Globals.ANNOTATION_PURPLE, fbPageId: '134221643326605', email:'oc_kranjifcc@starnet.gov.sg', tel:'64272146'},
];






// workout tracker
Alloy.CFG.ARRAY_SPORT_TYPE = ["Running", "Cycling", "Hiking", "Kayaking", "Kite Surfing", "Roller Skating", "Skate Boarding"];


//======[Event tracking]=======

// workout tracker
Alloy.CFG.EVENT_TRACK_USE_WORKOUT_TRACKER = "Use Workout Tracker";
Alloy.CFG.EVENT_TRACK_ADD_WORKOUT_RECORD = "Add Personal Workout Record";
// ipt workout
Alloy.CFG.EVENT_TRACK_CREATE_IPT_WORKOUT = "Create IPT workout";
// rt workout
Alloy.CFG.EVENT_TRACK_CREATE_RT_WORKOUT = "Create RT workout";
// ippt in your community
Alloy.CFG.EVENT_TRACK_VIEW_IPPT_IN_YOUR_COMMUNITY = "View IPPT-In-Your-Community";
// bmi calculator
Alloy.CFG.EVENT_TRACK_USE_BMI = "Use BMI Calculator";
// weather forecst
Alloy.CFG.EVENT_TRACK_VIEW_WEATHER_FORECAST = "View Weather Forecast";
// manage ippt
Alloy.CFG.EVENT_TRACK_IPPT_CANCEL = "Cancel IPPT";
Alloy.CFG.EVENT_TRACK_IPPT_BOOK = "Book IPPT";
// ippt result
Alloy.CFG.EVENT_TRACK_VIEW_IPPT_RESULT = "View IPPT result";
// ippt scoreboard
Alloy.CFG.EVENT_TRACK_VIEW_IPPT_SCORE_TABLE = "View IPPT score table";
Alloy.CFG.EVENT_TRACK_USE_IPPT_CALCULATOR = "Use IPPT calculator";
Alloy.CFG.EVENT_TRACK_VIEW_PPT_STANDARD = "View PPT standard";

Alloy.CFG.EVENT_TRACK_VIEW_IPPT_THREE_STATION_SCORE_TABLE = "View IPPT 3 station score table";
Alloy.CFG.EVENT_TRACK_USE_IPPT_THREE_STATION_CALCULATOR  = "Use IPPT 3 station calculator";
//Alloy.CFG.EVENT_TRACK_VIEW_IPPT_FIVE_STATION_SCORE_TABLE = "View IPPT 5 station score table";
//Alloy.CFG.EVENT_TRACK_USE_IPPT_FIVE_STATION_CALCULATOR  = "Use IPPT 5 station calculator";
// manage rt
Alloy.CFG.EVENT_TRACK_RT_BOOK = "Book RT";
Alloy.CFG.EVENT_TRACK_RT_CANCEL = "Cancel RT";
Alloy.CFG.EVENT_TRACK_VIEW_RT_ATTENDANCE = "View RT attendance";
// manage ipt
Alloy.CFG.EVENT_TRACK_IPT_BOOK = "Book IPT";
Alloy.CFG.EVENT_TRACK_IPT_CANCEL = "Cancel IPT";
Alloy.CFG.EVENT_TRACK_VIEW_IPT_ATTENDANCE = "View IPT attendance";

// settings
Alloy.CFG.EVENT_TRACK_UPDATE_CONTACT    = "Update Contact";
Alloy.CFG.EVENT_TRACK_UPDATE_PROFILE    = "Update Profile";
Alloy.CFG.EVENT_TRACK_ACCESS_MY_PROFILE = "Access My Profile";
Alloy.CFG.EVENT_TRACK_VIEW_USER_GUIDE   = "View User Guide";
Alloy.CFG.EVENT_TRACK_SEND_FEEDBACK     = "Send Feedback";

//======[Version]=======
Alloy.CFG.VERSION_NUM_APP_STORE   = "2.1.5";//"2.1.4"
Alloy.CFG.VERSION_NUM_GOOGLE_PLAY = "2.1.6";//"2.1.4"
Alloy.CFG.VERSION_NUM_DEVELOPMENT = "23" + " (3.2.2)";


// android set to 2.1.5 on 30/10/2014
// for '+' sign fix and bold/blue text to eligibilty 
// android set to 2.1.6 on 04/11/2014
// iphone set to 2.1.5 for new cert
// for new cert
//======[WebService configuration]======= 
Alloy.CFG.ENDPOINT_AUTHENTICATE = {
	"staging":    "https://118.201.10.193/wsgauth/services/WsgAuthenticate",
	"production": "https://wsg.ns.sg/wsgauth/services/WsgAuthenticate"
};
Alloy.CFG.ENDPOINT_WEBSERVICE = {
	"staging":    "https://118.201.10.193/ecengine/services/NspService",
	"production": "https://wsg.ns.sg/ecengine/services/NspService"
};
Alloy.CFG.TARGET_NAMESPACE = {
	AUTHENTICATE: "http://ws.nsp.com",
	WEBSERVICE:   "http://wsl.nsp.ncs.com"
};

Alloy.CFG.BUILD = {
	DISTRIBUTION: 0,
	DEVELOPMENT: 1
};

Alloy.CFG.SERVER = {
	PRODUCTION: "production",
	STAGING: "staging",
	MOCK: "mock"
};
//production***  set to DISTRIBUTION , PRODUCTION


Alloy.CFG.ENABLE_FLURRY_ANALYTICS = true;
Alloy.CFG.APPLICATION_BUILD       = Alloy.CFG.BUILD.DEVELOPMENT;
Alloy.CFG.SERVER_TYPE             = Alloy.CFG.SERVER.STAGING;
Alloy.CFG.SERVER_ACCESS_TIMEOUT   = 15000;        // httpClient access timeout in ms
Alloy.CFG.SERVER_LOGIN_TIMEOUT    = (14 * 60000); // login timeout in min * 60000


