(function() {
	var annulus = function(centerX, centerY,
		innerRadius, outerRadius,
		startAngle, endAngle,
		anticlockwise) {
		var th1 = startAngle * Math.PI / 180;
		var th2 = endAngle * Math.PI / 180;
		var startOfOuterArcX = outerRadius * Math.cos(th2) + centerX;
		var startOfOuterArcY = outerRadius * Math.sin(th2) + centerY;

		this.beginPath();
		this.arc(centerX, centerY, innerRadius, th1, th2, anticlockwise);
		this.lineTo(startOfOuterArcX, startOfOuterArcY);
		this.arc(centerX, centerY, outerRadius, th2, th1, !anticlockwise);
		this.closePath();
	}
	CanvasRenderingContext2D.prototype.annulus = annulus;
})();


var can = document.getElementById('canvas1'); 
var canvasW = can.width = document.body.clientWidth; 
var canvasH = can.height = document.body.clientHeight; 
var radius = Math.sqrt((canvasH*canvasH)/4 + (canvasW*canvasW)/4);
var radius2 = (canvasH>canvasW? canvasW:canvasH)/2;

function buildAreas(columns) {
	var degree = 270;
	for (var i = 0; i < columns.length; i++) {
		buildArea(degree, (degree += columns[i].degree) % 360, columns[i].color);
	}
}

function buildArea(startAngle, endAngle, fillStyle) {
	var ctx = can.getContext('2d');
	ctx.annulus(canvasW/2, canvasH/2, 100, radius2, startAngle, endAngle);
	ctx.fillStyle = fillStyle;
	ctx.fill();
}

var column1 = {
	degree: 72,
	name: "Looooooooooooong 1",
	description: "1 Deee  scrip tion aaaaaaaaaaa huuuuuuuuuuuu aaaaaaaaa",
	color: "red"
};

var column2 = {
	degree: 72,
	name: "Looooooooooooong 2",
	description: "2 Deee  scrip tion aaaaaaaaaaa huuuuuuuuuuuu aaaaaaaaa",
	color: "pink"
};

var column3 = {
	degree: 72,
	name: "Looooooooooooong 3",
	description: "3 Deee  scrip tion aaaaaaaaaaa huuuuuuuuuuuu aaaaaaaaa",
	color: "cyan"
};

var column4 = {
	degree: 72,
	name: "Looooooooooooong 3",
	description: "3 Deee  scrip tion aaaaaaaaaaa huuuuuuuuuuuu aaaaaaaaa",
	color: "green"
};

var column5 = {
	degree: 72,
	name: "Looooooooooooong 3",
	description: "3 Deee  scrip tion aaaaaaaaaaa huuuuuuuuuuuu aaaaaaaaa",
	color: "white"
};

var columns = [column1, column2, column3, column4, column5];
buildAreas(columns);
