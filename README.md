# Usage

`$.SmoothOp(arrOfSrc, options);`

Options are : 

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

```
arrOfSrc = [
	{
		latency : 1000,
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