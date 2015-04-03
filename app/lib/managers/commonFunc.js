var addLeadZero = function(data) {
	if (String(data).length == 1)
		return '0' + String(data);
	else
		return String(data);
};

exports.formatDate = function(date){
	var day;
	switch(date.getDay()){
		case 0:
		day = "Sun";
		break;
		
		case 1:
		day = "Mon";
		break;
		
		case 2:
		day = "Tue";
		break;
		
		case 3:
		day = "Wed";
		break;
		
		case 4:
		day = "Thu";
		break;
		
		case 5:
		day = "Fri";
		break;
		
		case 6:
		day = "Sat";
		break;
	}
	
	var month = "";
	switch(date.getMonth()){
		case 0:
			month = "Jan";
			break;
		case 1:
			month = "Feb";
			break;
		case 2:
			month = "Mar";
			break;
		case 3:
			month = "Apr";
			break;
		case 4:
			month = "May";
			break;
		case 5:
			month = "Jun";
			break;
		case 6:
			month = "Jul";
			break;	
		case 7:
			month = "Aug";
			break;
		case 8:
			month = "Sep";
			break;
		case 9:
			month = "Oct";
			break;
		case 10:
			month = "Nov";
			break;
		case 11:
			month = "Dec";
			break;
	}
	
	var selectedDate = addLeadZero(date.getDate());
	return day + ", "+month+"-"+selectedDate+"-"+date.getFullYear();
};