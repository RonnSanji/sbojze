var args = arguments[0] || {};

var dp_width_rate = Alloy.Globals.DP_WIDTH_RATE;
// if(Ti.Platform.osname == 'android')
// {
	// dp_width_rate = Titanium.Platform.displayCaps.platformWidth / Titanium.Platform.displayCaps.logicalDensityFactor / 720;
// }
// else{
	// dp_width_rate = Titanium.Platform.displayCaps.platformWidth / 720;
// }

$.tab_all_text.font = {
	fontSize:25*dp_width_rate,
	fontWeight:"normal",
};

$.tab_accepted_text.font = {
	fontSize:25*dp_width_rate,
	fontWeight:"normal",
};

$.tab_confirmed_text.font = {
	fontSize:25*dp_width_rate,
	fontWeight:"normal",
};

var init = function(){
	$.tab_all.backgroundColor = "#878787";
	$.tab_accepted.backgroundColor = "#FFFFFF";
	$.tab_confirmed.backgroundColor = "#FFFFFF";
	$.tab_all_text.color = "#FFFFFF";
	$.tab_accepted_text.color = "#000000";
	$.tab_confirmed_text.color = "#000000";
};

init();

//testing data
var activated = "all";
var application1 = {
	dateTime:"21-03-2015",
	status:"PROCESSING",
	salary:9.5,
	hotel:"Pan Pacific Hotel",
	period:"17:30 - 23:30",
};
var application2 = {
	dateTime:"23-03-2015",
	status:"PROCESSING",
	salary:10.5,
	hotel:"Amara Singapore",
	period:"17:30 - 23:30",
};
var application3 = {
	dateTime:"24-03-2015",
	status:"ACCEPTED",
	salary:8.5,
	hotel:"Amara Sanctuary Resort Sentosa",
	period:"17:30 - 23:30",
};
var application4 = {
	dateTime:"26-03-2015",
	status:"CONFIRMED",
	salary:8.5,
	hotel:"Ban HengPavilion",
	period:"17:30 - 23:30",
};
var application5 = {
	dateTime:"30-03-2015",
	status:"CONFIRMED",
	salary:11.5,
	hotel:"Four Seasons Hotel Singapore",
	period:"17:30 - 23:30",
};

var applications = [];
applications.push(application1);
applications.push(application2);
applications.push(application3);
applications.push(application4);
applications.push(application5);

var position = {
	image:"/images/hotel1.jpg",
	description:"Ah Yat Abalone Forum Restaurant",
	StartTime:"17:00",
	EndTime:"23:30",
	Salary:12,
	Vacancy:12,
	MaxVacancy:12,
};
//test data end

