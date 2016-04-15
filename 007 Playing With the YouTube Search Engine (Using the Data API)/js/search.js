$(function() {
	var searchField = $("#query");
	var icon = $("#search-btn");

	// FOCUS
	$(searchField).on("focus", function() {
		$(this).animate({
			width: "100%"
		}, 400);
		$(icon).animate({
			right: "10px"
		}, 400);
	});

	// BLUR
	$(searchField).on("blur", function() {
		if (searchField.val() == "") {
			$(searchField).animate({
				width: "45%"
			}, 350, function(){});

			$(icon).animate({
				right: "360px"
			}, 250, function(){});
		}
	});	

	$("#search-form").submit(function(stopSubmit) {
		stopSubmit.preventDefault();
	});
});

function search() {
	// Clear all of the results
	$("#results").html("");
	$("#buttons").html("");

	// Get input from form. Use q as specified in API docs
	q = $("#query").val();

	// GET request #CHECK with Postman
	$.get(
		"https://www.googleapis.com/youtube/v3/search", 
		{
			part: "snippet, id",
			q: q,
			type: "video",
			key: "AIzaSyBzosfVrg30OgYL6W9Jx4MPkiSNddR7cxk"},
		
		function(data) {
			var nextToken = data.nextToken;
			var prevToken = data.prevToken;

			console.log(data);

			// Loop through the search results and display them.
			$.each(data.items, function(i, item) {
				var output = getOutput(item);
				$("#results").append(output);
			});

			var buttons = getButtons(prevToken, nextToken);
			// Show buttons
			$("#buttons").append(buttons);
		}
	);
}

// Create buttons
function getButtons(prev, next) {
	if(!prev) {
		var btnout= '<div class="button-container">' + 
						'<button id="next-button" class="paging-button" data-token="'+next+'" data-query="'+q+'" onclick="nextPage();">Next</button>' +
					'</div>';
	} else {
		var btnout= '<div class="button-container">' + 
						'<button id="prev-button" class="paging-button" data-token="'+prev+'" data-query="'+q+'" onclick="prevPage();">Previous</button>' +
						'<button id="next-button" class="paging-button" data-token="'+next+'" data-query="'+q+'" onclick="nextPage();">Next</button>' +
					'</div>';
	}

	return btnout;

}

// This function will build what are output will be once a user
// submits a search.
function getOutput(item) {
	var title = item.snippet.title;
	var description = item.snippet.description;
	var channelTitle = item.snippet.channelTitle;
	var videoId = item.id.videoId;
	var datePosted = item.snippet.publishedAt;
	var thumb = item.snippet.thumbnails.high.url; // Grab hq thumbnail

	// Build output string
	var output = '<li>' + 
					'<div class="list-left">' + 
						'<img src="'+thumb+'">' + 
					'</div>' + 
	
					// Format the display for the video
					'<div class="list-right">' + 
						'<h3><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+videoId+'"'+title+'</a></h3>' +
						'<small>By <span class="cTitle">'+channelTitle+'</span> on '+datePosted+'</small>' + 
						'<p>'+description+'</p>' + 
					'</div>' + 
				'</li>' + 

				'<div class="clearfix"></div>' + 
				'';
	return output;
}

function nextPage() {
	var token = $('#next-button').data('token');
	var q = $('#next-button').data('query');

	// Clear all of the results
	$("#results").html("");
	$("#buttons").html("");

	// Get input from form. Use q as specified in API docs
	q = $("#query").val();

	// GET request #CHECK with Postman
	$.get(
		"https://www.googleapis.com/youtube/v3/search", 
		{
			part: "snippet, id",
			q: q,
			pageToken: token,
			type: "video",
			key: "AIzaSyBzosfVrg30OgYL6W9Jx4MPkiSNddR7cxk"},
		
		function(data) {
			var nextToken = data.nextToken;
			var prevToken = data.prevToken;

			console.log(data);

			// Loop through the search results and display them.
			$.each(data.items, function(i, item) {
				var output = getOutput(item);
				$("#results").append(output);
			});

			var buttons = getButtons(prevToken, nextToken);
			// Show buttons
			$("#buttons").append(buttons);
		}
	);	
}

function prevPage() {
	var token = $('#prev-button').data('token');
	var q = $('#prev-button').data('query');

	// Clear all of the results
	$("#results").html("");
	$("#buttons").html("");

	// Get input from form. Use q as specified in API docs
	q = $("#query").val();

	// GET request #CHECK with Postman
	$.get(
		"https://www.googleapis.com/youtube/v3/search", 
		{
			part: "snippet, id",
			q: q,
			pageToken: token,
			type: "video",
			key: "AIzaSyBzosfVrg30OgYL6W9Jx4MPkiSNddR7cxk"},
		
		function(data) {
			var nextToken = data.nextToken;
			var prevToken = data.prevToken;

			console.log(data);

			// Loop through the search results and display them.
			$.each(data.items, function(i, item) {
				var output = getOutput(item);
				$("#results").append(output);
			});

			var buttons = getButtons(prevToken, nextToken);
			// Show buttons
			$("#buttons").append(buttons);
		}
	);	
}