/**
 * SendCode Plugin
 */
! function(window, $) {
	"use strict";

	function SendCode(element, options) {
		this.$btn = $(element);
		this.options = $.extend({}, SendCode.DEFAULTS, options || {});
	}

	SendCode.DEFAULTS = {
		run: false, // 是否自动倒计时
		secs: 60, // 倒计时时长（秒）
		disClass: '', // 禁用按钮样式
		runStr: '{%s}秒后重新获取', // 倒计时显示文本
		resetStr: '重新获取验证码', // 倒计时结束后按钮显示文本
		storageKey: null //刷新页面倒计时继续
	};

	SendCode.timer = null;

	/**
	 * 开始倒计时
	 */
	SendCode.prototype.start = function(lastSecond) {
		var _this = this,
			options = _this.options,
			secs = options.secs;

		var second = lastSecond ? lastSecond : secs;
		if (options.storageKey) {
			var runSecond = new Date().getTime() + second * 1000;
			window.sessionStorage.setItem(options.storageKey, runSecond);
		}

		_this.$btn.html(_this.getStr(second)).css('pointer-events', 'none').addClass(options.disClass);

		_this.timer = window.setInterval(function() {
			second--;
			_this.$btn.html(_this.getStr(second));
			if (second <= 0) {
				_this.resetBtn();
				clearInterval(_this.timer);
			}
		}, 1000);
	};

	/**
	 * 彻底停止倒计时
	 */
	SendCode.prototype.stop = function(){
		var that = this,
			options = that.options;
		that.timer && window.clearInterval(that.timer);
		that.$btn.data('jqelem.sendcode', null);
		window.sessionStorage.removeItem(options.storageKey);
	};

	/**
	 * 获取倒计时显示文本
	 * @param secs
	 * @returns {string}
	 */
	SendCode.prototype.getStr = function(secs) {
		return this.options.runStr.replace(/\{([^{]*?)%s(.*?)\}/g, secs);
	};

	/**
	 * 重置按钮
	 */
	SendCode.prototype.resetBtn = function() {
		var _this = this,
			options = _this.options;

		_this.$btn.html(options.resetStr).css('pointer-events', 'auto').removeClass(options.disClass);
	};

	function Plugin(option) {
		var args = Array.prototype.slice.call(arguments, 1);

		return this.each(function() {
			var $this = $(this),
				sendcode = $this.data('jqelem.sendcode');

			if (!sendcode) {
				$this.data('jqelem.sendcode', (sendcode = new SendCode(this, option)));

				var lastSecond = ~~((window.sessionStorage.getItem(option.storageKey) - new Date().getTime()) / 1000);
				if (lastSecond > 0 && option.storageKey) {
					sendcode.run = true;
					sendcode.start(lastSecond);

				} else if (typeof option == 'object' && option.run) {
					sendcode.start();
				}
			}
			if (typeof option == 'string') {
				sendcode[option] && sendcode[option].apply(sendcode, args);
			}
		});
	}

	$.fn.sendCode = Plugin;
}(window, jQuery);