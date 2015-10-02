`d3-convention`
===============

D3 [Margin Convention](http://bl.ocks.org/mbostock/3019563) encoded as an npm package. Idea "forked" from [1wheel/d3-starterkit](https://github.com/1wheel/d3-starterkit)

Installation
------------

`d3-convention` depends on `d3` as a peer dependency

```bash
npm install d3 d3-convention
```

Example
-------

```js
var c = require('d3-convention')()

c.svg.append('rect')
    .attr({
      width: c.x(0.5), // 50% wide
      height: c.y(0.5), // 50% high

      x: c.x(0.25), // Center horizontally
      y: c.y(0.75) // Center vertically
    })
    .style('fill', 'steelblue')
```

Reference
---------

All options have sane defaults, however `d3Convention([opts])` accepts:

```js
var c = d3Convention({
  margin: Number || {top: Number, right: Number, bottom: Number, left: Number},
  width: Number,
  height: Number,

  parent: DOMElement || String || d3.select,
  svg: SVGElement || String || d3.select // preferably SVGSVGElement
})
```

It will mutate the originally passed `opts` Object, with these properties:

* `c.margin` is an Object with the properties `{top, right, bottom, left}` either
  the originally passed `opts.margin` object, an object expanded from the Number
  passed or the default `{top: 20, right: 10, bottom: 20, left: 10}`
* `c.width` is the "scene" width **excluding** margin on the left and
  right side. Defaults to `960 - margin.left - margin.right = 940`
* `c.height`, under the same constraints as `c.width`. Defaults to `460`
* `c.outerWidth` the width of the SVG element. Calculated from
  `c.width + c.margin.left + c.margin.right`. Default resolves to `960`
* `c.outerHeight` the actual height of the "drawing scene". Calculated from
  `c.height + c.margin.top + c.margin.bottom`. Default resolves to `500`
* `c.parent` is either the passed `opts.parent` or a D3 selection with the `body`
  element. This is where the `c.svg` element is inserted, unless `opts.svg` is passed, in which case this property is ignored
* `c.svg` is a newly inserted `<g>` element which is `translate`d. We will try
  to set the `width` and `height` attrs of this, as well as appending a `<g>`
  element which is translated. However specifying `opts.svg` allows you to some
  of your SVG markup and just insert the conventions in a child node, eg. if you
  hardcode something like a legend
* `c.x` is a `d3.scale.linear` scale that maps `[0, 1] -> [0, opts.innerWidht]`
* `c.y` is a flipped `d3.scale.linear` scale so that `0` is at the bottom of the
  scene. It maps `[0, 1] -> [opts.innerHeight, 0]` (note the upside-downness)

```js
{
  margin: {top: Number, right: Number, bottom: Number, left: Number},
  width: opts.width || 960,
  height: opts.height || 500,

  innerWidth: Number,
  innerHeight: Number,

  parent: d3.select(opts.parent || HTMLBodyElement),
  svg: s3.select(SVGGElement),

  x: d3.scale.linear,
  y: d3.scale.linear
}
```

Notable Differences
-------------------

`d3-convention` was inspired by [Block #3019563](http://bl.ocks.org/mbostock/3019563)
and [1wheel/d3-starterkit](https://github.com/1wheel/d3-starterkit).

It differs from `d3-starterkit` in several ways:

* `margin` is subtracted, where `d3-starterkit` adds `margin` to your specified
  `width` and `height`
* This does not return the same breadth of scales by default
* This does not return any axis
* `parentSel` is `parent`. This lets you pass whatever `d3.select` accepts, it
  being `Element`, selector or an existing `d3.select`ion

License
-------

[ISC](LICENSE)
