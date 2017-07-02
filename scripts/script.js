var gridSize = 16;

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
	createGrid(gridSize);

	$('td').click(function() {
		$(this).css('background-color', 'black');
	});
});