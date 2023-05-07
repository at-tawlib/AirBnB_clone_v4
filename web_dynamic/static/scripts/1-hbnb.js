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
			//setText();
			$(".amenities h4").text(Object.values(amenities).sort().join(", "));
		});

	});

});
