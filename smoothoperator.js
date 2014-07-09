/* Usage */
/*
options are : 
url : your latency probing url
low : your low latency threshold in ms
medium : your medium latency threshold in ms
high : your high latency threshold in ms
targetElemet : where to append the results

arrOfSrc is an array containing objects with :
latency : the proper latency for this source
src : the source of this element
tag : the element type

example : 
arrOfSrc = [
	{
		latency : 'high',
		src : '/static/smallimage.jpg',
		tag : 'img'
	}
]
options = {
	url : '/ping',
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
			var latency;
			if (delta < options.low) { // low latency
				latency = 'low';
			} else if (delta < options.medium) { // medium latency
				latency = 'medium';
			} else if (delta > options.high) { // high latency
				latency = 'high';
			}
			// now load the arrOfSrc and append to target based on latency
			arrOfSrc.forEach(function (el) {
				if (el.latency === latency || el.latency === 'all') {
					var element = document.createElement(el.tag);
					element.src = el.src;
					$(element).appendTo(options.targetElement);
				}
			});
			console.log('Finished adding proper elements');
		}).fail(function () {
			throw new Error('Remote server not responding');
		});
	};
})(jQuery);