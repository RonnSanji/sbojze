
/*
 * Copyright: Activate Interactive
 * Date: March 01 2014
 * 
 * Title: AlertMsg.js
 * Description: Messages for alert prompt
 * 
 * ChangeLog: 
 * 
 * 
 */

//===========================================================================
// MODULE DECLARACTION
//===========================================================================
function AlertMsg(){}
module.exports = AlertMsg;
//===========================================================================
// END OF ODULE DECLARACTION
//===========================================================================


//===========================================================================	
// EXPORTS
//===========================================================================
// exit program
module.exports.EXIT_PROGRAM_CONFIRMATION = "Are you sure?";

// login view
module.exports.LOGIN_INVALID_USERNAME_PASSWORD = "You have keyed in an invalid NS Portal ID or Password.\nPlease try again.";
module.exports.LOGIN_INVALID_NRIC_DOB          = "You have keyed in an invalid NRIC or Date of Birth.\nPlease try again.";
module.exports.LOGIN_SINGPASS_FAILED           = "Singpass login failed.";

// logout
module.exports.LOGOUT_CONFIRMATION = "Confirm logout?";

// webservice
module.exports.WEBSERVICE_ERROR = "Service is currently unavailable.\nPlease try again later.";
module.exports.WEBSERVICE_AUTHENTICATION_EXPIRED = "Login session has expired.\nReloading.";

// BMI Calculator
module.exports.BMICALCULATOR_ZERO_VALUE = "Your Height or Weight can not be zero.";

// Feedback
module.exports.FEEDBACK_INVALID_NRIC        = "NRIC is invalid.";
module.exports.FEEDBACK_INVALID_EMAIL       = "Email is invalid.";
module.exports.FEEDBACK_INVALID_TEL         = "Telephone number is invalid.";
module.exports.FEEDBACK_EMAIL_NOT_SUPPORTED = "Email client not available.";
module.exports.FEEDBACK_EMAIL_SEND_FAIL     = "Error sending email."; 

// IPT Workout
module.exports.IPT_WORKOUT_DELETE_CONFIRMATION = "Confirm to delete?";
module.exports.IPT_WORKOUT_ADD_WORKOUT_SUCCESS = "Create IPT Workout Success!";

// RT Workout
module.exports.RT_WORKOUT_DELETE_CONFIRMATION = "Confirm to delete?";
module.exports.RT_WORKOUT_ADD_WORKOUT_SUCCESS = "Create RT Workout Success!";

// Workout tracker
module.exports.WORKOUT_TRACKER_SHARE_CONFIRMATION = "Share Run on ?";
module.exports.WORKOUT_TRACKER_DELETE_CONFIRMATION  = "Are you sure?";
module.exports.WORKOUT_TRACKER_ADD_WORKOUT_SUCCESS = "Create Entry Success!";


// IPPT-In-Your-Community
module.exports.IPPT_IN_YOUR_COMMUNITY_EMPTY_PLACE = "Unable to retrieve places near your current location.";
module.exports.IPPT_IN_YOUR_COMMUNITY_POST_SUCCESS = "Message posted successfully.";
module.exports.IPPT_IN_YOUR_COMMUNITY_POST_FAIL    = "Fail to Post message, Please try again.";
module.exports.IPPT_IN_YOUR_COMMUNITY_CALL_TEL_CONFIRMATION = "Press OK to start dialing.";

module.exports.IPPT_SCOREBOARD_DATA_NOT_SET = "Age Category, Vocation and ORD date must be set in order to retrieve information.";

// manage ippt
module.exports.IPPT_DATES_NOT_SELETCED   = "Please select the date.";
module.exports.IPPT_FCC_NOT_SELETCED     = "Please select at least one venue.";
module.exports.IPPT_SESSION_NOT_SELETCED = "Please select a session.";
module.exports.IPPT_FFI_ACKNOWLEDGEMENT  = "I acknowledge that it is my responsibility to clear my FFI before attending my IPPT/IPT/RT session.";
module.exports.IPPT_CANCEL_CONFIRMATION  = "Are you sure?";
module.exports.IPPT_CANCEL_SUCCESS       = "Booked session has been successfully cancelled.";

