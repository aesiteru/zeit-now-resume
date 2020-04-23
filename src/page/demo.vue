<template>
  <div id="demo">
    <div class="dashboard">
      <header>
        <div class="logo">
          LOGO
        </div>
        <div class="demo-description">
          현재 데이터의 상태를 요약하여 DASHBOARD 형태로 보여줍니다.
        </div>
      </header>
      <aside>
        <div class="filter">
          <div
            v-for="(d,i) in categories"
            :key="'category-'+i"
            class="category"
            :class="{'active': category === d}"
            @click.stop.prevent="changeCategory(d)"
          >
            {{ d }}
          </div>
        </div>
      </aside>
      <main>
        <div class="title">
          Data Title
          <div class="source">
            Data Source Date
          </div>
        </div>
        <div class="chart-area chart-complex">
          <chart-complex
            v-if="complexData.length > 0"
            :dataset="complexData"
          />
        </div>
        <section class="summary">
          <div class="item chart-donuts">
            <div
              v-for="(d, k, i) in summary"
              :key="'summary-'+i"
              class="chart-donut"
            >
              <chart-donut
                :dataset="{ total: valuesTotal, value: d }"
                :title="k"
              />
            </div>
          </div>
          <div class="item chart-guage">
            <chart-guage :dataset="{ total: valuesTotal, value: valueSum }" />
          </div>
          <div class="item chart-pie">
            <chart-pie
              :dataset="pieData"
              :color-set="category ? 'schemePastel2': 'schemeSet2'"
            />
          </div>
        </section>
        <section
          ref="grid"
          class="data-grid"
        >
          <data-grid
            v-if="!loading"
            :dataset="filtered"
            :width="gridWidth"
            :height="gridHeight"
          />
        </section>
      </main>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  components: {
    chartComplex: () => import('../components/chart/complex'),
    chartDonut  : () => import('../components/chart/donut'),
    chartGuage  : () => import('../components/chart/guage'),
    chartPie    : () => import('../components/chart/pie'),
    dataGrid    : () => import('../components/grid')
  },
  data () {
    return {
      loading   : true,
      category  : null,
      gridWidth : 0,
      gridHeight: 0
    }
  },
  computed: {
    ...mapGetters({
      dataset   : 'demo/dataset',
      categories: 'demo/category'
    }),
    filtered () {
      const dataset = this.category
        ? this.dataset.filter(v => v['category'] === this.category)
        : this.dataset
      return dataset
    },
    summary () {
      return this.filtered.reduce((acc, cur) => {
        acc['Total'] = (acc['Total'] || 0) + cur['total'] || 0
        acc['Complete'] = (acc['Complete'] || 0) + cur['value1'] || 0
        acc['Open'] = (acc['Open'] || 0) + cur['value2'] || 0
        return acc
      }, {})
    },
    valuesTotal () { return this.filtered.map(d => d['total']).reduce((a, b) => a + b, 0) },
    valueSum () { return this.filtered.map(d => d['value1']).reduce((a, b) => a + b, 0) },
    pieData () {
      return this.filtered.reduce((acc, cur) => {
        const _cat = this.category ? cur['sub_cat'] : cur['category']
        acc[_cat] = ( acc[_cat] || 0 ) + cur['value2'] || 0
        return acc
      }, {})
    },
    complexData () {
      const dataset = this.filtered
      const duration = this.setDuration(dataset)
      const total = this.filtered.map(d => d['total']).reduce((a, b) => a + b, 0)
      const acc = (date) =>
        dataset
          .filter(v => v['date'] <= date)
          .map(d => d['value1'])
          .reduce((a, b) => a + b, 0)

      const output = duration
        .map(d => {
          const value = {
            date      : d,
            value1    : dataset.filter(v => v['date'] === d).map(v => v['value1']).reduce((a, b) => a + b, 0),
            value2    : dataset.filter(v => v['date'] === d).map(v => v['value2']).reduce((a, b) => a + b, 0),
            acc_value2: 0
          }

          value['acc_value2'] = total - acc(d)
          return value
        })
        
      return output
    }
  },
  mounted () {
    const box = this.$refs.grid.getBoundingClientRect()
    this.gridWidth = box.width
    this.gridHeight = box.height
    this.loading = false
  },
  methods: {
    changeCategory(cat) {
      if(cat === this.category) {
        this.category = null
        return
      }
      this.category = cat
    },
    setDuration (dataset) {
      const _cat = dataset.filter(d => d['date']).map(d => new Date(d['date']))
      const minDate = Math.min.apply(null, _cat)
      const maxDate = Math.max.apply(null, _cat)
      const startDate = moment(minDate)
      const endDate = moment(maxDate)
      const diff = moment(endDate).diff(startDate, 'days')
      const dates = []
      for (let i = 0; i <= diff; i++) {
        const du = moment(startDate).add(i, 'days').format('YYYY-MM-DD')
        dates.push(du)
      }
      return dates
    }
  }
}
</script>
<style lang="scss" scoped>
#demo {
  display: grid;
  padding: 5rem 3rem;

  .dashboard {
    display: grid;
    background-color: #fff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    grid-template-areas:
      "header header"
      "aside main";
    grid-template-columns: 10rem 1fr;
    grid-template-rows: 5rem 1fr;

    header {
      display: grid;
      align-items: center;
      padding: 0.5rem;
      background: #000;
      color: #fff;
      font-size: 1.8rem;
      grid-area: header;
      grid-auto-flow: column;
      grid-template-columns: 10rem 1fr;

      .logo {
        align-self: center;
        justify-self: center;
      }

      .demo-description {
        font-size: 1.2rem;
      }
    }

    aside {
      padding: 1rem;
      background: linear-gradient(to bottom, #000 0%, #0470dc 100%);
      color: #fff;
      grid-area: aside;

      .filter {
        display: grid;
        padding: 0 3px;
        padding-bottom: 5px;
        background-color: #1a1e23;
        border-radius: 5px;
        box-shadow: inset 1px 1px 3px 0 #000;
        row-gap: 0.5rem;

        .category {
          padding: 0.5rem;
          font-size: 1.3rem;
          text-align: center;
          transition: all 0.3s linear;

          &:hover {
            cursor: pointer;
          }

          &:hover,
          &.active {
            border-radius: 3px;
            box-shadow: inset 0 0 4px 0 #b6d0cb;
            color: #00adee;
          }
        }
      }
    }

    main {
      display: grid;
      padding: 1rem;
      grid-area: main;
      grid-row-gap: 0.5rem;
      grid-template-rows: 3rem 26rem 35rem minmax(35rem, 1fr);

      .summary {
        display: grid;
        column-gap: 0.5rem;
        gap: 0.5rem;
        grid-auto-flow: column;
        grid-template-areas:
          "donuts pie"
          "guage pie";
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 14rem 1fr;

        .chart-donuts {
          display: grid;
          column-gap: 0.5rem;
          grid-area: donuts;
          grid-auto-flow: column;
          grid-template-columns: 1fr 1fr 1fr;
        }

        .chart-guage {
          grid-area: guage;
        }

        .chart-pie {
          grid-area: pie;
        }
      }
    }
  }
}
</style>