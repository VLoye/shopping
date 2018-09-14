var EXPOSURE = (function($) {
	var fterexp = ['.qipeiren.com/supply/supply-', '.qipeiren.com/product/detail/', '.qipeiren.com/offer/'];
	var trsexp = [/http:\/\/www\.qipeiren\.com\//, /http:\/\/mall\.qipeiren\.com\//, /http:\/\/m\.qipeiren\.com\//, /supply\/supply-/, /offer\//, /product\/detail\//, /\.htm/];
	var trsval = ['p', 'p', 'm', 'w', 'w', 'm', ''];
	var research = 'a[href^="http://"]';

	var _filter = function(str) {
		var res = [];
		$.each(fterexp, function(idx, s) {
			if (str.indexOf(s) != -1) {
				res.push(s);
			}
		});
		return res.length > 0;
	};
	var _trans = function(str) {
		var res = str;
		$.each(trsexp, function(idx, trsi) {
			res = res.replace(trsi, trsval[idx]);
		});
		return res;
	};

	var _census = function(elem) {
		var lastArr = [];
		$(research, $(elem)).filter(function(index) {
			var href = $(this).attr('href').toLowerCase();
			if (_filter(href)) {
				var last = _trans(href);
				if ($.inArray(last, lastArr) < 0) {
					lastArr.push(last);
				}
			}
		});
		return lastArr;
	};

	var _isCanTrans = function() {
		var str = navigator.userAgent.toLowerCase();
		var regex = /^bot|spider|crawl|nutch|lycos|robozilla|slurp|search|seek|archive$/;
		return !(regex.test(str) || str == "");
	};

	var _transmit = function(elem) {
		if (_isCanTrans()) {
			var pidstr = _census(elem);
			//http://bigdata.qipeiren.com/
			pidstr && pidstr.length && setTimeout('a5img = new Image;a5img.src="http://data.cj.qipeiren.com/caiji/bg?pidstr=' + encodeURIComponent(pidstr) + '";', 0);
		}
	};
	return {
		censusbg: function(elem) {
			return _transmit(elem);
		}
	};
})(jQuery);
$(function() {
	EXPOSURE.censusbg('body');
});