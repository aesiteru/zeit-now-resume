<template>
  <div class="layout-default">
    <navigation />
    <main id="router">
      <div class="router-wrapper">
        <transition
          name="fade"
          mode="out-in"
        >
          <router-view />
        </transition>
      </div>
    </main>
  </div>
</template>
<script>
export default {
  components: {
    navigation: () => import('./nav')
  },
  methods: {
  }
}
</script>
<style lang="scss">
.layout-default {
  display: grid;
  overflow: hidden;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  column-gap: 1rem;
  grid-auto-flow: column;
  grid-auto-rows: 1fr;
  grid-template-columns: 20rem 1fr;

  #router {
    display: grid;
    overflow: auto;
    background-color: #f3f3f3;

    .router-wrapper {
      display: grid;
      max-width: 100rem;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  overflow: hidden;
  transition-duration: 0.3s;
  transition-property: height, opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>