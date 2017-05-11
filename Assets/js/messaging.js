//jshint esversion:6

"use strict";

requirejs.config({
		//By default load any module IDs from js/lib
		baseUrl: 'js'
	});

	// Load all Modules.
	requirejs(
		[

		],
	// All Modules Loaded.


// Start "root" or "main" module/ script.
function(){

	console.log($("#user").html());
	if ($("#user").html() !== undefined) {
		console.log($("#title").html());
		$("#send").click(function() {
			let temp = $("#message").val();
			console.log($("#message").val());
			$.ajax({
				url: '/messaging',
				data: {
					"message": temp,
					"user": $("#user").html()
				},
				type: 'POST',
				success: function (data) {
					location.reload();
					$("#message").val(" ");
					let ret = jQuery.parseJSON(data);
					console.log('Success: ' + ret.message.toString());
				},
				error: function (xhr, status, error) {
					console.log('Error: ' + error.message);
					$('#response').html('Error connecting to the server.');
				},
			});
		});
	}

});
