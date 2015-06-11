Meteor.subscribe("tags");

Template.body.helpers({
	tags: function() {
		return Tags.find();
	}
});

Template.body.events({
	"submit .new-tag": function(event) {
		Meteor.call("addTag",
				event.target.title.value,
				event.target.color.value);
		event.target.title.value="";
		event.target.color.value="";
		return false;
	}
});

Template.tags.helpers({
});
Template.tag.events({
	"click .delete": function(event) {
		Meteor.call("removeTag", this._id);
	},
});

Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY"
});
