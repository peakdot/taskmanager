var contextmenu;
var selectedElement;

$('nav .trigger').click(function(){
	$('nav').toggleClass('active');
});

function showContextMenu(x, y) {
	contextmenu.css('top', y);
	contextmenu.css('left', x);
	contextmenu.addClass('active');
}

function setCustomContextmenu(handler) {
	contextmenu = $('#context-menu');

	window.oncontextmenu = function () {
		return false;
	}

	$('body').click(function (){
		contextmenu.removeClass('active');
	})

	$('body').mousedown(function (e) {
		console.log('Checking');

		var isRightMB;
		e = e || window.event;

		if ("which" in e)
			isRightMB = e.which == 3; 
		else if ("button" in e) 
			isRightMB = e.button == 2; 

		if(isRightMB) {
			console.log('Recognized rightmb');
			handler(e);
		}
	});

}