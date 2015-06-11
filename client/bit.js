Meteor.subscribe("bits");

Template.body.helpers({
	bits: function() {
		return Bits.find();
	}
});

Template.bit.helpers({
	tagclass: function() {
		return this.tags.reduce(function(a, b){
			return a + ' t' + b;
		}, 'bit');
	}
});
Template.bit.events({
	"click .delete": function(event) {
		Meteor.call("removeBit", this._id);
	},
});
