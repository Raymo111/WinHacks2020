function getInfo() {
	/*
	$.get("", {}, function(results){
		alert(results); // will show the HTML
		alert($(results).find("div.scores").html()); // show "scores" div in results
	});
	*/
	$.ajax({
	  url: 'https://api.myjson.com/bins/bq6eu',
	  success: function(response){
		console.log(response.string);
	  },
	  error: function(response){
		console.log('server error');
	  }
	})
}