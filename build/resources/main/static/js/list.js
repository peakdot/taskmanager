var container = $('#container');
var docHeight = container.outerHeight(), docWidth = container.outerWidth();

var boardmenu = $('#board-menu');

var boardPicker = $('#board-picker');
var draggedBoard;
var areaPresenter = $('#area-presenter');
var cellWidth = docWidth/16, cellHeight = docHeight/16;

var availabilityMap = [];
var currentX = -1, currentY = -1, available = false;

$('.edit').click(function () {
	gotoEditMode();
});

setCustomContextmenu(function (e) {
	var board = $(document.elementFromPoint(e.clientX, e.clientY));
	console.log(board);
	console.log(board.parents('#container>.board'));
	if(board.parents('#container>.board').length > 0) {
		showContextMenu(board, e.clientX, e.clientY);
	}
});

function buildBoards() {
	for (var i = 0; i < boards.length; i++) {
		var board = $('<div class="board unselectable"><div class="board-body unselectable"><div class="board-add"><i class="material-icons md-dark unselectable">add</i></div><div class="board-name"></div></div><div class="board-name"></div></div>');
		board.attr('boardId', i);
		var boardBody = board.find('.board-body');
		boardBody.attr('style', boards[i].style);
		//To the board picker
		board.find('.board-name').html(boards[i].name);
		if(boards[i].list.length == 1) {
			boardBody.append(boards[i].list[0]);
		} else {
			var ul = $('<ul></ul>');
			for (var j = 0; j < boards[i].list.length; j++) {
				ul.append('<li>' + boards[i].list[j] + '</li>');
			}
			boardBody.append(ul);
		}
		var boardwidth = boards[i].width * cellWidth - 10, boardheight = boards[i].height * cellHeight - 10;
		boardBody.css('width', boardwidth);
		boardBody.css('height', boardheight);

		if(boards[i].posx == null || boards.posy == null) {
			addBoardToPicker(board, boardwidth, boardheight);

		} else {
			//To the container
			board.css('top', boards[i].posy*cellHeight);
			board.css('left', boards[i].posx*cellWidth);
			container.append(board);
		}
	}
}

function gotoEditMode() {
	boardPicker.addClass('active');
	$('.edit').addClass('switched');
	$('.edit').click(gotoNormalMode);
	$('.edit i').html('done');
	$('nav').addClass('active');
}

function gotoNormalMode() {
	boardPicker.removeClass('active');
	$('.edit').removeClass('switched');
	$('.edit').click(gotoEditMode);
	$('.edit i').html('edit');
}

function dragBoardFromContainer() {
	console.log('Dragged board from container');

	draggedBoard = $(this);
	draggedBoard.addClass('dragging');
	draggedBoard.css('transition', 'none');
	var board = boards[draggedBoard.attr('boardId')];
	for (var i = board.posx; i < board.posx + board.width; i++) {
		for (var j = board.posy; j < board.posy + board.height; j++) {
			if(availabilityMap[i] == undefined) {
				availabilityMap[i] = [];
			}
			availabilityMap[i][j] = false;
		}
	}
	container.mousemove(dragBoard);
	container.mouseup(dropBoard);
	boardPicker.removeClass('active');
}

function dragBoardFromPicker(e) {
	console.log('Dragged board from picker');
	e.stopPropagation();

	draggedBoard = $(this);

	var offset = draggedBoard.offset();

	draggedBoard.css('top', offset.top);
	draggedBoard.css('left', offset.left);
	draggedBoard.addClass('dragging');
	draggedBoard.css('transition', 'none');
	draggedBoard.find('.board-body').css('transform', 'scale(1) translate(0, 0)');
	container.mousemove(dragBoard);
	container.mouseup(dropBoard);
	boardPicker.removeClass('active');
	draggedBoard.appendTo(container);
}

function dragBoard(e) {
	var x = Math.floor(e.clientX/cellWidth);
	var y = Math.floor(e.clientY/cellHeight);
	if(x != currentX || y != currentY) {
		var id = draggedBoard.attr('boardId');
		console.log('x=' + x + ', ' + 'y=' + y + ' clientx=' + e.clientx + ', ' + 'clienty=' + e.clientY);
		if(checkAvailability(x, y, id)) {
			draggedBoard.css('top', y * cellHeight + 10);
			draggedBoard.css('left', x * cellWidth + 10);
			draggedBoard.css('width', boards[id].width * cellWidth - 10);
			draggedBoard.css('height', boards[id].height * cellHeight - 10);
			draggedBoard.addClass('active');
			draggedBoard.removeClass('notavailable');
			available = true;
			currentX = x;
			currentY = y;
		} else {
			currentX = x;
			currentY = y;
			available = false;
			draggedBoard.css('top', y * cellHeight + 10);
			draggedBoard.css('left', x * cellWidth + 10);
			draggedBoard.removeClass('active');
			draggedBoard.addClass('notavailable');
		}
	}
	console.log('Dragging board: Y=' + draggedBoard.outerHeight());
}

