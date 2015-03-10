var args = arguments[0] || {};


var dp_width_rate;
if(Ti.Platform.osname == 'android')
{
	dp_width_rate = Titanium.Platform.displayCaps.platformWidth / Titanium.Platform.displayCaps.logicalDensityFactor / 720;
}
else{
	dp_width_rate = Titanium.Platform.displayCaps.platformWidth / 720;
}

function addPosition(position){
	
	var layer = Ti.UI.createView({
		width:"100%",
		height:200*dp_width_rate,
		layout:"horizontal",
		borderColor:"#999999",
		borderWidth:1,
	});
	
	var leftView = Ti.UI.createView({
		width:"26%",
		height:"100%",
		backgroundColor:"#FFFFFF",
	});
	
	var middleView = Ti.UI.createView({
		width:"47%",
		height:"100%",
		backgroundColor:"#FFFFFF",
		layout:"vertical",
	});
	
	var rightView = Ti.UI.createView({
		width:"fill",
		height:"100%",
		backgroundColor:"#808587",
		layout:"vertical",
	});
	
	var leftImage = Ti.UI.createImageView({
		image:position.image,
		width:170*dp_width_rate,
		height:170*dp_width_rate,
	});
	
	var middleDescription = Ti.UI.createLabel({
		top:"10%",
		width:"90%",
		text:position.description,
		textAlign:"left",
		font:{
			fontSize:28*dp_width_rate,
			fontWeight: 'bold',
		}
	});
	
	var middlePeriod = Ti.UI.createView({
		top:0,
		layout:"horizontal",
		width:"100%",
		height:"30%",
	});
	
	var middlePeriod_image = Ti.UI.createImageView({
		left:"2%",
		image:"/images/clock169.png",
		width:60*dp_width_rate,
		height:60*dp_width_rate,
	});
	
	var middlePeriod_content = Ti.UI.createLabel({
		left:"5%",
		text:position.StartTime + " - " + position.EndTime,
		textAlign:"left",
		width:"fill",
		font:{
			fontSize:28*dp_width_rate,
			fontWeight: 'normal',
		}
	});
	
	var rightSalary = Ti.UI.createView({
		layout:"horizontal",
		top:"6%",
		height:"32%",
		width:"100%",
	});
	
	var rightVacancy = Ti.UI.createView({
		layout:"horizontal",
		top:0,
		height:"32%",
		width:"100%",
	});
	
	var rightBottom = Ti.UI.createView({
		layout:"horizontal",
		top:0,
		height:"fill",
		width:"100%",
	});
	
	var rightSalaryImage = Ti.UI.createImageView({
		left:"8%",
		image:"/images/dollar103.png",
		width:50*dp_width_rate,
		height:50*dp_width_rate,
	});
	
	var rightSalaryText = Ti.UI.createLabel({
		left:"7%",
		text:position.Salary + "/h",
		textAlign:"left",
		width:"fill",
		color:"#FFFFFF",
		font:{
			fontSize:34*dp_width_rate,
			fontWeight: 'bold',
		}
	});
	
	var rightVacancyImage = Ti.UI.createImageView({
		left:"8%",
		image:"/images/waiter3.png",
		width:50*dp_width_rate,
		height:50*dp_width_rate,
	});
	
	var rightVacancyText = Ti.UI.createLabel({
		left:"7%",
		text:position.Vacancy + "/" + position.MaxVacancy,
		textAlign:"left",
		color:"#FFFFFF",
		width:"fill",
		font:{
			fontSize:34*dp_width_rate,
			fontWeight: 'bold',
		}
	});
	
	var rightBottomLock = Ti.UI.createImageView({
		left:"5%",
		image:"/images/padlock71.png",
		width:50*dp_width_rate,
		height:50*dp_width_rate,
	});
	
	var rightBottomHeart = Ti.UI.createImageView({
		left:"5%",
		image:"/images/like80.png",
		width:50*dp_width_rate,
		height:50*dp_width_rate,
	});
	
	var rightBottomLetter = Ti.UI.createImageView({
		left:"5%",
		image:"/images/envelope54.png",
		width:50*dp_width_rate,
		height:50*dp_width_rate,
	});
	
	leftView.add(leftImage);
	middlePeriod.add(middlePeriod_image);
	middlePeriod.add(middlePeriod_content);
	middleView.add(middleDescription);
	middleView.add(middlePeriod);
	rightSalary.add(rightSalaryImage);
	rightSalary.add(rightSalaryText);
	rightVacancy.add(rightVacancyImage);
	rightVacancy.add(rightVacancyText);
	rightBottom.add(rightBottomLock);
	rightBottom.add(rightBottomHeart);
	rightBottom.add(rightBottomLetter);
	rightView.add(rightSalary);
	rightView.add(rightVacancy);
	rightView.add(rightBottom);
	
	layer.add(leftView);
	layer.add(middleView);
	layer.add(rightView);
	
	layer.addEventListener('click',function(){
		Alloy.Globals.ControllerManager.AddView(Alloy.CFG.PATH_DETAIL,Alloy.CFG.NAVPATH_DETAIL,{position:position});
	});
	// $.body.add(layer);
	return layer;
}

