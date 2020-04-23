<template>
  <div class="chart-wrapper">
    <svg
      width="100%"
      height="100%"
      :viewBox="`0 0 ${width} ${height}`"
      preserveAspectRatio="xMidYMid meet"
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
      default: 100
    },
    height: {
      type   : Number,
      default: 100
    },
    dataColor: {
      type   : String,
      default: '#acd145'
    },
    inverse: {
      type   : Boolean,
      default: false
    },
    title: {
      type   : String,
      default: 'Value'
    }
  },
  data () {
    return {
      background: null,
      tweenVal  : null
    }
  },
  computed: {
    value () {
      const total = this.dataset['total']
      const value = this.dataset['value']
      return parseFloat(value / total)
    },
    radius () { return Math.min(this.width, this.height) / 2 },
    outerArc () {
      return d3.arc()
        .outerRadius(this.radius)
        .innerRadius(this.radius * 0.8)
        .startAngle(0)
        .endAngle(d => {
          const v = 2 * Math.PI * d
          return this.inverse ? -1 * v : v
        })
    }
  },
  watch: { dataset () { this.updateData() } },
  created () {
    this.background = this.outerArc(1)
    this.tweenVal = this.outerArc(this.value)
  },
  mounted () {
    this.render()
    this.updateData()
  },
  methods: {
    render () {
      const svg = d3.select(this.$el).select('svg')
      const g = svg
        .append('g')
        .attr('transform', `translate(${this.width / 2},${this.height / 2})`)
      g
        .append('path')
        .attr('fill', '#efefef')
        .attr('d', this.background)
      g
        .append('path')
        .attr('class', 'value-path')
        .attr('d', this.tweenVal)
        .attr('fill', this.dataColor)

      g
        .append('text')
        .attr('class', 'center-value')
        .attr('transform', 'translate(0,-5)')
        .attr('text-anchor', 'middle')
        .attr('font-size', '1.4em')
        .text(this.dataset['value'])

      g
        .append('text')
        .attr('transform', 'translate(0,15)')
        .attr('font-size', '1.1em')
        .attr('text-anchor', 'middle')
        .attr('fill', '#8a8a8a')
        .attr('dy', '0.35em')
        .text(this.title)
    },
    updateData () {
      const oldVal = this.tweenVal
      const newVal = this.value
      const outerArc = this.outerArc
      const centerValue = this.dataset['value']

      const tweenPath = d3.select(this.$el).select('.value-path').attr('d', oldVal)
      const tweenText = d3.select(this.$el).select('.center-value')

      tweenPath
        .transition()
        .ease(d3.easeLinear)
        .duration(500)
        .attrTween('d', () => {
          const inter = d3.interpolate(0, newVal)
          const interText = d3.interpolate(0, centerValue)
          return t => {
            const v = inter(t)
            const c = parseInt(interText(t)).toLocaleString('en')
            tweenText.text(c)
            return outerArc(v)
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.chart-wrapper {
  display: grid;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  svg {
    path {
      shape-rendering: geometricPrecision;
    }
  }
}
</style>