$(document).ready(function() {
	// Mi seleziono il template
	var albumSource = $("#template-cd").html();
	var albumTemplate = Handlebars.compile(albumSource);
	var context;
	
	$.ajax ({
		url: "https://flynn.boolean.careers/exercises/api/array/music",
		method: "GET",
		success: function (data) {
			if (data.success){
				var albumList = data.response;
				console.log(albumList);
				
				for (var i = 0; i < albumList.length; i++){
					context = {
						AlbumPicture: albumList[i].poster,
						AlbumTitle: albumList[i].title,
						AlbumAuthor: albumList[i].author,
						AlbumGenre: albumList[i].genre,
						AlbumYear: albumList[i].year,
					}

					var html  = albumTemplate(context);
					$(".cds-container").append(html);
					console.log(html);
				}
			}
		},

		error: function (req, state, err) {
			alert("Qualcosa è andato storto");
			console.log(err);
		}
	}); // Fine chiamata Ajax
}); // Fine DocReady