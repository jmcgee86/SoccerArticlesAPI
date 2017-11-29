/*global $ APIKEY */

$(document).ready(function() {
	$.ajax({
		method: "GET",
		url: "https://newsapi.org/v2/sources",
		data: {
			q: "soccer",
			language: "en",
			apiKey: APIKEY
		},
		success: function(data) {
			if (data.status === "ok") {
				console.log(data);
				for (var i = 0; i < data.sources.length; i++) {
					var source = document.createElement("OPTION");
					source.setAttribute("value", data.sources[i].id);
					source.innerHTML = data.sources[i].name;
					document.getElementById("selection").appendChild(source);
				}
			}
		}
	});
	$("#source").submit(function(event) {
		event.preventDefault();
		document.getElementById("headlines").innerHTML = ""; //removes headlines from any previous selected sources
		$.ajax({
			method: "GET",
			url: "https://newsapi.org/v2/top-headlines?sources=" + document.getElementById("selection").value,
			data: {
				category: "general",
				country: "us",
				language: "en",
				apiKey: APIKEY
			},
			success: function(data) {
				if (data.status === "ok") {
					console.log(data);
					for (var i = 0; i < data.articles.length; i++) {
						var item = document.createElement("LI");
						var description = document.createElement("SPAN");
						item.setAttribute("class", "headlines");
						var link = data.articles[i].url;
						item.innerHTML = '<a target="_blank" href= "' + link + '">' + data.articles[i].title + '</a>';
						description.innerHTML = data.articles[i].description;
						var tweet = document.createElement("BUTTON");
						tweet.setAttribute("id", i);
						tweet.addEventListener("click", function(){
							var tweetArticle = data.articles[this.id].description + " via " + data.articles[this.id].source.name + " " + data.articles[this.id].url;
							window.open('https://twitter.com/intent/tweet?text='+encodeURIComponent(tweetArticle));
						});
						tweet.setAttribute("class", "btn btn-primary tw");
						tweet.setAttribute("type", "submit");
						tweet.innerHTML = "Tweet It";
						document.getElementById("headlines").appendChild(item);
						document.getElementById("headlines").appendChild(description);
						document.getElementById("top").innerHTML = "Top Headlines from " + data.articles[i].source.name + ":";
						document.getElementById("headlines").appendChild(tweet);

					}
					
				}
		}
		});
	});
});