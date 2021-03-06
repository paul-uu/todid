var app = app || {};
(function() {

	// ----------------------------------------------------------
	// Date stuff:
	Date.prototype.today = function () {  // today's date;
		return (((this.getMonth()+1) < 10) ? '0':'') + (this.getMonth()+1) +'/'+ ( (this.getDate() < 10) ? '0':'') + this.getDate() +'/'+ this.getFullYear();
	};
	Date.prototype.timeNow = function () {  // current time
		return ((this.getHours() < 10) ? '0':'') + this.getHours() +':'+ ((this.getMinutes() < 10) ? '0':'') + this.getMinutes();
	};
	var today = new Date();
	var date = today.today(),
		time = today.timeNow(),
		date_time = today.getTime();
	$('#date').text(date);
	

	// ----------------------------------------------------------
	// Backbone stuff:
	
	// Model
	var ToDid_Model = Backbone.Model.extend({
		defaults: {
			'date': date,
			'time': time,
			'date_time': date_time,
			'day': '',
			'stuff': '',
			'thoughts': '',
			'food': ''
		}
	});
	// Collection
	var ToDid_Collection = Backbone.Collection.extend({
		model: ToDid_Model,
		localStorage: new Backbone.LocalStorage('ToDid_LS')
	});

	// ToDidModel View
	var ToDid_View = Backbone.View.extend({
		
		tagName: 'div',
		className: 'todid_item',
		events: {
			'click .delete_entry': 'delete_entry'
		},
		template: _.template($('#todid_model_template').html()),
		initialize: function() {
			this.render();
		},
		render: function() {
			this.$el.html(this.template(this.model));
			return this;
		},
		delete_entry: function() {
			this.model.destroy();	// delete model
			this.remove();			// delete view
		}
	});
	// ToDid Collection View
	var ToDids_View = Backbone.View.extend({
		el: $('#page_container'),
		events: {
			'click #form_submit': 'add_entry',
			'click #toggle_new': 'show_form',
			'click #toggle_old': 'show_entries'
		},
		initialize: function() {
			this.collection = new ToDid_Collection();
			this.collection.fetch();
			this.collection.toJSON();

			this.render();
			// listen for changes to collection
			this.collection.on('add', this.render_item, this);
			this.collection.on('remove', this.remove_item, this);
		},
		render: function() {
			var that = this;
			_.each(this.collection.models, function(model) {
				that.render_item(model);
			}, this);
		},
		render_item: function(model) {
			var model_view = new ToDid_View({ model: model });
			this.$('#todid_listing').append(model_view.render().el);
		},
		add_entry: function() {
			var input = [];
			$('.form_textarea').each(function(i) {
				input.push($(this).val());
			});
			date = today.today();
			time = today.timeNow();
			date_time = today.getTime();

			new_entry = new ToDid_Model({
				'date': date,
				'time': time,
				'date_time': date_time,
				'day': input[0],
				'stuff': input[1],
				'thoughts': input[2],
				'food': input[3]

			});
			this.collection.add(new_entry);
			new_entry.save();
			$('.form_textarea').val('');
		},
		show_form: function() {
			$('#todid_listing').addClass('hidden');
			$('#form_container').removeClass('hidden');
		},
		show_entries: function() {
			$('#form_container').addClass('hidden');
			$('#todid_listing').removeClass('hidden');
		}
	});
	var form_view = new ToDids_View();
})();
