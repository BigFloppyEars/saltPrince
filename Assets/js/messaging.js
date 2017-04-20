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
	
	$("#send").click(function() {
		console.log($("input"));
		$.ajax({
			url: 'http://localhost:8080/messaging',
			data: {"data": "TEST"},
			type: 'POST',
			success: function (data) {
				let ret = jQuery.parseJSON(data);
				$('li').html(ret.data.toString());
				console.log('Success: ' + ret.data.toString());
			},
			error: function (xhr, status, error) {
				console.log('Error: ' + error.message);
				$('#response').html('Error connecting to the server.');
			},
		});
	});
});