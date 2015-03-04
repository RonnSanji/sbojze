
/*
 * Copyright: Activate Interactive
 * Date: March 01 2014
 * 
 * Title: viewSplash.js
 * Description: Splash page
 * 
 * ChangeLog: 
 * 
 * 
 * 
 */

//===========================================================================
// PROPERTIES
//===========================================================================	
//var urlPSI = Alloy.CFG.URL_WEATHERFORECAST_PSI;
//===========================================================================
// END OF PROPERTIES
//===========================================================================	

//===========================================================================
// FUNCTIONS
//===========================================================================
var UpdatePSI = function()
{
	if(!Titanium.Network.online || Titanium.Network.networkTypeName == 'NONE')
	{
		$.labelPSI.text = "Network not available.";
	}
	else
	{
		try
		{
			var xhr = Titanium.Network.createHTTPClient({
				timeout: 10000,
				onerror: function(e)
				{
					Alloy.Globals.Debug(JSON.stringify(e));
					$.labelPSI.text = "Error loading PSI. Try again later.";			
				},
				
				onload: function(e)
				{			
					var xml = this.responseXML;
					var doc = null;
					if(xml == null)
						doc = Ti.XML.parseString(this.responseData.toString());
					else
						doc = xml.documentElement;
					var channel = doc.getElementsByTagName('channel');
					if(channel != null && channel.length > 0) 
					{
					  	var isSuccess = false;
				    	var items = channel.item(0).getElementsByTagName('item');
				    	if(items.length > 0){
				    		var psi = items.item(0).getElementsByTagName('psi');
				    		if(psi.length > 0)
				    			isSuccess = true;
				    	}
				    	if(!isSuccess)
				    	{			    		
				    		$.labelPSI.text = "Error loading PSI. Try again later.";			    		
				    	}
				    	else
				    	{
				    		$.labelPSI.text = psi.item(0).text;
				    	}
				    }				
				},
			});
			xhr.open('GET', urlPSI);
			xhr.send();	
		}
		catch(e)
		{
			Alloy.Globals.Debug("Error on Update PSI");
			$.labelPSI.text = "Error loading PSI. Try again later.";
		}
		
	}
};
//===========================================================================
// END OF FUNCTIONS
//===========================================================================

//===========================================================================
// LOGICS
//===========================================================================	
//UpdatePSI();

Alloy.Globals.Debug($.getView().id + " created");
Alloy.CFG.REF_NAVIGATION_BAR.getView("btnAction").visible = false;
//===========================================================================
// END OF LOGICS
//===========================================================================	