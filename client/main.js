Template.body.events({
	"dragover .drop, dragenter .drop": function(event) {
		var e = event.originalEvent;
		e.dataTransfer.dropEffect = "move";
		event.preventDefault(e);
	},
	"drop .drop": function(event) {
		var dt = event.originalEvent.dataTransfer;
		event.preventDefault();
	},
	"click .tags_filter": function() {
		$(".tags_list_filter").toggle();
	},
});

Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY"
});
