var gridSize = 16;

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

function draw() {
	$('td').mouseenter(function() {
		$(this).addClass('drawnOn');
	});
};

function clearGrid() {
	$('#new-canvas').click(function() {
		$('td').removeClass('drawnOn');
	});
};

$(document).ready(function() { 
	createSlider();

	createGrid(gridSize);

	draw();

	clearGrid();

	var visible = false;
	$('.toolbox-tab').click(function() {
		if (visible == false) {
			document.getElementById('arrow').setAttribute('src', 'images/arrow-down.png');
			$('.tools').show("fold");
			visible = true;
		} else {
			document.getElementById('arrow').setAttribute('src', 'images/arrow-right.png');
			$('.tools').hide("fold");
			visible = false;
		};
	});
});