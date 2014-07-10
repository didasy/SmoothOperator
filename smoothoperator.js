/* Usage */
/*
USE NAIVE BANDWIDTH DETERMINATION FOR NOW (fileSize / (latency/2))

options are : 
url : your latency probing url or where file bandwidth.dat results
lowLat : your low latency in ms
mediumLat : your medium latency in ms
highLat : your high latency in ms
lowBw : your low bandwidth in kB/s
mediumBw : your medium bandwidth in kB/s
highBw : your high bandwidth in kB/s
targetElemet : where to append the results
type : type of method

arrOfSrc is an array containing objects with :
latency : the proper latency for this source
bandwidth : the proper bandwidth for this source
src : the source of this element
tag : the element type

example : 
arrOfSrc = [
	{
		latency : 'high',
		src : '/static/smallimage.jpg',
		tag : 'img',
		targetElement : '.image'
	}
]
options = {
	url : '/ping',
	type : 'latency'
	low : 150,
	medium : 300,
	high : 600,
	targetElement : 'head'
}
*/
;(function ($) {
	'use strict';
	$.SmoothOp = function (arrOfSrc, options) {
		// test the water
		var now = Date.now();
		$.get(options.url).done(function (data) {
			// check the threshold
			var delta = Date.now() - now;
			var latency, bw;
			if (options.type === 'latency') {
				if (delta <= options.lowLat) { // low latency
					latency = 'low';
				} else if (delta <= options.mediumLat) { // medium latency
					latency = 'medium';
				} else if (delta <= options.highLat || delta > options.highLat) { // high latency
					latency = 'high';
				}
			} else if (options.type === 'bandwidth') {
				bw = 102.4 / ((delta / 1000) / 2); // in kB/s
				if (bw <= options.lowBw) { // low bandwidth
					bw = 'low';
				} else if (bw <= options.mediumBw) {
					bw = 'medium';
				} else if (bw <= options.highBw || bw > options.highBw) {
					bw = 'high';
				}
			} else if (options.type === 'bandwidth latency' || options.type === 'latency bandwidth') {
				bw = 102.4 / ((delta / 1000) / 2); // in kB/s
				if (bw <= options.lowBw) { // low bandwidth
					bw = 'low';
				} else if (bw <= options.mediumBw) {
					bw = 'medium';
				} else if (bw <= options.highBw || bw > options.highBw) {
					bw = 'high';
				}
				if (delta <= options.lowLat) { // low latency
					latency = 'low';
				} else if (delta <= options.mediumLat) { // medium latency
					latency = 'medium';
				} else if (delta <= options.highLat || delta > options.highLat) { // high latency
					latency = 'high';
				}
			}
			// now load the arrOfSrc and append to target based on latency
			arrOfSrc.forEach(function (el) {
				if (options.type === 'latency' && ( el.latency === latency || el.latency === 'all' )) {
					var element = document.createElement(el.tag);
					element.src = el.src;
					if (!el.targetElement) {
						return $(element).appendTo(options.targetElement);
					}
					$(element).appendTo(el.targetElement);
				} else if (options.type === 'bandwidth' && ( el.bandwidth === bw || el.bandwidth === 'all' )) {
					var element = document.createElement(el.tag);
					element.src = el.src;
					if (!el.targetElement) {
						return $(element).appendTo(options.targetElement);
					}
					$(element).appendTo(el.targetElement);
				} else if ((options.type === 'bandwidth latency' || options.type === 'latency bandwidth') && ( (el.bandwidth === bw || el.bandwidth === 'all') && (el.latency === latency || el.latency === 'all') )) {
					var element = document.createElement(el.tag);
					element.src = el.src;
					if (!el.targetElement) {
						return $(element).appendTo(options.targetElement);
					}
					$(element).appendTo(el.targetElement);
				}
			});
			console.log('Finished adding proper elements');
		}).fail(function () {
			throw new Error('Remote server not responding');
		});
	};
})(jQuery);