function dropBoard(e) {
	draggedBoard.removeClass('dragging');
	container.unbind('mousemove');
	container.unbind('mouseup');

	if(available) {
		var board = boards[draggedBoard.attr('boardId')];
		for (var i = currentX; i < currentX + board.width; i++) {
			for (var j = currentY; j < currentY + board.height; j++) {
				if(availabilityMap[i] == undefined) {
					availabilityMap[i] = [];
				}
				availabilityMap[i][j] = true;
			}
		}
		board.posx = currentX;
		board.posy = currentY;
		draggedBoard.unbind('mousedown');
		draggedBoard.find('.board-add').mousedown(addinputtolist);
		draggedBoard.mousedown(dragBoardFromContainer);
	} else {	
		addBoardToPicker(draggedBoard);
	}
	draggedBoard = null;
	boardPicker.addClass('active');
}

function addBoardToPicker(board, boardwidth = -1, boardheight = -1) {
	console.log(board);
	var boardbody = board.find('.board-body');
	console.log(boardbody, boardwidth, boardheight);
	if(boardwidth == -1 || boardheight == -1) {
		boardheight = Number(boardbody.css('height'));
		boardwidth = Number(boardbody.css('width'));
	}
	console.log(boardbody, boardwidth, boardheight);

	var maxlength = boardwidth>boardheight? boardwidth:boardheight;
	var scale = 70/maxlength;

	console.log('translate(-' + boardwidth/2 + 'px, -' + boardheight/2 + 'px) scale(' + scale + ')');
	console.log('width' + boardwidth + ' height' + boardheight);

	board.attr('style', '');
	boardbody.css('transform', 'translate(-' + boardwidth/2 + 'px, -' + boardheight/2 + 'px) scale(' + scale + ')');
	board.removeClass('notavailable');
	board.unbind('mousedown');
	board.mousedown(dragBoardFromPicker);
	board.appendTo(boardPicker);
	available = false;
}

function checkAvailability(x, y, boardId) {
	var board = boards[boardId];
	var result = true;

	if(x + board.width > 16 || y + board.height > 16) {
		return false;
	} 

	for (var i = x; i < x + board.width; i++) {
		if(result) {
			for (var j = y; j < y + board.height; j++) {
				if(availabilityMap[i] != undefined && availabilityMap[i][j]) {
					result = false;
					break;
				}
			}
		} else {
			break;
		}
	}

	return result;
}

function addinputtolist(e) {
	e.stopPropagation();

	var board = $(this).parents('.board');
	var input = $('<input boardid="' + board.attr('boardid') + '" type="text"/>');

	board.find('ul').append(input);	

	input.wrap('<li></li>');
	input.keydown(listinputhandler);
}

function listinputhandler(event) {
	if((event.which == 32 || event.which == 13) && this.value != '') {
		addtoboard($(this).attr('boardid'), this.value);
		$(this).remove();
		event.preventDefault();
	} else if(String.fromCharCode(event.which).search(/[a-zA-Z0-9_]/) == -1){
		event.preventDefault();
	}
}

function addtoboard(boardid, name) {
	var item = new Object();
	var board = boards[boardid];
	item.name = name;

	//Need to be checked in server
	item.type = board.type;

	if(board.type == 0) {
		item.tags = board.opt.tags;
		item.goalid = board.opt.goalid;
		item.timerange = board.opt.timerange;
		item.iteration = board.opt.timerange.length;
		item.deadline = board.opt.deadline;
		item.duration = board.opt.duration.min;
	} else if (board.type == 1) {
		item.tags = board.opt.tags;
		item.goalid = board.opt.goalid;
		item.timerange = board.opt.timerange;
	}

	request = $.ajax({
		url: 'blockmodel.php',
		type: 'post',
		contentType: 'application/json',
		data: item
	});

	// Callback handler that will be called on success
	request.done(function (response, textStatus, jqXHR){
		console.log(response);
	});

	// Callback handler that will be called on failure
	request.fail(function (jqXHR, textStatus, errorThrown){
		// Log the error to the console
		console.error("Connection Failed");
	});	
}

var board1 = {
	posx: null,
	posy: null,
	minwidth: 3,
	minheight: 4,
	width: 3,
	height: 4,
	style: 'font-size: 12px',
	name: 'Board Name',
	list: ['Todo 1', 'Todo 2', 'Todo 3', 'Todo 4']
};
var board2 = {
	posx: null,
	posy: null,
	minwidth: 5,
	minheight: 7,
	width: 5,
	height: 7,
	style: 'font-size: 12px',
	name: 'Board Name',
	list: ['Todo 1', 'Todo 2', 'Todo 3', 'Todo 4']
};
var board3 = {
	posx: null,
	posy: null,
	minwidth: 5,
	minheight: 2,
	width: 8,
	height: 3,
	style: 'font-size: 36px',
	name: 'Board Name',
	list: ['Biiiiiiiig Goal of the future.']
};
var board4 = {
	posx: null,
	posy: null,
	minwidth: 3,
	minheight: 1,
	width: 3,
	height: 1,
	style: 'font-size: 24px',
	name: 'Board Name',
	list: ['Todo 1', 'Todo 2', 'Todo 3', 'Todo 4']
};
var board5 = {
	posx: null,
	posy: null,
	width: 1,
	height: 1,
	minwidth: 1,
	minheight: 1,
	style: 'font-size: 12px',
	name: 'Board Name',
	list: ['Todo 1', 'Todo 2', 'Todo 3', 'Todo 4']
};

var boards = [board1, board2, board3, board4, board5];
buildBoards();

$('#board-picker .board').mousedown(dragBoardFromPicker);