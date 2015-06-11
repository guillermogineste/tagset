Bits = new Mongo.Collection("bits");

Meteor.methods({
	addBit: function (title){
		if(!Meteor.userId()){
			throw new Meteor.Error("not-authorized");
		}
		Bits.insert({
			title: title,
			user: Meteor.user()._id
		});
	},
	removeBit: function (id){
		var bit = Bits.findOne(id);
		if(bit.user != Meteor.user()._id){
			throw new Meteor.Error("not-authorized");
		}
		Bits.remove(id);
	},
});
