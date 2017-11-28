/*global $ APIKEY */

$(document).ready(function(){
    $.ajax({
        method: "GET",
        url: "https://newsapi.org/v2/everything",
        data: { q: "soccer", language: "en", apiKey: APIKEY},
        success: function(data){
            if (data.status ==="ok"){
                console.log(data)
                for (var i=0; i < data.articles.length; i++){
                var item = document.createElement("LI");
                  var description = document.createElement("SPAN");
                  var link = data.articles[i].url;
                  item.setAttribute("href", link);
                  item.innerHTML = '<a target="_blank" href= "'+link+'">'+data.articles[i].title+'</a>'
                    description.innerHTML = data.articles[i].description;
                  	document.getElementById("headlines").appendChild(item);
                  	document.getElementById("headlines").appendChild(description);
                    //var source = document.createElement("OPTION");
                    //source.setAttribute("value", data.sources[i].id);
                    //source.innerHTML = data.sources[i].name;
                    //document.getElementById("selection").appendChild(source);
                    
                }
        }
        }
    })
})