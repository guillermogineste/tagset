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
	"click .btn--tags-filter": function() {
		$(".tags-filter").toggle();
	},
	"click .add-expand": function(e) {
		var $this = $(e.target);
		$this.parent().siblings('.col__add-form__form').toggle();
	    $this.toggleClass('close');
		if($this.hasClass('close')){
			$this.text('Close');
		} else {
			$this.text('Add');
		}
	},
});

Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY"
});