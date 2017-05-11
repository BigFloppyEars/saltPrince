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

	$("#login").click(function() {
		$.ajax({
			url: '/login',
			data: {"loggedIn": true},
			type: 'POST',
			success: function (data) {
				location.reload();
				let ret = jQuery.parseJSON(data);
				console.log('Success: ' + ret.loggedIn);
			},
			error: function (xhr, status, error) {
				console.log('Error: ' + error.message);
			},
		});
	});

	$("#logout").click(function() {
		$.ajax({
			url: '/login',
			data: {"loggedIn": false},
			type: 'POST',
			success: function (data) {
				location.reload();
				let ret = jQuery.parseJSON(data);
				console.log('Success: ' + ret.loggedIn);
			},
			error: function (xhr, status, error) {
				console.log('Error: ' + error.message);
			},
		});
	});

});
