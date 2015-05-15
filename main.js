var app = app || {};
(function() {
	// Model
	var ToDid_Model = Backbone.Model.extend({
		defaults: {
			entry: ''
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
		template: _.template($('#todid_model_template').html()),
		initialize: function() {
			this.render();
		},
		render: function() {
			var new_todid = this.$el.html(this.template(this.model));
			$('#todid_listing').append(new_todid);
			return this;
		}
	});
	// ToDid Collection View
	var ToDids_View = Backbone.View.extend({
		el: $('#everything'),
		events: {
			'click #form_submit': 'add_entry'
		},		
		initialize: function() {
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
			var entry_data = $('#form_input').val();
			new_entry = new ToDid_Model({
				entry: entry_data
			});
			this.collection.add(new_entry);
			new_entry.save();
			$('#form_input').val('');
		}
	});
	var form_view = new ToDids_View();
})();
