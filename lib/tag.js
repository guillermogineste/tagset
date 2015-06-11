Tags = new Mongo.Collection("tags");

Meteor.methods({
	addTag: function (title, color){
		if(!Meteor.userId()){
			throw new Meteor.Error("not-authorized");
		}
		Tags.insert({
			title: title,
			color: color,
			user: Meteor.user()._id
		});
	},
	removeTag: function (id){
		var tag = Tags.findOne(id);
		if(tag.user != Meteor.user()._id){
			throw new Meteor.Error("not-authorized");
		}
		Tags.remove(id);
	},
});
