'use strict'

var d3 = require('d3')

module.exports = function (opts) {
  if (opts === undefined) opts = {}

  if (opts.margin === undefined) opts.margin = {top: 20, right: 10, bottom: 20, left: 10}
  if (typeof opts.margin === 'number') opts.margin = {top: opts.margin, right: opts.margin, bottom: opts.margin, left: opts.margin}
  // TODO: Add CSS replication conventions here

  if (opts.width === undefined) opts.width = 960
  if (opts.height === undefined) opts.height = 500

  opts.innerWidth = opts.width - opts.margin.left - opts.margin.right
  opts.innerHeight = opts.height - opts.margin.top - opts.margin.bottom

  // This prop is redundant if opts.svg is defined
  if (opts.parent === undefined || opts.svg !== undefined) {
    opts.parent = d3.select('body', window.document)
  } else {
    opts.parent = d3.select(opts.parent)
  }

  if (opts.svg === undefined) opts.svg = opts.parent.append('svg')
  else opts.svg = d3.select(opts.svg)

  opts.svg = opts.svg
      .attr({
        width: opts.width,
        height: opts.height
      })
    .append('g')
      .attr('transform', 'translate(' + [opts.margin.left, opts.margin.top].join() + ')')

  opts.x = d3.scale.linear().range([0, opts.innerWidth])
  opts.y = d3.scale.linear().range([opts.innerHeight, 0])

  return opts
}
