var test = require('tape')
var d3Convention = require('.')

function reset () {
  /**
   * Minimal reset.css for reliable `elm.offset*`
   */
  document.body.parentElement.style.margin = 0
  document.body.parentElement.style.padding = 0
  document.body.style.margin = 0
  document.body.style.padding = 0

  // Reset the body between tests
  document.body.innerHTML = ''
}

test('Basic usage with sane defaults', function (assert) {
  reset()
  var c = d3Convention()

  assert.deepEqual(
    c.margin,
    {top: 20, right: 10, bottom: 20, left: 10},
    'Default `margin: 20px 10px`'
  )

  assert.equal(c.width, 940, 'Default `width: 940px`')
  assert.equal(c.height, 460, 'Default `height: 460px`')

  assert.equal(window.document.querySelector('svg').offsetWidth, 960, 'offsetWidth === width')
  assert.equal(window.document.querySelector('svg').offsetHeight, 500, 'offsetHeight === height')

  assert.ok(c.parent.node() instanceof window.HTMLBodyElement, 'c.parent is <body> element')
  assert.ok(c.svg.node() instanceof window.SVGGElement, 'c.svg is <g> element')

  var rectNode = c.svg.append('rect').attr({
    width: c.x(1),
    height: c.y(0),

    x: c.x(0),
    y: c.y(1)
  }).node()

  var rectOffset = rectNode.getBoundingClientRect()
  var rectBBox = rectNode.getBBox()

  assert.equal(rectOffset.left, 10, '<g> is translated x')
  assert.equal(rectOffset.top, 20, '<g> is translated y')

  assert.looseEqual(rectNode.attributes.x.value, 0, 'c.x(0) maps to 0')
  assert.looseEqual(rectNode.attributes.y.value, 0, 'c.y(1) maps to 0')

  assert.equal(rectBBox.width, 940, 'c.x(1) maps to 940 === c.innerHeight')
  assert.equal(rectBBox.height, 460, 'c.y(0) maps 460 === to c.innerHeight')

  assert.end()
})

test('Margin being a number', function (assert) {
  reset()
  var c = d3Convention({
    margin: 30
  })

  assert.deepEqual(
    c.margin,
    {top: 30, right: 30, bottom: 30, left: 30},
    'expands single number to margin object'
  )

  var rectNode = c.svg.append('rect').attr({
    width: c.x(1),
    height: c.y(0),

    x: c.x(0),
    y: c.y(1)
  }).node()

  var rectOffset = rectNode.getBoundingClientRect()
  var rectBBox = rectNode.getBBox()

  assert.equal(rectOffset.left, 30, '<g> is translated x')
  assert.equal(rectOffset.top, 30, '<g> is translated y')

  assert.looseEqual(rectNode.attributes.x.value, 0, 'c.x(0) maps to 0')
  assert.looseEqual(rectNode.attributes.y.value, 0, 'c.y(1) maps to 0')

  assert.equal(rectBBox.width, c.width, 'c.x(1) === c.width')
  assert.equal(rectBBox.height, c.height, 'c.y(0) === to c.height')

  assert.end()
})
