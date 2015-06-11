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
	"dragover, dragenter": function(event) {
		var dt = event.originalEvent.dataTransfer;
		if(dt.types.indexOf("text/tag") >= 0){
			event.preventDefault();
		}
	},
	"drop": function(event) {
		var dt = event.originalEvent.dataTransfer;
		var bitid = this._id;
		var funcs = {
			"text/tag": function(tag){
				Meteor.call("addTagToBit", tag, bitid);
			},
		};
		for(var i = 0; i < dt.types.length; i++){
			if(funcs[dt.types[i]] !== undefined){
				funcs[dt.types[i]](dt.getData(dt.types[i]), event);
				return event.preventDefault();
			}
		}
	}
});
