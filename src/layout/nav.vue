<template>
  <nav>
    <div class="sticky">
      <div class="menu">
        <router-link to="about">
          About Me
        </router-link>
        <router-link to="demo">
          Demo Page
        </router-link>
      </div>
    </div>
  </nav>
</template>
<style lang="scss" scoped>
nav {
  display: grid;
  align-items: flex-start;
  padding-top: 1rem;
  background-color: #333;
  color: #fff;
  grid-template-rows: auto auto 1fr;

  .sticky {
    position: sticky;
    top: 0;
  }

  .title {
    padding: 0.5rem;
    font-size: 1.6rem;
    text-align: center;
  }

  .profile {
    display: grid;
    padding: 1rem;
    row-gap: 1rem;

    .photo {
      text-align: center;

      img {
        border-radius: 1rem;
      }
    }

    .content {
      display: grid;
      justify-content: center;
      row-gap: 0.5rem;

      span {
        font-size: 1.3rem;
        text-align: center;
      }
    }
  }

  .menu {
    display: grid;
    justify-content: center;
    padding: 1rem;
    font-family: 'Manrope', sans-serif;
    font-size: 2.4rem;
    row-gap: 1rem;

    a {
      color: #fff;
      text-align: center;
      text-decoration: none;

      &:hover {
        color: #00adee;
      }
    }
  }
}
</style>