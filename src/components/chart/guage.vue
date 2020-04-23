<template>
  <div class="chart-wrapper">
    <svg
      width="350"
      height="200"
    />
  </div>
</template>

<script>
import * as d3 from 'd3'
export default {
  props: {
    dataset: {
      type   : Object,
      default: () => {}
    },
    width: {
      type   : Number,
      default: 350
    },
    height: {
      type   : Number,
      default: 200
    }
  },
  data () {
    return {
      size                : 290,
      arcInset            : 150,
      arcWidth            : 60,
      minValue            : 0,
      maxValue            : 100,
      minAngle            : -90,
      maxAngle            : 100,
      transitionMs        : 500,
      currentLabelFontSize: 20,
      currentLabelInsert  : 20
    }
  },
  computed: {
    or () { return this.size - this.arcInset },
    ir () { return this.size - this.or - this.arcWidth },
    arc () {
      return d3
        .arc()
        .innerRadius(this.ir)
        .outerRadius(this.or)
        .startAngle(this.deg2rad(90))
    },
    value () {
      const total = this.dataset['total']
      const value = this.dataset['value']
      return parseFloat(value / total * 100)
    }
  },
  watch: { dataset () { this.update() } },
  created () {
    this.arcInset = this.size / 2
    this.arcWidth = this.arcInset / 3.5
  },
  mounted () {
    this.render()
    this.update()
  },
  methods: {
    deg2rad(deg) { return (deg * Math.PI) / 180 },
    render () {
      const svg = d3.select(this.$el).select('svg')
      const defs = svg.append('defs')

      const pg = defs
        .append('linearGradient')
        .attr('id', 'mainGradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '0%')

      pg.append('stop')
        .attr('stop-color', '#f44336')
        .attr('class', 'stop-left')
        .attr('offset', 0)
      pg.append('stop')
        .attr('stop-color', '#F9E557')
        .attr('class', 'stop-center')
        .attr('offset', 0.33)
      pg.append('stop')
        .attr('stop-color', '#F9E557')
        .attr('class', 'stop-center')
        .attr('offset', 0.66)
      pg.append('stop')
        .attr('stop-color', '#45B349')
        .attr('class', 'stop-right')
        .attr('offset', 1)
        
      const g = svg
        .append('g')
        .attr('transform', `translate(${this.width / 2},${this.height / 1.2})`)
      
      g.append('path')
        .datum({ endAngle: this.deg2rad(-90) })
        .attr('class', 'gaugeBackground')
        .attr('fill', 'url(#mainGradient)')
        .attr('d', this.arc)

      g.append('text')
        .attr('transform', `translate(0, ${-(this.currentLabelInsert + this.ir) / 2})`)
        .attr('class', 'percent-value')
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em')
        .style('font-size', '1.6em')
        .text(Number(this.value).toPrecision(3))

      g.append('text')
        .attr('transform', `translate(0, ${-(this.currentLabelInsert + this.ir) / 2})`)
        .attr('class', 'percent-value')
        .attr('text-anchor', 'middle')
        .attr('dy', '2em')
        .attr('fill', '#6a6a6a')
        .style('font-size', '1.2em')
        .text('Complete Progress')

      g.append('line')
        .attr('class', 'line-front')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', -110)
        .attr('y2', 0)
        .attr('stroke-width', 1)
        .attr('stroke', 'rgba(0,0,0,0.5)')

      g.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 1)
        .attr('fill', '#fff')
        .attr('stroke', 'rgba(0,0,0,0.5)')
        .attr('stroke-width', 2.5)

      g.append('text')
        .attr('transform', 'translate(' + (this.ir + (this.or - this.ir) / 2) + ',15)')
        .attr('text-anchor', 'middle')
        .style('font-size', '1em')
        .style('font-family', this.labelFont)
        .text('High')

      g.append('text')
        .attr('transform', 'translate(' + -(this.ir + (this.or - this.ir) / 2) + ',15)')
        .attr('text-anchor', 'middle')
        .style('font-size', '1em')
        .style('font-family', this.labelFont)
        .text('Low')
    },
    update () {
      const value = this.value
      const maxValue = this.maxValue

      const line = d3.select(this.$el).select('.line-front')
      const text = d3.select(this.$el).select('.percent-value')

      line
        .transition()
        .ease(d3.easeLinear)
        .duration(this.transitionMs)
        .attrTween('transform', () => {
          const inter = d3.interpolate(0, value)
          return t => {
            const v = inter(t)
            const r = 180 * v / maxValue
            const p = Number(v).toPrecision(3)
            text.text(p)
            return `translate(0, 0) rotate(${r})`
          }
        })

    }
  }
}
</script>
<style lang="scss" scoped>
.chart-wrapper {
  text-align: center;
}
</style>