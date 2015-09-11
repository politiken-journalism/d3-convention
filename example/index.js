var c = require('..')()

c.svg.append('rect')
    .attr({
      width: c.x(1), // 50% wide
      height: c.y(0), // 50% high

      x: c.x(0), // Center horizontally
      y: c.y(1) // Center vertically
    })
