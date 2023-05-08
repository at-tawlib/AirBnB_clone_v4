$(document).ready(function() {
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


	let url = "http://0.0.0.0:5001/api/v1/status/";
	$.getJSON(url).done(function (data) {

		if(data["status"] == "OK") {
			$("div#api_status").addClass("available");
		}else {
			$("div#api_status").removeClass("available");
		}
	});
});
