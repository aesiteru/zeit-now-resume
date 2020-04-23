<template>
  <div class="chart-wrapper">
    <svg
      width="420"
      height="330"
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
      default: 420
    },
    height: {
      type   : Number,
      default: 330
    },
    colorSet: {
      type   : String,
      default: 'schemeSet2'
    }
  },
  computed: {
    radius () {
      return Math.min(this.width, this.height) / 2
    },
    pie () {
      return d3.pie().value(d => d['value']).sort(null)
    },
    arc () {
      return d3
        .arc()
        .innerRadius(this.radius * 0.7)
        .outerRadius(0)
        .padAngle(0.01)
        .cornerRadius(1)
    },
    outerArc () {
      return d3.arc()
        .innerRadius(this.radius * 0.7)
        .outerRadius(this.radius * 0.7)
    },
  },
  watch: {
    dataset () {
      this.update()
    }
  },
  mounted () {
    this.render()
    this.update()
  },
  methods: {
    values () {
      const colorSet = d3[this.colorSet]
      return Object.entries(this.dataset)
        .filter(d => d[1] > 0)
        .map((d, i) => {
          return {
            category: d[0],
            value   : d[1],
            color   : colorSet[i]
          }
        })
    },
    render () {
      const values = this.values()
      const svg = d3.select(this.$el).select('svg')
      const midAngle = (d) => { return d.startAngle + (d.endAngle - d.startAngle) / 2}
      const slices = svg.append('g')
        .attr('class', 'slices')
        .attr('transform', `translate(${this.width / 2},${this.height / 2})`)
        .selectAll('.slice')
        .data(this.pie(values))
        .enter()

      slices
        .append('path')
        .attr('class', 'slice')
        .attr('fill', d => d.data.color)
        .attr('d', d => this.arc(d))

      slices
        .append('polyline')
        .attr('fill', 'none')
        .attr('stroke', '#666')
        .attr('stroke-width', 1)
        .attr('opacity', 0.3)
        .attr('points', d => {
          const pos = this.outerArc.centroid(d)
          pos[0] = this.radius * 0.8 * (midAngle(d) < Math.PI ? 1 : -1)
          return [ this.outerArc.centroid(d), pos ]
        })

      slices
        .append('text')
        .attr('class', 'label')
        .attr('transform', d => {
          const pos = this.outerArc.centroid(d)
          pos[0] = this.radius * 0.8 * (midAngle(d) < Math.PI ? 1 : -1)
          return `translate(${pos})`
        })
        .attr('dx', d => (midAngle(d)) < Math.PI ? '.3em' : '-.3em')
        .attr('dy', '.3em')
        .attr('fill', '#aaa')
        .attr('text-anchor', d => {
          return (midAngle(d)) < Math.PI ? 'start' : 'end'
        })
        .text(d => d.data.category)
        .append('tspan')
        .attr('fill', '#333')
        .attr('dx', '.3em')
        .text(d => Number(d.data.value).toLocaleString('en'))

    },
    update () {
      const values = this.values()
      const arc = this.arc
      const generator = d3.pie().sort(null)
      const angleInterpolation = d3.interpolate(generator.startAngle()(), generator.endAngle()())
      const midAngle = (d) => { return d.startAngle + (d.endAngle - d.startAngle) / 2}
      
      d3.select(this.$el).select('.slices').selectAll('.slice').remove()
      d3.select(this.$el).select('.slices').selectAll('text').remove()
      d3.select(this.$el).select('.slices').selectAll('polyline').remove()

      const slice = d3
        .select('.slices')
        .selectAll('.slice')
        .data(this.pie(values))
        .enter()

      slice
        .append('path')
        .attr('class', 'slice')
        .attr('d', d => this.arc(d))
        .attr('fill', 'none')
        .transition()
        .ease(d3.easeLinear)
        .duration(500)
        .attr('fill', d => d.data.color)
        .attrTween('d', d => {
          const originalEnd = d.endAngle
          return t => {
            const currentAngle = angleInterpolation(t)
            if(currentAngle < d.startAngle) return ''
            d.endAngle = Math.min(currentAngle, originalEnd)
            return arc(d)
          }
        })

      slice
        .append('polyline')
        .attr('fill', 'none')
        .attr('stroke', '#666')
        .attr('stroke-width', 1)
        
        .attr('points', d => {
          const pos = this.outerArc.centroid(d)
          pos[0] = this.radius * 0.8 * (midAngle(d) < Math.PI ? 1 : -1)
          return [ this.outerArc.centroid(d), pos ]
        })
        .attr('opacity', 0)

      slice
        .append('text')
        .attr('class', 'label')
        .attr('transform', d => {
          const pos = this.outerArc.centroid(d)
          pos[0] = this.radius * 0.8 * (midAngle(d) < Math.PI ? 1 : -1)
          return `translate(${pos})`
        })
        .attr('dx', d => (midAngle(d)) < Math.PI ? '.3em' : '-.3em')
        .attr('dy', '.3em')
        .attr('fill', '#aaa')
        .attr('text-anchor', d => (midAngle(d)) < Math.PI ? 'start' : 'end')
        .text(d => d.data.category)
        .attr('opacity', 0)
        .append('tspan')
        .attr('fill', '#333')
        .attr('dx', '.3em')
        .text(d => Number(d.data.value).toLocaleString('en'))
        
        
      d3.selectAll('.label')
        .transition()
        .ease(d3.easeLinear)
        .duration(300)
        .delay(500)
        .attr('opacity', 1)

      d3.selectAll('polyline')
        .transition()
        .ease(d3.easeLinear)
        .duration(300)
        .delay(500)
        .attr('opacity', 0.3)
    }
  }
}
</script>
<style lang="scss" scoped>
.chart-wrapper {
  text-align: center;
}
</style>