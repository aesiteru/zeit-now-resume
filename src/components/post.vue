<template>
  <article class="post">
    <div class="post-detail">
      <div class="post-duration">
        <span>{{ dataset.duration }}</span>
      </div>
      <div class="post-works">
        <div class="post-title">
          {{ dataset.title }}
        </div>
        <ul>
          <dl>Front-End</dl>
          <li
            v-for="(d, i) in dataset.works.front"
            :key="'front-'+i"
            class="work-front"
          >
            {{ d }}
          </li>
        </ul>
        <ul>
          <dl>Back-End</dl>
          <li
            v-for="(d, i) in dataset.works.back"
            :key="'back-'+i"
            class="work-back"
          >
            {{ d }}
          </li>
        </ul>
      </div>
    </div>
  </article>
</template>
<script>
export default {
  props: {
    dataset: {
      type   : Object,
      default: () => { }
    }
  }
}
</script>
<style lang="scss" scoped>
.post {
  display: grid;
  min-width: 30rem;
  padding: 1rem 0;
  row-gap: 0.5rem;

  > li {
    list-style: none;
  }

  .post-title {
    font-size: 1.4rem;
  }

  .post-detail {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 20rem 1fr;
  }

  .post-duration {
    padding-left: 1rem;
    color: #888;
    font-size: 1.4rem;
  }

  .post-works {
    display: grid;
    row-gap: 0.5rem;

    dl {
      color: #2885de;
      font-size: 1.2rem;
      line-height: 1.8em;
    }

    li {
      color: #666;
      font-size: 1.2rem;
      line-height: 1.8em;
      list-style: none;
    }
  }
}
</style>