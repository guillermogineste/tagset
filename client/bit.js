Meteor.subscribe("bits");

Template.newbit.helpers({
	newtype: function() {
		return "new"+this.type;
	},
	displaytype: function() {
		return this.type.charAt(0).toUpperCase() + this.type.slice(1);
	},
});

Template.newbit.events({
	"submit": function(event) {
		var obj = {};
		var ele = event.target.elements;
		for(var i=0; i<ele.length; i++){
			obj[ele[i].name] = ele[i].value;
			ele[i].value = "";
		}
		delete(obj[""]);
		obj.tags = []; /* FIXME, all currently selected tags */
		Meteor.call("addBit", obj);
		return false;
	},
});

Template.bits.helpers({
	bits: function() {
		return Bits.find({type: this.type});
	}
});

Template.bit.helpers({
	tagclass: function() {
		return this.tags.reduce(function(a, b){
			return a + ' t' + b;
		}, 'bit');
	},
	showtype: function() {
		return "show" + this.type;
	},
});
Template.bit.events({
	"click .delete": function(event) {
		Meteor.call("removeBit", this._id);
	},
});
