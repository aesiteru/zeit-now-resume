<template>
  <div class="chart-wrapper">
    <svg
      width="850"
      height="250"
    >
      <g :transform="`translate(0, ${margin.top})`">
        <g
          class="grid"
          :transform="`translate(${margin.left}, 0)`"
        >
          <line
            v-for="(g,i) in grid"
            :key="'grid-'+i"
            :x1="0"
            :x2="chartWidth"
            :y1="x2(g)"
            :y2="x2(g)"
            fill="none"
            stroke="#efefef"
            stroke-width="1"
          />
        </g>
        <g
          v-for="(d, i) in dataset"
          :key="'cutoff-'+i"
          class="bars"
          :transform="`translate(${x0(d[axis.category])}, 0)`"
        >
          <column
            v-for="(cat, j) in columns"
            :key="'cutoff-'+i+j"
            class="bar"
            :cat="cat"
            :dataset="d"
          />
        </g>
        <line-with-point
          v-for="(cat, j) in lines"
          :key="'line-'+j"
          :cat="cat"
          :dataset="dataset"
        />
        <axis-bottom :dataset="axisBottom" />
        <g
          ref="segments"
          class="segments"
        />
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
export default {
  components: {
    column: {
      props: {
        dataset: Object,
        cat    : Object
      },
      data () {
        return {
          tweenVal: {
            x: null,
            y: null
          }
        }
      },
      methods: {
        updateRect () {
          const scaleY = this.$parent.y1
          const height = this.$parent.chartHeight
          const value = this.dataset[this.cat['name']]

          const rect = d3.select(this.$el).select('rect')

          const tweenBar = data => {
            return function () {
              const st = scaleY(0)
              const ed = scaleY(data)
              const inter = d3.interpolate(st, ed)
              return function (t) {
                const v = inter(t)
                return value > 0 ? height - v : 0
              }
            }
          }

          rect
            .attr('y', scaleY(0))
            .attr('height', 0)
            .interrupt()
            .transition()
            .ease(d3.easeLinear)
            .duration(500)
            .attr('y', scaleY(value))
            .attrTween('height', tweenBar(value))

          const text = d3.select(this.$el).select('text')
          text
            .attr('y', scaleY(0))
            .interrupt()
            .transition()
            .ease(d3.easeLinear)
            .duration(500)
            .attrTween('y', function () {
              const i = d3.interpolate(0, value)
              return t => scaleY(i(t))
            })
        }
      },
      watch: { dataset () { this.updateRect() } },
      created () {
        this.tweenVal.x = this.$parent.x1(this.cat['name'])
        this.tweenVal.y = this.$parent.y1(this.dataset[this.cat['name']])
      },
      mounted () {
        this.updateRect()
      },
      updated () {
        this.updateRect()
      },
      render: function (createElement) {
        const data = this.dataset
        const { fill, name } = this.cat
        const height = this.$parent.chartHeight
        const bandwidth = this.$parent.x1.bandwidth()
        const value = data[name]

        const rect = createElement('rect', {
          class: 'rect-' + name,
          attrs: {
            fill  : d3.rgb(fill),
            x     : this.tweenVal.x,
            y     : this.tweenVal.y,
            width : bandwidth,
            height: value > 0 ? height - this.tweenVal.y : 0
          }
        })

        const text = createElement('text', {
          style: {
            textAnchor: 'middle',
            fontSize  : '0.9em'
          },
          attrs: {
            x   : this.tweenVal.x,
            y   : this.tweenVal.y,
            dx  : bandwidth / 2,
            dy  : '-0.35em',
            fill: d3.rgb(fill).darker(1)
          }
        }, value && value > 0 ? Number(value).toLocaleString('en') : 0)

        const groups = [rect]
        if (value > 0) groups.push(text)

        return createElement('g', groups)
      }
    },
    lineWithPoint: {
      props: {
        dataset: Array,
        cat    : Object
      },
      data () {
        return {
          category : this.$parent.axis.category,
          bandwidth: this.$parent.x1.bandwidth()
        }
      },
      methods: {
        updateLine () {
          const updatedPath = d3.select(this.$el)
            .select('path')
            .interrupt()
            .datum(this.dataset)
            .attr('d', this.getLine)

          const updatedPoints = d3.select(this.$el)
            .selectAll('g')
            .interrupt()
            .datum(this.dataset)
            .attr('opacity', 0)

          const pathLength = updatedPath.node().getTotalLength()
          const duration = 500

          const segments = [0]
          const svg = d3.select(this.$parent.$refs.segments)
          for (let i = 1; i < this.dataset.length; i++) {
            const tmp = svg
              .append('path')
              .datum([ this.dataset[i - 1], this.dataset[i] ])
              .attr('d', this.getLine)

            segments.push(segments[i - 1] + tmp.node().getTotalLength())
            tmp.remove()
          }

          updatedPath
            .attr('stroke-dashoffset', pathLength)
            .attr('stroke-dasharray', pathLength)
            .transition()
            .ease(d3.easeLinear)
            .duration(duration)
            .attr('stroke-dashoffset', 0)

          updatedPoints
            .transition()
            .delay((d, i) => segments[i] * duration / pathLength)
            .attr('opacity', 1)
        },
        getLine (dataset) {
          const category = this.category
          const name = this.cat['name']
          const { x0, y0 } = this.$parent
          const bandwidth = x0.bandwidth() / 2
          const x = (d) => x0(d[category]) + bandwidth
          const y = (d) => y0(d[name])
          const path = d3.line().x(x).y(y)

          return path(dataset)
        }
      },
      watch: { dataset () { this.updateLine() } },
      mounted () {
        this.updateLine()
      },
      render: function (createElement) {
        const { fill, name } = this.cat
        const setPath = () => {
          const style = {
            stroke     : d3.rgb(fill),
            strokeWidth: 1
          }
          const attrs = {
            fill: 'none',
            d   : this.getLine(this.dataset)
          }
          return createElement('path', { style, attrs })
        }

        const setPoint = () => {
          const setCircle = () => {
            const style = { stroke: d3.rgb(fill), strokeWidth: 1 }
            const attrs = { r: 2, cx: this.bandwidth + 4, cy: 0, fill: '#fff' }
            return createElement('circle', { style, attrs })
          }

          const setText = (value) => {
            const style = { textAnchor: 'middle' }
            const attrs = { dx: this.bandwidth + 2, dy: '-1em', fill: d3.rgb(fill) }
            const text = value && value > 0 ? Number(value).toLocaleString('en') : 0
            return createElement('text', { style, attrs }, text)
          }

          return this.dataset.map(d => {
            const x = this.$parent.x0(d[this.category])
            const y = this.$parent.y0(d[name])
            const attrs = { transform: `translate(${x},${y})` }
            const circle = setCircle()
            const text = setText(d[name])
            return createElement('g', { attrs }, [ circle, text ])
          })
        }

        const path = setPath()
        const point = setPoint()

        return createElement('g', [ path, point ])
      }
    },
    axisBottom: {
      props: {
        dataset: Array
      },
      render: function (createElement) {
        const width = this.$parent.width
        const height = this.$parent.chartHeight
        const margin = this.$parent.margin
        const dataset = this.dataset
        const x0 = this.$parent.x0
        const bandwidth = x0.bandwidth()
        const tickFormat = (d) => {
          const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
          const fmt = d.split('-')
          return months[Number(fmt[1]) - 1] + '-' + fmt[2]
        }

        const line = createElement('line', {
          style: {
            stroke        : '#aaa',
            strokeWidth   : 1,
            shapeRendering: 'crispEdges'
          },
          attrs: {
            x1: margin.left,
            y1: 1,
            x2: width - margin.right,
            y2: 1
          }
        })

        const weeks = dataset.map(d => {
          return createElement('text', {
            style: {
              textAnchor: 'middle'
            },
            attrs: {
              transform: `translate(${x0(d)},${margin.bottom / 2})`,
              dx       : bandwidth / 2,
              dy       : '0.35em'
            }
          }, tickFormat(d))
        })

        return createElement('g', {
          attrs: {
            class    : 'x week',
            transform: `translate(0, ${height})`
          }
        }, [ line, ...weeks ])
      }
    }
  },
  props: {
    dataset: {
      type   : Array,
      default: () => []
    },
    width: {
      type   : Number,
      default: 850
    },
    height: {
      type   : Number,
      default: 250
    }
  },
  data () {
    return {
      margin: { top: 40, bottom: 25, left: 15, right: 15 },
      grid  : [ 0, 1, 2, 3, 4 ],
      axis  : {
        category: 'date',
        values  : [
          { name: 'acc_value2', shape: 'line', scale: 'y0', fill: '#f44336' },
          { name: 'value1', shape: 'column', scale: 'y1', fill: '#efefef' },
          { name: 'value2', shape: 'column', scale: 'y1', fill: '#badb96' }
        ]
      }
    }
  },
  computed: {
    axisBottom () { return this.dataset.map(d => d['date']) },
    chartWidth () { return this.width - this.margin.left - this.margin.right },
    chartHeight () { return this.height - this.margin.top - this.margin.bottom },
    columns () { return this.axis.values.filter(d => d['shape'] === 'column') },
    lines () { return this.axis.values.filter(d => d['shape'] === 'line') },
    y0 () {
      const key = this.axis.values.find(d => d['scale'] === 'y0')['name']
      const max = Math.max.apply(null, this.dataset.map(d => d[key]))
      const range = [ this.chartHeight / 2, 0 ]
      return d3.scaleLinear()
        .range(range)
        .domain([ 0, max ])
    },
    y1 () {
      const values = this.columns
        .map(d => d['name'])
        .reduce((acc, cur) => [ ...acc, ...this.dataset.map(d => d[cur]) ], [])
      const max = Math.max.apply(null, values)
      const range = [ this.chartHeight, 100 ]
      return d3.scaleLinear()
        .range(range)
        .domain([ 0, max ])
    },
    x0 () {
      return d3.scaleBand()
        .domain(this.axisBottom)
        .range([ this.margin.left, this.width - this.margin.right ])
        .padding(0.2)
    },
    x1 () {
      return d3.scaleBand()
        .domain(this.columns.map(d => d['name']))
        .range([ 0, this.x0.bandwidth() ])
        .padding(0.1)
    },
    x2 () {
      return d3.scaleBand()
        .range([ this.chartHeight, 0 ])
        .domain([ 0, 1, 2, 3, 4 ])
    }
  }
}
</script>
<style lang="scss" scoped>
.chart-wrapper {
  text-align: center;

  svg {
    line,
    path {
      shape-rendering: crispEdges;
    }
  }
}
</style>