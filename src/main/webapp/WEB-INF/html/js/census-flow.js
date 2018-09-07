var str=navigator.userAgent.toLowerCase();
var regex=/^bot|spider|crawl|nutch|lycos|robozilla|slurp|search|seek|archive$/;
if(!(regex.test(str) || str == ""))
{
	var a5tf = "";
	try {
		a5tf = top.document.referrer;
	} catch (e) { }

	var a5pu = "";
	try {
		a5pu = window.parent.location;
	} catch (e) { }

	var a5pf = "";
	try {
		a5pf = window.parent.document.referrer;
	} catch (e) { }

	var a5guid = '';
	try {
		a5guid = document.cookie.match(new RegExp("(^| )cguid=([^;]*)(;|$)"));
		a5guid = (a5guid == null || a5guid == undefined) ? '' : (a5guid)[2];
	} catch (e) { }

	var a5of = document.referrer;
	if (a5pf !== "") { a5of = a5pf; }
	if (a5tf !== "") { a5of = a5tf; }
	a5of = a5of.length > 100 ? a5of.substring(0, 100) : a5of;
	
	var a5op = a5pu;
	var a5su = window.location;
	try {
		lainframe
	} catch (e) {
		a5op = a5su;
	}

	a5src = 'http://data.cj.qipeiren.com/caiji?cguid=' + a5guid + '&tcomid='+tcomid+'&dataformtype='+dftype+'&vpage=' + escape(a5op) + '&referrer=' + escape(a5of)+  '&vproid=' + (("undefined" == typeof vproid) ? 0 : vproid);
	setTimeout('a5img = new Image;a5img.src=a5src;', 0);
}