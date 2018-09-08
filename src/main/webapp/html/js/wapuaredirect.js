// PC auto adapt WAP according as meta
var getCookie = function(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1) c_end = document.cookie.length;
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return '';
};

if (!getCookie('pc_m').length) {
	if (!window.location.hash.match("fromapp")) {
		if ((navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad|android|ios)/i))) {
			var wapuaredirect = (function() {
				var uaredirect = function(f) {
					try {
						if (document.getElementById("bdmark") != null) {
							return;
						}
						var b = false;
						if (arguments[1]) {
							var e = window.location.host;
							var a = window.location.href;
							if (isSubdomain(arguments[1], e) == 1) {
								f = f + "/#m/" + a;
								b = true;
							} else {
								if (isSubdomain(arguments[1], e) == 2) {
									f = f + "/#m/" + a;
									b = true;
								} else {
									f = a;
									b = false;
								}
							}
						} else {
							b = true;
						}
						if (b) {
							location.replace(f);
						}
					} catch (d) {}
				};
				var isSubdomain = function(c, d) {
					this.getdomain = function(f) {
						var e = f.indexOf("://");
						if (e > 0) {
							var h = f.substr(e + 3);
						} else {
							var h = f;
						}
						var g = /^www\./;
						if (g.test(h)) {
							h = h.substr(4);
						}
						return h;
					};
					if (c == d) {
						return 1;
					} else {
						var c = this.getdomain(c);
						var b = this.getdomain(d);
						if (c == b) {
							return 1;
						} else {
							c = c.replace(".", "\\.");
							var a = new RegExp("\\." + c + "$");
							if (b.match(a)) {
								return 2;
							} else {
								return 0;
							}
						}
					}
				};
				return {
					uaredirect: function() {
						var wapagent = document.getElementsByName('mobile-agent');
						var url = wapagent ? wapagent[0].getAttribute('content') : null;
						url = url && url.length ? url.split('url=') : [];
						url = url && url.length == 2 ? url[1] : '';
						url && url.length && uaredirect(url);
					}
				};
			})();
			wapuaredirect.uaredirect();
		}
	}
}