# Usage

`$.SmoothOp(arrOfSrc, options);`

Options are : 

url : your latency probing url (target to path containing bandwidth.dat file if you use bandwidth mode)

lowLat : your low latency threshold in ms

mediumLat : your medium latency threshold in ms

highLat : your high latency threshold in ms

lowBw : your low bandwidth threshold in kB/s

mediumBw : your medium bandwidth threshold in kB/s

highBw : your high bandwidth threshold in kB/s

targetElement : where to append the results (append all of arrOfSrc to this element)

type : `"bandwidth" | "latency" | "bandwidth latency" | "latency bandwidth"`

arrOfSrc is an array containing objects with :

latency : the proper latency for this source >> `"low" | "medium" | "high" | "all"`

bandwidth : the proper bandwidth for this source >> `"low" | "medium" | "high" | "all"`

src : the source of this element

tag : the element type

targetElement : target element for this and only this source

example : 

```
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
$.SmoothOp(arrOfSrc, options);
```


## DEMO
`npm install -g http-server` then move to this directory, then `http-server`. Now you can visit `http://localhost:8080` with your browser.