module.exports.IPPT_FCC_LIST_EMPTY       = "No FCC venue available.";
module.exports.IPPT_SESSION_LIST_EMPTY   = "No session available.";

// manage ipt
module.exports.IPPT_IPT_OPT_IN_PHASE_NOTICE = "You are currently in RT phase. You have the option to opt-in to IPT by $dateOptIn. " 
												+ "Please note that you cannot change back to RT once you have made a confirmation " 
												+ "of IPT / SAFRA E1 PEP booking.";

module.exports.IPPT_IPT_ATTENDANCE_EMPTY    = "No IPT attendance available.";

module.exports.IPPT_RT_ATTENDANCE_EMPTY    = "No RT attendance available.";

// update contact
module.exports.UPDATE_CONTACT_SUCCESSFUL   = "Update success!";




// my profile
module.exports.MYPROFILE_BG_TRACKING_NOTICE                    = "Please note that once the feature is enabled, it will continue to run ";
																	+ "in the background when app is not in use.";
// userguides
module.exports.USERGUIDE_NO_NETWORK                            = "An internet connection is needed to load the user guide.";
module.exports.USERGUIDE_LOAD_ERROR                            = "Unable to load user guide, please try again later.";

// maintainance notice
module.exports.MAINTENANCE_NOTICE                              = "From $dteStart $timeStart to $dteEnd $timeEnd,\n$remarks";	


// app disclaimer
module.exports.APP_DISCLAIMER                                  = 'Please note that \"Manage IPPT, Manage IPT and Manage RT\" features are'
		   														 + ' accessible only to Singapore Armed Forces (SAF) National Servicemen.';

module.exports.APP_IMPT_NEWS                                   = 'Please note the following enhancement to increase the flexibility of NSmen in booking for their IPPT activities:'
																 + '\n- additional lunch hour IPT sessions on Tuesday and Thursdays.'
																
																 + '\n- additional weekend morning IPT and RT sessions.'
																
																 + '\n- booking/cancellation before 0000hrs for morning/afternoon sessions.'
																
																 + '\n- booking/cancellation before 1200hrs for evening sessions.';


// calendar sync
module.exports.CALENDAR_SYNC_ACCESS_NOT_ALLOWED                 = "Access to calendar is not allowed";
module.exports.CALENDAR_SYNC_EXISTING_ACTIVITIES                = "Do you want to sync existing activities to calendar?";
module.exports.CALENDAR_SYNC_NEW_ACTIVITIES                     = "Do you want to sync to calendar?";

// misc
module.exports.NO_PDF_VIEWER = "No PDF Viewer found.";
module.exports.NO_NETWORK    = "No network connection is found. An internal connection is required to proceed.";
module.exports.NO_EMAIL_CLIENT = "Email is not available.";
module.exports.EMAIL_SENT     = "Email is successfully sent.";
module.exports.EMAIL_NOT_SENT = "Email is not sent.";

// geolocation
module.exports.LOCATION_ACCESS_DENIED = "Your location service is turned off.\nPlease enable it in the phone's setting.";
module.exports.TranslateGeolocationErrorCode = function(code, error)
{
	switch(code)
	{
		case Ti.Geolocation.ERROR_LOCATION_UNKNOWN:
			return "Location service is currently unavailable.";
		case Ti.Geolocation.ERROR_DENIED:
			return "Location service is off. Please turn it on for usage of this feature.";
		case Ti.Geolocation.ERROR_NETWORK:
			return "Location service is currently unavailable.";
		case Ti.Geolocation.ERROR_HEADING_FAILURE:
			return 'Failure to detect heading';
		case Ti.Geolocation.ERROR_REGION_MONITORING_DENIED:
			return 'Region monitoring access denied';
		case Ti.Geolocation.ERROR_REGION_MONITORING_FAILURE:
			return 'Region monitoring access failure';
		case Ti.Geolocation.ERROR_REGION_MONITORING_DELAYED:
			return 'Region monitoring setup delayed';
		default:
			if(error)
				return error;
			else
				return "Location service is off. Please turn it on for usage of this feature.";
	}
};
//===========================================================================	
// END OF EXPORTS
//===========================================================================