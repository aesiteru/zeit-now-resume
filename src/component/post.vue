<template>
  <article class="post">
    <div class="post-progress">
      <div
        class="post-progress-value"
        :class="dataset.status"
      />
    </div>
    <div class="post-title">
      {{ dataset.title }}
    </div>
    <div class="post-detail">
      <div class="post-detail-info">
        <span>기간</span><span>{{ dataset.duration }}</span>
      </div>
    </div>
    <div class="post-works">
      <ul>업무</ul>
      <ul>
        <dl>Front-End</dl>
        <li
          v-for="(d, i) in dataset.works.front"
          :key="'front-'+i"
        >
          {{ d }}
        </li>
      </ul>
      <ul>
        <dl>Back-End</dl>
        <li
          v-for="(d, i) in dataset.works.back"
          :key="'front-'+i"
        >
          {{ d }}
        </li>
      </ul>
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
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  row-gap: 0.5rem;

  .post-progress {
    position: relative;
    height: 0.2rem;
    background-color: #ddd;
    border-radius: 0.3rem;

    .post-progress-value {
      position: absolute;
      width: 100%;
      border-radius: 0.3rem;

      &.complete {
        height: inherit;
        background-color: #4caf50;
        opacity: 0.3;
      }

      &.progress {
        height: inherit;
        background-color: #ffc107;
      }
    }
  }

  > li {
    list-style: none;
  }

  .post-title {
    margin-top: 0.5rem;
    font-size: 1.6rem;
    font-weight: 700;
  }

  .post-detail-info {
    display: grid;
    column-gap: 2rem;
    grid-auto-flow: column;
    grid-template-columns: auto 1fr;
  }

  .post-works {
    display: grid;
    row-gap: 0.5rem;

    dl {
      height: 2.5rem;
      color: #2885de;
      font-size: 1.3rem;
      font-weight: 600;
    }

    > ul:not(:nth-child(1)) {
      padding: 0;
      padding: 0.5rem;
    }

    li {
      padding: 0;
      font-size: 1.3rem;
      line-height: 1.6em;
      list-style: none;
    }
  }
}
</style>