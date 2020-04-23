<template>
  <div
    ref="grid"
    class="table-wrapper"
  >
    <div
      class="scroll-container"
      :style="{
        width: width + 'px',
        height: height + 'px',
        overflow: 'auto',
        willChange: 'top, scroll-position'
      }"
      @scroll.passive="onScroll"
    >
      <div
        class="scroll-wrapper"
        :style="{
          height: totalContentHeight + 'px',
          willChange: 'top',
          position: 'relative'
        }"
      >
        <table
          :style="{
            position: 'absolute',
            top: (offsetY) + 'px'
          }"
        >
          <colgroup>
            <col style="width: 50px;">
          </colgroup>
          <thead>
            <tr>
              <th
                v-for="(d,i) in header"
                :key="'header-'+i"
              >
                {{ d }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(d, i) in visibleChildren"
              :key="'row-'+i"
            >
              <td
                v-for="(h, j) in header"
                :key="'row-'+i+'col-'+j"
                :style="{height: rowHeight + 'px'}"
              >
                <table-cell
                  :row="d"
                  :col="h"
                  :is-progress="h==='progress'"
                >
                  {{ d[h] }}
                </table-cell>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    tableCell: () => import('./table-cell'),
  },
  props: {
    dataset: {
      type   : Array,
      default: () => []
    },
    width: {
      type   : Number,
      default: 0
    },
    height: {
      type   : Number,
      default: 0
    }
  },
  data () {
    return {
      loading        : true,
      rowHeight      : 20,
      lastScrollY    : 0,
      showData       : [],
      startIndex     : 0,
      endIndex       : 0,
      blockFactor    : 0.1,
      extendFactor   : 2,
      visibleRowCount: 0,
      visibleChildren: [],
    }
  },
  computed: {
    list () {
      const row = JSON.parse(JSON.stringify(this.dataset))

      return row.map((v, i) => {
        v['no'] = i + 1
        v['progress'] = v['value1'] / v['total'] * 100
        return v
      })
    },
    rowLength () { return this.list.length },
    totalContentHeight () { return this.list.length * this.rowHeight },
    blockSize () { return this.height * this.blockFactor },
    preLoad () { return this.height * this.extendFactor },
    offsetY () { return this.startIndex * this.rowHeight },
    header () {
      return [ 'no', ...Object.keys(this.dataset[0]), 'progress' ]
    }
  },
  watch: {
    dataset() {
      this.onUpdate()
    }
  },
  mounted () {
    this.onUpdate()
  },
  methods: {
    onScroll(e) {
      this.lastScrollY = e.target.scrollTop
      this.onUpdate()
    },
    onUpdate () {
      const scrollTop = this.lastScrollY || 0
      const blockNumber = this.blockSize === 0 ? 0 : Math.floor(scrollTop / this.blockSize)
      const startIndex = Math.floor((Math.max(0, (this.blockSize * blockNumber) - this.preLoad)) / this.rowHeight)
      const endIndex = Math.ceil((Math.min(this.totalContentHeight, ((this.blockSize * blockNumber) + this.blockSize) + this.preLoad)) / this.rowHeight)

      this.startIndex = startIndex
      this.endIndex = endIndex

      this.visibleRowCount = this.endIndex - this.startIndex

      this.visibleChildren = new Array(this.visibleRowCount)
        .fill(null)
        .map((_, index) => this.list[index + this.startIndex])
    },
    setList () {
      
    }
  }
}
</script>
<style lang="scss" scoped>
.table-wrapper {
  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;

    th,
    td {
      overflow: hidden;
      max-width: 30rem;
      padding: 0.3rem 0.5rem;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    th {
      background-color: #f3f3f3;
      color: #333;
      font-weight: normal;
    }

    thead tr:nth-of-type(1) th {
      position: sticky;
      z-index: 5;
      top: 0;
      height: 3rem;
      font-size: 1.2rem;
    }

    tbody tr:hover td {
      background-color: #ecfaff !important;
      cursor: pointer;
    }
  }
}
</style>