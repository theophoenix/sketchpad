var gridSize = 32;
var toolboxVisible = false;
var currentTool = '';
var counter = 0; // Temporary

function createSlider() {
	var sliderHandle = $('#slider-handle');
	$('#grid-slider').slider({
		min: 1,
		max: 64,
		value: gridSize,
		create: function() {
			sliderHandle.text($(this).slider('value'));
		},
		slide: function(event, ui) {
			sliderHandle.text(ui.value);
			$('table').remove();
			createGrid(ui.value);
		}
	});
	console.log('Slider created.');
};

function createGrid(num) {
	$('.pad').append('<table></table>');
	for (var y = 0; y < num; y++) {
		$('table').append('<tr></tr>');
	};
	for (var x = 0; x < num; x++) {
		$('tr').append('<td></td>');
	};
	console.log('Grid created.');
};

function selectTool(tool) {
	$(currentTool).removeClass('selectedTool');
	currentTool = '#' + tool;
	$(currentTool).addClass('selectedTool');
	console.log('Current tool: ' + currentTool);
};

function rng() {
	var randomNum = Math.floor(Math.random() * 256); // Between 0 inclusive and 256 exclusive
	// console.log('Random number generated.');
	return randomNum;
};

function randomRGB() {
	console.log('Random colour generated.');
	return 'rgb(' + rng() + ', ' + rng() + ', ' + rng() + ')';
};

/*-----------------------------------*/
/*------>>> DOCUMENT READY <<<-------*/
/*-----------------------------------*/

$(document).ready(function() { 
	createSlider();
	createGrid(gridSize);
	selectTool('gradient-pencil');

	/* 'Toolbox' Behaviour */

	$('#arrow').click(function() {
		if (toolboxVisible == false) {
			document.getElementById('arrow').setAttribute('src', 'images/arrow-down.png');
			$('.tool-wrapper').show('fold');
			toolboxVisible = true;
			console.log('Tools shown.');
		} else {
			document.getElementById('arrow').setAttribute('src', 'images/arrow-right.png');
			$('.tool-wrapper').hide('fold');
			toolboxVisible = false;
			console.log('Tools hidden.');
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
		// selectTool('new-canvas');
		$('td').removeAttr('style');
		$('td').removeAttr('class');
		console.log('Grid cleared.');
		counter = 0; // Temporary
		//selectTool('black-pencil');
	});

	$('#black-pencil').click(function() {
		selectTool('black-pencil');
	});

	$('#rainbow-pencil').click(function() {
		selectTool('rainbow-pencil');
	});

	$('#gradient-pencil').click(function() {
		selectTool('gradient-pencil');
	});

	$('#eraser').click(function() {
		selectTool('eraser');
	});

	$('td').mouseenter(function() {
		// This is messy.
		if ($(this).attr('style')) {
			if (currentTool == '#eraser') {
				$(this).removeAttr('style');
				$(this).removeAttr('class');
				console.log('Style erased.');
			};
		} else {
			if (currentTool == '#black-pencil') {
				$(this).css('background-color', 'rgb(0, 0, 0)');
				console.log('Drawing with ' + currentTool);
				counter++; // Temporary
				console.log(counter); // Temporary
			} else if (currentTool == '#rainbow-pencil') {
				$(this).css('background-color', randomRGB());
				console.log('Drawing with ' + currentTool);
				counter++; // Temporary
				console.log(counter); // Temporary
			};
		};

		if (currentTool == '#gradient-pencil') {
			$(this).addClass('hasOpacity');
			$(this).css({'background-color': 'rgb(0, 0, 0)', 'opacity': ('+=0.1')});
			console.log('Drawing with ' + currentTool);
			counter++; // Temporary
			console.log(counter); // Temporary
		};
	});
});