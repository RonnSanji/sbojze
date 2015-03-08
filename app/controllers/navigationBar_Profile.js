var args = arguments[0] || {};

$.button1.addEventListener('click',function(){
	Ti.App.fireEvent('showMenu',{});
});