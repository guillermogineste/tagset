Meteor.methods({
	getURLInfo: function(href){
		if(Meteor.isClient) return;
		var data = Scrape.website(href);
		return {
			title: data.title,
			description: data.description,
		};
	},
});
