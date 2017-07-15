var gridSize = 16;
var toolboxVisible = false;
var currentTool = '';

function createSlider() {
	var sliderHandle = $('#slider-handle');
	$('#grid-slider').slider({
		min: 1,
		max: 64,
		value: 16,
		create: function() {
			sliderHandle.text($(this).slider('value'));
		},
		slide: function(event, ui) {
			sliderHandle.text(ui.value);
			$('table').remove();
			createGrid(ui.value);
			selectTool('black-pencil');
		}
	});
};

function createGrid(num) {
	$('.pad').append('<table></table>');
	for (var y = 0; y < num; y++) {
		$('table').append('<tr></tr>');
	};
	for (var x = 0; x < num; x++) {
		$('tr').append('<td></td>');
	};
};

function selectTool(tool) {
	$(currentTool).removeClass('selectedTool');
	currentTool = '#' + tool;
	$(currentTool).addClass('selectedTool');
	switch (tool) {
		case 'new-canvas':
			clearGrid();
			selectTool('black-pencil');
			break;
		case 'black-pencil':
			draw('black');
			break;
		case 'eraser':
			erase();
			break;
		case 'rainbow-pencil':
			draw('rainbow');
			break;
	};
};

function clearGrid() {
	$('td').removeClass();
	$('td').removeAttr('style');
};

function draw(color) {
	$('td').mouseenter(function() {
		if (color == 'black') {
			$(this).removeAttr('style');
			$(this).addClass('blackPencil');
		} else if (color == 'rainbow') {
			$(this).removeClass();
			$(this).css({
				'background-color': randomRGB(),
				// 'border-right': '1px solid red',
				// 'border-bottom': '1px solid red'
			});
		};
	});
};

function rng() {
	var randomNum = Math.floor(Math.random() * 256); // Between 0 inclusive and 256 exclusive
	return randomNum;
};

function randomRGB() {
	return('rgb(' + rng() + ', ' + rng() + ', ' + rng() + ')');
};


function erase() {
	$('td').mouseenter(function() {
		$(this).removeClass();
		$(this).removeAttr('style');
	});
};

/*-----------------------------------*/
/*------>>> DOCUMENT READY <<<-------*/
/*-----------------------------------*/

$(document).ready(function() { 
	createSlider();
	createGrid(gridSize);
	selectTool('black-pencil');

	/* 'Toolbox' Behaviour */

	$('#arrow').click(function() {
		if (toolboxVisible == false) {
			document.getElementById('arrow').setAttribute('src', 'images/arrow-down.png');
			$('.tool-wrapper').show('fold');
			toolboxVisible = true;
		} else {
			document.getElementById('arrow').setAttribute('src', 'images/arrow-right.png');
			$('.tool-wrapper').hide('fold');
			toolboxVisible = false;
		};
	});

	/* 'Tools' Behaviour */

	$('.tools').hover(
		function() {
			$(this).addClass('hoveredTool');
		}, 
		function() {
			$(this).removeClass('hoveredTool');
		});

	$('#new-canvas').click(function() {
		selectTool('new-canvas');
	});

	$('#black-pencil').click(function() {
		selectTool('black-pencil');
	});

	$('#eraser').click(function() {
		selectTool('eraser');
	});

	$('#rainbow-pencil').click(function() {
		selectTool('rainbow-pencil');
	});
});