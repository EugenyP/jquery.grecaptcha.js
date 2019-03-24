(function($) {

	var defaults = {
            sitekey: '',
			ajax: false,
			parent: null,
            size: 'visible'
        };

	var methods = {
		reset: function() {
			var form = $(this);
			grecaptcha.reset(form.data('gcaptcha'), {
				sitekey		: form.data('gcaptcha_options').sitekey,
				size		: form.data('gcaptcha_options').size,
				callback	: function(){
					form.grecaptcha('callback');
				}
			});
			console.log(this);
		},
		callback: function() {
			var form = $(this);
			form.data('gcaptcha_valid', true);
			form.trigger('success.grecaptcha');
			if (form.data('gcaptcha_options').ajax) {
				form.trigger('submitAjax.grecaptcha');
				form.grecaptcha('reset');
				form.data('gcaptcha_valid', false);
			} else {
				if (form.data('gcaptcha_options').size == 'invisible') {
					if (form.data('gcaptcha_options').submit) {
						form.submit();
					} else {
						form.find('[type=submit]').trigger('click');
					}
				}
			}
		},
		init : function( params ) {
			return this.each(function(index, element){
				var form = $(this);
				dataSettings = form.data('grecaptcha') || {};
				var options = $.extend({}, defaults, params, dataSettings);
				var grecaptcha_div = false;
				if (options.parent !== null) {
					grecaptcha_div = form.find(options.parent);
					console.log(grecaptcha_div.length);
					if (grecaptcha_div.length) {
						var id = grecaptcha_div.attr('id');
						if (typeof(id) === 'undefined') {
							var id = 'recaptcha_' + Date.now()+'_'+index;
							grecaptcha_div.attr('id', id);
						}
					} else {
						grecaptcha_div = false;
					}
				}
				if (!grecaptcha_div) {
					var grecaptcha_div = $('<div>');
					var id = 'recaptcha_' + Date.now()+'_'+index;
					grecaptcha_div.attr('id', id);
					form.append(grecaptcha_div);
				}
				form.data('gcaptcha_valid', false);
				form.data('gcaptcha_options', options);
				form.on('submit', function() {
					if (form.data('gcaptcha_valid') == false) {
						if (form.data('gcaptcha_options').size == 'invisible') {
							grecaptcha.execute(form.data('gcaptcha'));
						}
						form.trigger('error.grecaptcha');
						return false;
					} else {
						form.data('gcaptcha_valid', false);
					}
				});					
				gcaptcha = grecaptcha.render(id, {
					sitekey : options.sitekey,
					size: options.size,
					callback	: function(){
						form.grecaptcha('callback');
					}
				});
				form.data('gcaptcha', gcaptcha);
			});
		}
	};
    $.fn.grecaptcha = function(method) {

		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Метод ' +  method + ' не существует в jQuery.grecaptcha' );
		}
        return this;
    };
})(jQuery);