var app = app || {};
(function() {

	// ----------------------------------------------------------
	// Date stuff:
	var date = new Date();
	var today_day = date.getDay(),
		today_month = date.getMonth(),
		today_date = date.getDate(),
		today_year = date.getFullYear();

	var day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	// date_display is simply a typical display of today's date
	// date_short is to be used in defining the local storage key values
	var date_display, date_short;
	date_display = day[today_day] + ' ' + month[today_month] + ' ' + today_date + ', ' + today_year;
	date_short = (add_zero(today_month + 1)) + '/' + (add_zero(today_date)) + '/' + today_year;

	// put date into dom
	$('#date').text(date_display);

	// ensure 2-digits of month or day numerical values to maintain xx/xx/xxxx
	function add_zero(int) {
		if (int < 10) {
			return '0' + int.toString();
		} else { return int; }
	}



	// Model
	var ToDid_Model = Backbone.Model.extend({
		defaults: {
			'read_title': '',
			'read_url': '',
			'read_tldr': '',
			'activity': '',
			'thought_idea': '',
			'food': '',
			'music': '',
			'music_thoughts':'',
			'new': ''
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
			console.log('model view initialized');
			this.render();
		},
		render: function() {
			var new_todid = this.$el.html(this.template(this.model));
			$('#todid_listing').append(new_todid);
			return this;
		},
		delete_entry: function() {

		}
	});
	// ToDid Collection View
	var ToDids_View = Backbone.View.extend({
		el: $('#page_container'),
		events: {
			'click #form_submit': 'add_entry'
		},
		initialize: function() {
			console.log('todid initialize');
			this.collection = new ToDid_Collection();
			this.collection.fetch();
			this.collection.toJSON();

			this.render();
			this.collection.on('add', this.render_item, this);
		},
		render: function() {
			var that = this;
			_.each(this.collection.models, function(model) {
				that.render_item(model);
			}, this);
		},
		render_item: function(model) {
			var model_view = new ToDid_View({ model: model });
			this.$el.append(model_view.render().el);
		},
		add_entry: function() {

			var input = [];
			$('.form_input').each(function(i) {
				input.push($(this).val());
			});
			new_entry = new ToDid_Model({
				'read_title': input[0],
				'read_url': input[1],
				'read_tldr': input[2],
				'activity': input[3],
				'thought_idea': input[4],
				'food': input[5],
				'music': input[6],
				'music_thoughts': input[7],
				'new': input[8]
			});
			this.collection.add(new_entry);
			new_entry.save();
			$('.form_input').val('');
		}
	});
	var form_view = new ToDids_View();
})();