function addPositionsByDate(date,positionList){	
	var dateHeight = 60*dp_width_rate;
	var contentHeight = positionList.length * 200 *dp_width_rate;
	
	var block = Ti.UI.createView({
		width:"100%",
		height:contentHeight+dateHeight,
		layout:"vertical",
	});
	
	var dateLayer = Ti.UI.createView({
		top:0,
		width:"100%",
		height:dateHeight,
		backgroundColor:"#555555",
	});
	
	var contentLayer = Ti.UI.createView({
		top:0,
		layout:"vertical",
		width:"100%",
		height:contentHeight,
	});
	
	var dateLabel = Ti.UI.createLabel({
		text:date,
		textAlign:"center",
		width:"100%",
		color:"#FFFFFF",
		font:{
			fontSize:32*dp_width_rate,
			fontWeight:"bold",
		}
	});
		
	for(var i=0;i<positionList.length;i++){
		contentLayer.add(addPosition(positionList[i]));
	}
	dateLayer.add(dateLabel);
	
	dateLayer.addEventListener('click',function(){
		if(block.height == dateHeight){
			block.height = contentHeight + dateHeight;
		}else{
			block.height = dateHeight;
		}
	});
	
	block.add(dateLayer);
	block.add(contentLayer);
	$.body.add(block);
}

// addPositionsByDate();
// addPositionsByDate();

var position1 = {
	image:"/images/hotel1.jpg",
	description:"Ah Yat Abalone Forum Restaurant",
	StartTime:"17:00",
	EndTime:"23:30",
	Salary:12,
	Vacancy:12,
	MaxVacancy:12,
};

var position2 = {
	image:"/images/hotel2.jpg",
	description:"Conrad Centennial Singapore",
	StartTime:"18:00",
	EndTime:"00:30",
	Salary:16,
	Vacancy:12,
	MaxVacancy:24,
};

var position3 = {
	image:"/images/hotel3.jpg",
	description:"Pan Pacific Hotel",
	StartTime:"17:00",
	EndTime:"00:30",
	Salary:16,
	Vacancy:12,
	MaxVacancy:24,
};

var positionList1 = [];
positionList1.push(position1);
positionList1.push(position2);
positionList1.push(position3);
var date1 = "TODAY-03/03/2015";

var position4 = {
	image:"/images/hotel4.jpg",
	description:"Fu Lin Men Chinese Restaurant",
	StartTime:"17:00",
	EndTime:"00:30",
	Salary:16,
	Vacancy:12,
	MaxVacancy:24,
};

var position5 = {
	image:"/images/hotel2.jpg",
	description:"Conrad Centennial Singapore",
	StartTime:"18:00",
	EndTime:"00:30",
	Salary:16,
	Vacancy:12,
	MaxVacancy:24,
};

var position6 = {
	image:"/images/hotel3.jpg",
	description:"Pan Pacific Hotel",
	StartTime:"17:00",
	EndTime:"00:30",
	Salary:16,
	Vacancy:12,
	MaxVacancy:24,
};

var positionList2 = [];
positionList2.push(position4);
positionList2.push(position5);
positionList2.push(position6);
var date2 = "TOMORROW-03/04/2015";

addPositionsByDate(date1,positionList1);
addPositionsByDate(date2,positionList2);