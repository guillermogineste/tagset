Meteor.publish("bits", function(){
	return Bits.find({
		"user": this.userId,
	}, {
		sort: {title: 1},
	});
});
