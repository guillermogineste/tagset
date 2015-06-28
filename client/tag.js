Meteor.subscribe("tags");

Template.newtag.events({
	"submit": function(event) {
		Meteor.call("addTag",
				event.target.title.value,
				event.target.color.value);
		event.target.title.value="";
		event.target.color.value="";
		return false;
	},
	"click .color": function(event) {
		var target = event.target;
		var colors = hilbertColor(function(color){
			target.style.background = color;
			target.value = color;
			colors.parentNode.removeChild(colors);
		});
		// colors.style.position = "absolute";
		event.target.parentNode.appendChild(colors);
		// colors.style.top = (target.offsetTop + target.offsetHeight/2 - colors.offsetHeight/2 ) + "px";
		// colors.style.left = (target.offsetLeft + target.offsetWidth/2 - colors.offsetWidth/2) + "px";
		return false;
	},
});
Template.newtag.rendered = function(){
	var tag = this.firstNode.color;
	tag.style.background = tag.value = "rgb(255, 255, 255)";
};

Template.tags.helpers({
	tags: function(list) {
		var spec = {};
		if(list != null){
			spec._id = {$in: list};
		}
		return Tags.find(spec);
	}
});

Template.tag.helpers({
	isselected: function(){
		return Session.get('filter')[this._id] == true ? ' selected' : '';
	},
});

Session.setDefault("filter_operation", "and");
Session.setDefault("filter", {});

Template.filter.helpers({
	class: function(op){
		return Session.get("filter_operation") == op ? 'selected' : '';
	},
});
Template.filter.events({
	"click li": function(event){
		Session.set("filter_operation", event.target.dataset.operation);
	},
});

Template.tag.events({
	"dragstart": function(event) {
		var dt = event.originalEvent.dataTransfer;
		dt.setData('text/tag', this._id);
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
			if(node.tagName === "HEADER")
				Meteor.call("delTag", event.target.id);
			if(node.classList[0] === "bit")
				Meteor.call("delTagFromBit", event.target.id, node.id); 
		}
		var highlight = document.getElementsByClassName('tagTarget');
		for(var i=0;i<highlight.length;i++){
			highlight[i].classList.remove('target');
		}
	},
	"click .single-tag": function(event) {
		var filter = Session.get('filter');
		filter[this._id] = !filter[this._id];
		Session.set('filter', filter);
		return false;
	},
	"click .delete": function(event) {
		var node = event.target.parentNode.parentNode.parentNode;
		if(node.classList[0] === "tags-filter")
			Meteor.call("delTag", this._id);
		if(node.classList[0] === "single_item")
			Meteor.call("delTagFromBit", this._id, node.id); 
		return false;
	},
});
