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
			if(ele[i].name != 'type'){
				ele[i].value = "";
			}
		}
		delete(obj[""]);
		obj.tags = {}; /* FIXME, all currently selected tags */
		Meteor.call("addBit", obj);
		return false;
	},
});

Template.bits.helpers({
	bits: function() {
		return Bits.find({type: this.type}, {sort: {created: -1}});
	}
});

Template.bit.helpers({
	tagclass: function() {
		var classes = "bit";
		for(t in this.tags){
			classes += ' t' + t;
		}
		return classes;
	},
	taglist: function() {
		var list = [];
		for(a in this.tags){
			list.push(a);
		}
		return list;
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
		dt.dropEffect = "copy";
		if(dt.types.indexOf("text/tag") >= 0){
			event.preventDefault(event.originalEvent);
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
	},
	"dragstart": function(event) {
		if(event.target.classList[0] != 'bit') return true;
		var dt = event.originalEvent.dataTransfer;
		dt.setData('text/bit', this._id);
		dt.setData('text/plain', this.title);
		var highlight = document.getElementsByClassName('tagTarget');
		for(var i=0;i<highlight.length;i++){
			highlight[i].classList.add('target');
		}
	},
	"dragend": function(event) {
		var dt = event.originalEvent.dataTransfer;
		var node = event.target.parentNode.parentNode;
		if(dt.dropEffect == "move"){
			Meteor.call("removeBit", event.target.id);
		}
		var highlight = document.getElementsByClassName('tagTarget');
		for(var i=0;i<highlight.length;i++){
			highlight[i].classList.remove('target');
		}
	},
});
