import moment from 'moment'
const store = {
  namespaced: true,
  state     : {
    dataset : [],
    category: []
  },
  getters: {
    dataset : state => state.dataset,
    category: state => state.category
  },
  mutations: {
    dataset (state) {
      const category = [ 'A', 'B', 'C', 'D', 'E', 'F' ]
      const sub_cat = [ 'A', 'B', 'C', 'D', 'E', 'F' ]
      const output = []
      const st = moment('2020-04-10')
      const ed = moment('2020-04-24')

      const diff = ed.diff(st, 'days')

      const duration = []

      for(let i = 0; i < diff; i ++) {
        duration[i] = st.add(1, 'days').format('YYYY-MM-DD')
      }
      for(let i = 0; i < 1000; i++) {
        output[i] = {
          category: 'Cat. ' + category[Math.floor(Math.random() * category.length)],
          sub_cat : 'Sub. ' + sub_cat[Math.floor(Math.random() * sub_cat.length)],
          date    : duration[Math.floor(Math.random() * duration.length)],
          total   : Math.floor(Math.random() * 100),
          value1  : Math.floor(Math.random() * 100) + 0,
          value2  : Math.floor(Math.random() * 100) + 0,
        }
        const total = output[i]['total'] = output[i]['total'] === 0 ? 1 : output[i]['total']
        output[i]['value1'] = total < output[i]['value1'] ? 0 : output[i]['value1']

        const value1 = output[i]['value1']
        output[i]['value2'] = total - value1

      }
      state.dataset = output
    },
    category (state) {
      state.category = Array.from(new Set(state.dataset.map(d => d['category'])))
    }
  },
  actions: {
    async SET_DATA ({ commit }) {
      await commit('dataset')
      await commit('category')
    }
  }
}

export default store