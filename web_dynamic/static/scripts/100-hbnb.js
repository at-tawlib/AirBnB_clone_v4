$(document).ready(function() {
	// check and save amenities of ameninities checkboxes
	let amenities = {}
	$(".amenities input[data-id]").each(function() {
		let self = $(this);
		self.click(function() {
			if(self.is(":checked")) {
				amenities[self.data("name")] = self.data("id");
			} else {
				delete amenities[self.data("name")]
			}
			$(".amenities h4").text(Object.keys(amenities).sort().join(", "));
		});
	});
	
	// check and save states of states checkboxes
	let states = {}
	$(".locations>.popover>ul>li>h2>input[data-id]").each(function() {
		let self = $(this);
		self.click(function() {
			if(self.is(":checked")) {
				states[self.data("name")] = self.data("id");
			} else {
				delete states[self.data("name")]
			}
			$(".locations>h4").text(Object.keys(states).sort().join(", "));
		});
	});

	// check and save cities of cities checkboxes	
	let cities = {}
	$(".locations>.popover>ul>li>ul>li>input[data-id]").each(function() {
		let self = $(this);
		self.click(function() {
			if(self.is(":checked")) {
				cities[self.data("name")] = self.data("id");
			} else {
				delete cities[self.data("name")]
			}
			$(".locations h4").text(Object.keys(cities).sort().join(", "));
		});
	});


	let url = "http://0.0.0.0:5001/api/v1/status/";
	$.getJSON(url).done(function (data) {
		if(data["status"] == "OK") {
			$("div#api_status").addClass("available");
		}else {
			$("div#api_status").removeClass("available");
		}
	});

	$.ajax({
		type: "POST",
		url: "http://0.0.0.0:5001/api/v1/places_search/",
		data: "{}",
		dataType: "json",
		contentType: "application/json",
		success: function(data) {

			$("Section.places").append(
			data.forEach((d)=> {
				$("section.places").append(setPlacesArticle(d));
			})
			);

		}
	});

	function setPlacesArticle(place) {
		return `
			<article>
				<div class="title_box">
					<h2>${place.name}</h2>
					<div class="price_by_night">${place.price_by_night}</div>
				</div>
				<div class="information">
					<div class="max_guest">${ place.max_guest } Guest${ place.max_guest !== 1 ? "s" : ""}</div>
					<div class="number_rooms">${place.number_rooms} Bedroom ${place.number_rooms}</div>
					<div class="number_bathrooms">${place.number_bathrooms} Bathroom ${place.number_bathrooms}</div>
				</div>
				<div class="description">
					${place.description}
				</div>
			</article>`;
	}


	// search for items searched in the popover and display them, if empty, display all
	$(".filters button").on("click", function() {
		$.ajax({
			type: "POST",
			url: "http://0.0.0.0:5001/api/v1/places_search/",
			data: JSON.stringify({
				amenities: Object.values(amenities),
				states: Object.values(states),
				cities: Object.values(cities),
			}),
			dataType: "json",
			contentType: "application/json",
			success: function(data) {
				$("Section.places").empty();
				$("Section.places").append(
				data.forEach((d)=> {
					$("section.places").append(setPlacesArticle(d));
				})
				);
			}
		});

	});
});
