<template>
  <div id="about">
    <h1>About Me</h1>
    <div class="container container-career">
      <h2>경력사항</h2>
      <div class="content">
        <div class="post-company">
          <div><span>사명</span><span>(주)제이지에스</span></div>
          <div><span>연봉</span><span>4,320만원</span></div>
          <div><span>직책</span><span>대리/개발팀장</span></div>
        </div>
        <div class="post-details">
          <post-component :dataset="career.md2" />
          <post-component :dataset="career.tco" />
        </div>
      </div>
    </div>
    <div class="container container-cover-letter">
      <h2>자기소개서</h2>
      <div class="content">
        <cover-letter />
      </div>
    </div>
    <div class="container container-dev-tool">
      <h2>개발도구</h2>
      <div class="content">
        <ul>
          <li>Language - javascript</li>
          <li>Source Control - github</li>
          <li>Editor - vscode</li>
          <li>Client - Vue 2.x</li>
          <li>Server - IIS, Node, MSSQL</li>
          <li>Markup/Style - emmet, SCSS</li>
        </ul>
      </div>
    </div>
    <div class="container container-libraries">
      <h2>JS 라이브러리</h2>
      <div class="content">
        <ul>
          <li>Bundler - webpack 3.x, parcel</li>
          <li>Login &amp; Authorization - jsonwebtoken</li>
          <li>Logic - lodash, moment</li>
          <li>Board - multer, sharp, text editor(quill, tip-tap), file-saver</li>
          <li>Performance - localforage, vue-worker</li>
          <li>Visualization - amchart, d3</li>
          <li>Exporting - puppeteer, exceljs, csv-parser, xlsx-stream-reader</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    postComponent: () => import('../components/post'),
    coverLetter  : () => import('../components/coverLetter')
  },
  data () {
    return {
      career: {
        md2: {
          title   : 'MD2 Project Management System (BP For Direct Consulting)',
          duration: '2018. 12~',
          works   : {
            front: [
              'Framwork 구조 설계 및 적용',
              'JS 라이브러리의 테스팅 및 적용',
              'UX 디자인 / 비즈니스 서비스 기능 제안 및 적용'
            ],
            back: [
              'Database 구조 설계 및 적용',
              'Restful API 서비스 구조 설계 및 적용',
              '대용량데이터 처리 프로세스 설계 및 적용',
              '비즈니스 데이터 PreProcessing 작업'
            ]
          },
          status: 'progress'
        },
        tco: {
          title   : 'TCO Project Management System (Exxon+Chevron For Direct Consulting)',
          duration: '2017. 1 ~ 2020. 3',
          works   : {
            front: [
              'Classic ASP -> Jquery -> Vue 2.x 마이그레이션',
              'JS 라이브러리의 테스팅 및 적용',
              '크로스브라우징에 관한 이슈 해결 및 최적화',
              'UX 디자인 / 비즈니스 서비스 기능 제안 및 적용'
            ],
            back: [
              '웹과 서버 분리 작업',
              '대용량데이터 처리 프로세스 설계 및 적용',
              '비즈니스 데이터 PreProcessing 작업',
              '대용량데이터 처리 프로세스 설계 및 적용'
            ]
          },
          status: 'complete'
        }
      },
    }
  }
}
</script>
<style lang="scss" scoped>
#about {
  display: grid;
  overflow: auto;
  padding: 1rem;
  font-size: 1.4rem;
  row-gap: 1rem;

  h1 {
    font-size: 2.4rem;
  }

  h2 {
    font-size: 1.6rem;
  }

  .container {
    h2 {
      padding: 1rem 0;
    }

    .content {
      padding: 1rem;

      ul {
        display: grid;
        padding-left: 1rem;
        row-gap: 0.5rem;

        li {
          list-style: disc;
        }
      }
    }

    .post-company {
      display: grid;
      row-gap: 0.5rem;

      div {
        display: grid;
        column-gap: 3rem;
        grid-auto-flow: column;
        grid-template-columns: 3rem 1fr;
      }
    }

    .post-details {
      display: grid;
      row-gap: 1rem;
    }
  }

  .container-career {
    display: grid;

    .content {
      display: grid;
      gap: 1rem;
      grid-template-columns: auto;
      grid-template-rows: auto;

      pre {
        font-family: 'Lato', sans-serif;
      }
    }
  }

  .container-dev-tool,
  .container-libraries {
    padding: 1rem;

    .content {
      background-color: #fff;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    }

    .content ul li {
      line-height: 1.6em;
      list-style: none;
    }
  }
}
</style>