Bits = new Mongo.Collection("bits");

Meteor.methods({
	addBit: function (obj){
		if(!Meteor.userId()){
			throw new Meteor.Error("not-authorized");
		}
		delete(obj._id);
		obj.user = Meteor.user()._id;
		obj.created = new Date().valueOf();
		Bits.insert(obj);
	},
	addTagToBit: function (tag, id){
		var bit = Bits.findOne(id);
		if(bit === undefined || bit.user != Meteor.user()._id){
			throw new Meteor.Error("not-authorized");
		}
		bit.tags[tag] = true;
		Bits.update({_id: bit._id}, bit);
	},
	delTagFromBit: function (tag, id){
		var bit = Bits.findOne(id);
		if(bit === undefined || bit.user != Meteor.user()._id){
			console.log(id);
			throw new Meteor.Error("not-authorized");
		}
		delete bit.tags[tag];
		Bits.update({_id: bit._id}, bit);
	},
	removeBit: function (id){
		var bit = Bits.findOne(id);
		if(bit == undefined || bit.user != Meteor.user()._id){
			throw new Meteor.Error("not-authorized");
		}
		Bits.remove(id);
	},
});
