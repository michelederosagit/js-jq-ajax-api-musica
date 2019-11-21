$(document).ready(function() {
	// Mi seleziono il template
	var albumSource = $("#template-cd").html();
	var albumTemplate = Handlebars.compile(albumSource);
	var context;

	// Imposto il valore iniziale al dropdown
	$("#genres-select").val("All");

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

	$("#genres-select").click (function () {

		// Salvoil genere scelto dall'utente
		var selected = $(this).val();

		// Se corrisponde ad All allora mostro tutto
		if (selected === "All"){
			$(".cd").show();
		} else {
			$(".cd").each(function(){

				if ($(this).find(".genre").text() === selected){
					$(this).show();
				} else {
					$(this).hide();
				};
			});
		};
	});
}); // Fine DocReady