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
	removeBit: function (id){
		var bit = Bits.findOne(id);
		if(bit.user != Meteor.user()._id){
			throw new Meteor.Error("not-authorized");
		}
		Bits.remove(id);
	},
});
