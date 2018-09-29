/**
	 @Name：hayui.actualsize 【隐藏元素的尺寸】
	 @Author：hallelujah
	 */
hayui.define('jquery', function(exports) {
	"use strict";

	var $ = hayui.$,
		MOD_NAME = 'actualsize';

	var actualsize = {
		config: {},
		set: function(options) {
			var that = this;
			that.config = $.extend({}, that.config, options);
			return that;
		}
	};

	//Class struct
	var Class = function(options) {
		var that = this;
		that.config = $.extend({}, that.config, actualsize.config, options);
	};

	//global set
	Class.prototype.set = function(options) {
		var that = this;
		$.extend(true, that.config, options);
		return that;
	};

	//config
	Class.prototype.config = {
		elem:'',
		absolute: false,
		clone: true,
		includeMargin: false,
		display: 'block'
	};

	Class.prototype.render = function(method) {
		var that = this,
			o = that.config,
			$target = o.elem;

		if (!$target[method]) {
			throw '$.actual => The jQuery method "' + method + '" you called does not exist';
		}

		var fix, restore;
		if (o.clone === true) {
			fix = function() {
				var style = 'position: absolute !important; top: -1000 !important;';
				// this is useful with css3pie
				$target = $target.clone().attr('style', style).appendTo('body');
			};

			restore = function() {
				// remove DOM element after getting the width
				$target.remove();
			};
		} else {
			var tmp = [];
			var style = '';
			var $hidden;

			fix = function() {
				// get all hidden parents
				$hidden = $target.parents().addBack().filter(':hidden');
				style += 'visibility: hidden !important; display: ' + o.display + ' !important; ';

				if (o.absolute === true) style += 'position: absolute !important; ';

				// save the origin style props
				// set the hidden el css to be got the actual value later
				$hidden.each(function() {
					// Save original style. If no style was set, attr() returns undefined
					var $this = $(this);
					var thisStyle = $this.attr('style');

					tmp.push(thisStyle);
					// Retain as much of the original style as possible, if there is one
					$this.attr('style', thisStyle ? thisStyle + ';' + style : style);
				});
			};

			restore = function() {
				// restore origin style values
				$hidden.each(function(i) {
					var $this = $(this);
					var _tmp = tmp[i];

					if (_tmp === undefined) {
						$this.removeAttr('style');
					} else {
						$this.attr('style', _tmp);
					}
				});
			};
		}

		fix();
		// get the actual value with user specific methed
		// it can be 'width', 'height', 'outerWidth', 'innerWidth'... etc
		// o.includeMargin only works for 'outerWidth' and 'outerHeight'
		var actual = /(outer)/.test(method) ? $target[method](o.includeMargin) : $target[method]();

		restore();
		// IMPORTANT, this plugin only return the value of the first element
		return actual;
	};

	//core enter
	actualsize.actual = function(method, options) {
		var inst = new Class(options);
		return inst.render(method);
	};

	exports(MOD_NAME, actualsize);
});