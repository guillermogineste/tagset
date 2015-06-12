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
		colors.style.position = "absolute";
		document.body.appendChild(colors);
		colors.style.top = (target.offsetTop + target.offsetHeight ) + "px";
		colors.style.left = (target.offsetLeft + target.offsetWidth/2 - colors.offsetWidth/2) + "px";
		return false;
	},
});

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
});

(function(){
	var tags = Tags.find();
	function updateFilter(){
		var rule = document.getElementById("bitfilter").sheet.cssRules[0];
		rule.selectorText = tags.fetch().filter(function(tag){
			return tag.selected;
		}).reduce(function(a, tag){
			return a + '.t' + tag._id;
		}, '.bit');
	}
	tags.observeChanges({
		changed: updateFilter,
		deleted: updateFilter,
	});
})()

Template.tag.events({
	"dragstart": function(event) {
		var dt = event.originalEvent.dataTransfer;
		dt.setData('text/tag', this._id);
		dt.setData('text/plain', this.title);
	},
	"dragend": function(event) {
		var dt = event.originalEvent.dataTransfer;
		var node = event.target.parentNode.parentNode;
		if(dt.dropEffect == "move" && node.classList[0] === "bit"){
			Meteor.call("delTagFromBit", dt.getData('text/tag'), node.id); 
		}
	},
	"click": function(event) {
		Meteor.call("selectTag", this._id, !this.selected);
	},
	"click .delete": function(event) {
		Meteor.call("removeTag", this._id);
	},
});
