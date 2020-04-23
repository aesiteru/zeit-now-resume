<template>
  <div
    v-if="isProgress"
    class="progress-wrapper"
  >
    <div class="progress-bar">
      <div
        class="progress-value"
        :class="{'progress-complete': value === 100}"
        :style="{width: setProgress(value) + '%'}"
      />
    </div>
    <div
      class="progress-number"
      :class="{'zero-value': value === 0}"
    >
      {{ (setProgress(value) || 0) + '%' }}
    </div>
  </div>
  <span
    v-else
    :class="{'zero-value': value === 0}"
  >
    {{ value }}
  </span>
</template>
<script>
export default {
  props: {
    row: {
      type   : Object,
      default: () => {}
    },
    col: {
      type   : String,
      default: () => {}
    },
    isProgress: {
      type   : Boolean,
      default: false
    }
  },
  computed: {
    value () { return this.row[this.col] }
  },
  methods: {
    setProgress (v) {
      return parseFloat(v).toFixed(0)
    }
  }
}
</script>
<style lang="scss" scoped>
span {
  display: flex;
  align-items: center;
  justify-content: center;

  &.zero-value {
    color: #ccc;
  }
}

.progress-wrapper {
  display: grid;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  grid-auto-flow: column;
  grid-column-gap: 0.2rem;
  grid-template-columns: 60% 1fr;

  .progress-bar {
    position: relative;
    width: 100%;
    height: 1rem;
    background: #eee;
    border-radius: 0.4rem;
    box-shadow: inset 0 -1px 4px rgba(255, 255, 255, 0.3);
  }

  .progress-value {
    position: absolute;
    top: 0;
    left: 0;
    height: 1rem;
    border: 1px solid #eee;
    background-color: mix(#fdd835, #fff, 80%);
    border-bottom-left-radius: 0.3rem;
    border-top-left-radius: 0.3rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset;

    &.progress-complete {
      background-color: mix(#acd145, #fff, 80%);
      border-radius: 0.3rem;
    }
  }

  .progress-number {
    font-size: 1rem;
    line-height: 1rem;
    text-align: right;

    &.zero-value {
      color: #ccc;
    }
  }
}
</style>