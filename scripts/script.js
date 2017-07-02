var gridSize = 32;

function createSlider() {
	var sliderHandle = $('#sliderHandle');
	$('#gridSlider').slider({
		min: 1,
		max: 64,
		create: function() {
			sliderHandle.text($(this).slider('value'));
		},
		slide: function(event, ui) {
			sliderHandle.text(ui.value);
		}
	});
}

function createGrid(num) {
	$('.pad').append('<table></table>');
	for (var y = 0; y < num; y++) {
		$('table').append('<tr></tr>');
	};
	for (var x = 0; x < num; x++) {
		$('tr').append('<td></td>');
	};
};

$(document).ready(function() { 
	createSlider();

	createGrid(gridSize);

	// Listen for mouseenter on a <td>
	$('td').mouseenter(function() {
		$(this).addClass('drawnOn');
	});
});