//PROPERTIES
var args = arguments[0] || {};

var dateStart = new Date();
var dateStartString = Alloy.Globals.commonFunc.formatDate(dateStart);
var dateEnd = new Date(dateStart.valueOf()+86400000*3);
var dateEndString = Alloy.Globals.commonFunc.formatDate(dateEnd);

$.fromDate.text = dateStartString;
$.toDate.text = dateEndString;

var picker;
//END OF PROPERTIES

//FORMAT
var dp_width_rate = Alloy.Globals.DP_WIDTH_RATE;

$.dateText.font = {
	fontSize:30*dp_width_rate,
	fontWeight:'normal',
};

$.salaryText.font = {
	fontSize:30*dp_width_rate,
	fontWeight:'normal',
};

$.AscendingText.font = {
	fontSize:30*dp_width_rate,
	fontWeight:'normal',
};

$.DecendingText.font = {
	fontSize:30*dp_width_rate,
	fontWeight:'normal',
};

$.fromTitle.font = {
	fontSize:40*dp_width_rate,
	fontWeight:'normal',
};

$.toTitle.font = {
	fontSize:40*dp_width_rate,
	fontWeight:'normal',
};

$.fromDate.font = {
	fontSize:40*dp_width_rate,
	fontWeight:'normal',
};

$.toDate.font = {
	fontSize:40*dp_width_rate,
	fontWeight:'normal',
};
//END OF FORMAT

//FUNCTION
var AddElement = function(position){
	var Layer = Ti.UI.createView({
		top:0,
		height:150*dp_width_rate,
		width:"100%",
		layout:"horizontal",
	});
	
	var LayerLeft = Ti.UI.createView({
		left:"5%",
		width:"60%",
		height:"100%",
	});
	
	var LayerRight = Ti.UI.createView({
		left:0,
		width:"35%",
		height:"100%",
		layout:"vertical",
	});
	
	var LeftText1 = Ti.UI.createLabel({
		left:0,
		width:"90%",
		top:"5%",
		text:position.hotel,
		textAlign:"left",
		font:{
			fontSize:36*dp_width_rate,
			fontWeight:"bold",
		},
		color:"#000000",
	});
	
	var LeftText2 = Ti.UI.createLabel({
		bottom:"2%",
		left:0,
		width:"90%",
		text:position.time,
		textAlign:"left",
		font:{
			fontSize:30*dp_width_rate,
			fontWeight:"bold",
		},
		color:"#999999",
	});
	
	var RightView = Ti.UI.createView({
		left:"2%",
		top:"15%",
		height:"70%",
		width:"55%",
		backgroundColor:"#4BCFED",
		borderRadius:5,
	});
	
	var RightText = Ti.UI.createLabel({
		text:"$"+position.salary,
		textAlign:"center",
		font:{
			fontSize:44*dp_width_rate,
			fontWeight:"bold",
		},
		color:"#FFFFFF",
	});
	
	var BottomBorder = Ti.UI.createView({
		height:1,
		left:"5%",
		width:"95%",
		backgroundColor:"#878787",
	});
	
	LayerLeft.add(LeftText1);
	LayerLeft.add(LeftText2);
	RightView.add(RightText);
	LayerRight.add(RightView);
	
	Layer.add(LayerLeft);
	Layer.add(LayerRight);
	$.jobList.add(Layer);
	$.jobList.add(BottomBorder);
};

var retrieveFromDate = function(e){
	if(e.value > dateEnd){
		alert("start date should be earlier than end date");
	}else{
		dateStart = e.value;
		dateStartString = Alloy.Globals.commonFunc.formatDate(dateStart);
		$.fromDate.text = dateStartString;
	}
	$.viewSearch.remove(picker);
};
var retrieveToDate = function(e){
	if(dateStart > e.value){
		alert("start date should be earlier than end date");
	}else{
		dateEnd = e.value;
		dateEndString = Alloy.Globals.commonFunc.formatDate(dateEnd);
		$.toDate.text = dateEndString;
	}
	$.viewSearch.remove(picker);
};
//END OF FUNCTION

//HANDLER
$.fromView.addEventListener('click',function(){
	picker = Alloy.createController(Alloy.CFG.PATH_DATEPICKER,{
		initValue:dateStart,
		callback:retrieveFromDate,
	}).getView("viewDatePicker");
	$.viewSearch.add(picker);
});

$.toView.addEventListener('click',function(){
	picker = Alloy.createController(Alloy.CFG.PATH_DATEPICKER,{
		initValue:dateEnd,
		callback:retrieveToDate,
	}).getView("viewDatePicker");
	$.viewSearch.add(picker);
});
//END OF HANDLER

//TEST
var positionList = [];
var position1 = {
	hotel:"Pan Pacific Hotel",
	time:"2015-03-12 17:00-23:00",
	salary:12,
};
var position2 = {
	hotel:"Amara Sanctuary Resort Sentosa",
	time:"2015-03-12 18:00-23:30",
	salary:13.5,
};
var position3 = {
	hotel:"Ban Heng Pavilion",
	time:"2015-03-14 16:00-23:30",
	salary:10,
};
var position4 = {
	hotel:"Copthorne King's Hotel Singapore",
	time:"2015-03-16 17:00-23:30",
	salary:9.5,
};
var position5 = {
	hotel:"Furama City Centre Singapore",
	time:"2015-03-20 19:00-23:30",
	salary:15,
};
var position6 = {
	hotel:"Pan Pacific Hotel",
	time:"2015-03-21 19:00-23:00",
	salary:12,
};
positionList.push(position1);
positionList.push(position2);
positionList.push(position3);
positionList.push(position4);
positionList.push(position5);
positionList.push(position6);

for(var i=0;i<positionList.length;i++){
	AddElement(positionList[i]);
}
//END OF TEST
