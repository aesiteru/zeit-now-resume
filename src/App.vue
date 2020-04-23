<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
}
</script>
<style lang="scss">
html {
  min-height: 100vh;
  font-family: 'Lato', sans-serif;
  font-size: 62.5%;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  background: #fff;
}

#app {
  display: grid;
  height: 100vh;
  padding: 5rem;
  background-color: #ccc;
}

</style>
