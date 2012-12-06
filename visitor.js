/*Adds classes to the body to signify the users freshness on the site be it new, first time today, or returning after months   */
/*global alert, document, visitor, window, keys*/
var visitor = visitor || {};
  
/*sets some variables*/
visitor.lastVisit = false;
visitor.classPrefix = 'visitor-';
visitor.bodyClass = 'first-Visit';

visitor.tests = {
	60000: "now", //minute
	3600000: "fresh", //hour
	86400000: "today", //day
	604800000: "thisWeek", //week
	2630000000: "thisMonth" //month
};

/*sets the last visit cookie*/
visitor.setCookie = function (name) {
	"use strict";
	document.cookie = name + "=" + encodeURI(new Date().getTime()) + ";expires=" + new Date(new Date().getTime() + 630720000).toGMTString();
};

/*gets the last visit cookie*/
visitor.readCookie = function (name) {
	"use strict";
	var re = new RegExp('[; ]' + name + '=([^\\s;]*)'),
		sMatch = (' ' + document.cookie).match(re);
	if (sMatch) {
		return encodeURI(sMatch[1]);
	}
	return '';
};

/*sets the last visit value*/
visitor.setVisit = function (name) {
	"use strict";
	if (window.localStorage) {
		window.localStorage.setItem(name, new Date().getTime());
	}
	// set a cookie
	visitor.setCookie(name);
};

/*gets the last visit value*/
visitor.getVisit = function (name) {
	"use strict";
	if (window.localStorage) {
		return window.localStorage.getItem(name);
	}
	// return from cookie
	visitor.readCookie(name);
};

/*compairs the last visit to the current visit and appens the appropriate class name to body*/
visitor.compairVisit = function () {
	"use strict";
	var visit = visitor.getVisit('lastVisit'),
		diff = Math.floor((+visit - new Date().getTime()) / 1000),
		i = Object.keys(visitor.tests).length,
		k,
		v;
	if (visit === null) {
		visitor.setVisit('firstVisit');
		document.body.className += ' ' + visitor.classPrefix + visitor.bodyClass;
	}
	while (i >= 0) {
		i -= 1;
		k = Object.keys(visitor.tests)[i];
		v = visitor.tests[Object.keys(visitor.tests)[i]];
		if (diff <= k) {
			visitor.bodyClass = v;
		}
	}
	document.body.className += ' ' + visitor.classPrefix + visitor.bodyClass;
};

visitor.compairVisit();
visitor.setVisit('lastVisit');