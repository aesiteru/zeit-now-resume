<template>
  <nav>
    <div class="sticky">
      <div class="title">
        Web Developer
      </div>
      <div class="profile">
        <div class="photo">
          <img
            src="../assets/my.png"
            alt="my"
          >
        </div>
        <div class="content">
          <span>이 형진(34)</span>
          <span>LEE HYOUNG JIN</span>
          <span>aesiteru@gmail.com</span>
          <span>010-9998-8731</span>
        </div>
        <div class="menu">
          <router-link to="about">
            About
          </router-link>
          <router-link to="demo">
            Demo
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
<style lang="scss" scoped>
nav {
  display: grid;
  align-items: flex-start;
  padding-top: 1rem;
  background-color: #fff;
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
    font-size: 1.6rem;
    row-gap: 1rem;

    a {
      color: #333;
      text-decoration: none;

      &:hover {
        color: #00adee;
      }
    }
  }
}
</style>