function addElement(application){
	
	var leftBackgroundColor = "#878787";
	if(application.status == "CONFIRMED"){
		leftBackgroundColor = "#4BCFED";
	}
	
	var leftTextColor = "#FFFFFF";
	if(application.status == "ACCEPTED"){
		leftTextColor = "#4BCFED";
	}
	
	var leftImage = "/images/sand26.png";
	if(application.status == "ACCEPTED"){
		leftImage = "/images/favourite24.png";
	}else if(application.status == "CONFIRMED"){
		leftImage = "/images/check64.png";
	}
	
	var Layer = Ti.UI.createView({
		width:"100%",
		height:150*dp_width_rate,
		layout:"horizontal",
		borderColor:"#878787",
		borderWidth:1,
	});
	
	var leftView = Ti.UI.createView({
		width:"30%",
		height:"100%",
		backgroundColor:leftBackgroundColor,
		layout:"vertical",
	});
	
	var middleView = Ti.UI.createView({
		width:"25%",
		height:"100%",
		backgroundColor:"#BABABA",
	});
	
	var rightView = Ti.UI.createView({
		width:"fill",
		height:"100%",
		backgroundColor:"#FFFFFF",
		// layout:"vertical",
	});
	
	var left_dateTime = Ti.UI.createLabel({
		top:"5%",
		text:application.dateTime,
		textAlign:"center",
		color:leftTextColor,
		font:{
			fontSize:28*dp_width_rate,
			fontWeight:"normal",
		},
	});
	
	var left_image = Ti.UI.createImageView({
		image:leftImage,
		width:60*dp_width_rate,
		height:60*dp_width_rate,
	});
	
	var left_Status = Ti.UI.createLabel({
		text:application.status,
		textAlign:"center",
		color:leftTextColor,
		font:{
			fontSize:20*dp_width_rate,
			fontWeight:"normal",
		},
	});
	
	var middle_Salary = Ti.UI.createLabel({
		text:"$"+application.salary,
		textAlign:"center",
		color:"#FFFFFF",
		font:{
			fontSize:55*dp_width_rate,
			fontWeight:"normal",
		},
	});
	
	var right_title = Ti.UI.createLabel({
		height:Ti.UI.SIZE,
		top:"10%",
		text:application.hotel,
		textAlign:"left",
		width:"90%",
		left:"5%",
		font:{
			fontSize:32*dp_width_rate,
			fontWeight:"normal",
		},
	});
	
	var right_period = Ti.UI.createLabel({
		height:Ti.UI.SIZE,
		bottom:"10%",
		text:application.period,
		textAlign:"left",
		width:"90%",
		left:"5%",
		font:{
			fontSize:25*dp_width_rate,
			fontWeight:"normal",
		},
		color:"#878787",
	});
	
	leftView.add(left_dateTime);
	leftView.add(left_image);
	leftView.add(left_Status);
	middleView.add(middle_Salary);
	rightView.add(right_title);
	rightView.add(right_period);
	
	Layer.add(leftView);
	Layer.add(middleView);
	Layer.add(rightView);
	
	Layer.addEventListener('click',function(){
		Alloy.Globals.ControllerManager.AddView(Alloy.CFG.PATH_DETAIL,Alloy.CFG.NAVPATH_DETAIL,{position:position});
	});
	return Layer;
}

var switchTab = function(tab){
	if(tab != activated){
		switch(tab){
			case "all":
				$.tab_all.backgroundColor = "#878787";
				$.tab_accepted.backgroundColor = "#FFFFFF";
				$.tab_confirmed.backgroundColor = "#FFFFFF";
				$.tab_all_text.color = "#FFFFFF";
				$.tab_accepted_text.color = "#000000";
				$.tab_confirmed_text.color = "#000000";
				activated = "all";
			break;
			case "accepted":
				$.tab_all.backgroundColor = "#FFFFFF";
				$.tab_accepted.backgroundColor = "#878787";
				$.tab_confirmed.backgroundColor = "#FFFFFF";
				$.tab_all_text.color = "#000000";
				$.tab_accepted_text.color = "#FFFFFF";
				$.tab_confirmed_text.color = "#000000";
				activated = "accepted";
			break;
			case "confirmed":
				$.tab_all.backgroundColor = "#FFFFFF";
				$.tab_accepted.backgroundColor = "#FFFFFF";
				$.tab_confirmed.backgroundColor = "#878787";
				$.tab_all_text.color = "#000000";
				$.tab_accepted_text.color = "#000000";
				$.tab_confirmed_text.color = "#FFFFFF";
				activated = "confirmed";
			break;
		}
	}
};

for(var i=0;i<applications.length;i++){
	$.body.add(addElement(applications[i]));
}

$.tab_all.addEventListener('click',function(){
	switchTab("all");
	$.body.removeAllChildren();
	for(var i=0;i<applications.length;i++){
		$.body.add(addElement(applications[i]));
	}
});
$.tab_accepted.addEventListener('click',function(){
	switchTab("accepted");
	$.body.removeAllChildren();
	for(var i=0;i<applications.length;i++){
		if(applications[i].status == "ACCEPTED"){
			$.body.add(addElement(applications[i]));
		}
	}
});
$.tab_confirmed.addEventListener('click',function(){
	switchTab("confirmed");
	$.body.removeAllChildren();
	for(var i=0;i<applications.length;i++){
		if(applications[i].status == "CONFIRMED"){
			$.body.add(addElement(applications[i]));
		}
	}
});
