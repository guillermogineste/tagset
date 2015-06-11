Meteor.publish("tags", function(){
	return Tags.find({
		"user": this.userId,
	}, {
		sort: {title: 1},
	});
});
