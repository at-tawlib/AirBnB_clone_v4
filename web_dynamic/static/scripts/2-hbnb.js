$(document).ready(function() {
	let amenities = {}
	$("input[data-id]").each(function() {
		let self = $(this);
		self.click(function() {
			if(self.is(":checked")) {
				amenities[self.data("id")] = self.data("name");
			} else {
				delete amenities[self.data("id")]
			}
			$(".amenities h4").text(Object.values(amenities).sort().join(", "));
		});

	});


	let url = "http://0.0.0.0:5001/api/v1/status/";
	$.getJSON(url).done(function (data) {
		console.log(data);

		if(data["status"] == "OK") {
			$("div#api_status").addClass("available");
		}else {
			$("div#api_status").removeClass("available");
		}
	});
});
