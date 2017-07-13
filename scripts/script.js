var gridSize = 16;
var currentTool = "";

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
			draw();
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
	currentTool = "#" + tool;
	$(currentTool).addClass('selectedTool');
};

function draw() {
	$('td').mouseenter(function() {
		$(this).addClass('drawnOn');
	});
};

function clearGrid() {
	$('#new-canvas').click(function() {
		$('td').removeClass('drawnOn');
		selectTool("pencil");
		draw();
	});
};

function erase() {
	$('td').mouseenter(function() {
		$(this).removeClass();
	});
};

/*-----------------------------------*/
/*------>>> DOCUMENT READY <<<-------*/
/*-----------------------------------*/

$(document).ready(function() { 
	createSlider();

	createGrid(gridSize);

	selectTool("pencil");
	draw();

	clearGrid();

	var visible = false;
	$('.toolbox-tab').click(function() {
		if (visible == false) {
			document.getElementById('arrow').setAttribute('src', 'images/arrow-down.png');
			$('.tool-wrapper').show("fold");
			visible = true;
		} else {
			document.getElementById('arrow').setAttribute('src', 'images/arrow-right.png');
			$('.tool-wrapper').hide("fold");
			visible = false;
		};
	});

	$('.tools').hover(
		function() {
			$(this).addClass('hoveredTool');
		}, 
		function() {
			$(this).removeClass('hoveredTool');
		});

	$('#pencil').click(function() {
		selectTool("pencil");
		draw();
	});

	$('#eraser').click(function() {
		selectTool("eraser");
		erase();
	});

	$('#rainbow-pencil').click(function() {
		selectTool("rainbow-pencil");
	});
});