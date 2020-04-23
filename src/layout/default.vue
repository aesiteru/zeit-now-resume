<template>
  <div class="layout-default">
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
    <main id="router">
      <transition
        name="fade"
        mode="out-in"
      >
        <router-view />
      </transition>
    </main>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang="scss">
.layout-default {
  display: grid;
  overflow: auto;
  height: 100vh;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  column-gap: 1rem;
  grid-auto-flow: column;
  grid-auto-rows: 1fr;
  grid-template-columns: 25rem 1150px;

  nav {
    display: grid;
    align-items: flex-start;
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

  #router {
    display: grid;
    background-color: #f3f3f3;
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