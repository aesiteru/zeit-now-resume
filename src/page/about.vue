<template>
  <div id="about">
    <div class="title">
      Web Developer
    </div>
    <div class="about-wrapper">
      <div class="container container-intro">
        <div class="profile">
          <div class="photo">
            <img
              src="../assets/my.png"
              alt="my"
            >
          </div>
          <div class="content content-profile">
            <div><span>이 형 진</span></div>
            <div><i class="fas fa-envelope" /><span>aesiteru@gmail.com</span></div>
            <div><i class="fas fa-phone" /><span>010-9998-8731</span></div>
            <div>
              <i class="fab fa-github" /><a
                href="https://github.com/aesiteru"
                target="_blank"
              >https://github.com/aesiteru</a>
            </div>
            <div>
              <i class="fas fa-home" /><a
                href="https://zeit-now-resume.aesiteru.now.sh"
                target="_blank"
              >https://zeit-now-resume.aesiteru.now.sh</a>
            </div>
          </div>
        </div>
      </div>
      <div class="container container-experience">
        <h2>EXPERIENCE</h2>
        <div class="content">
          <div class="post-details">
            <post-component :dataset="career.md2" />
            <post-component :dataset="career.tco" />
          </div>
        </div>
      </div>
      <div class="container container-skills">
        <h2>SKILLS</h2>
        <section>
          <div class="content content-language">
            <ul>
              <li style="color: #2885de;">
                Language - Javascript (ECMA, Node, Vanilla)
              </li>
              <li>bundler - webpack 3.x, parcel</li>
              <li>login &amp; authorization - jsonwebtoken</li>
              <li>logic - lodash, moment</li>
              <li>board - multer, sharp, text editor(quill, tip-tap), file-saver</li>
              <li>web storage - localforage</li>
              <li>svg chart - amchart, d3</li>
              <li>exporting service - puppeteer, exceljs, csv-parser, xlsx-stream-reader</li>
            </ul>
          </div>
          <div class="content">
            <ul>
              <li style="color: #2885de;">
                Tools
              </li>
              <li>Source Control - github</li>
              <li>Editor - vscode</li>
              <li>Client - Vue</li>
              <li>Server - IIS, MSSQL</li>
              <li>Markup/Style - emmet, SCSS</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    postComponent: () => import('../components/post'),
  },
  data () {
    return {
      career: {
        md2: {
          title   : 'MD2 Project Management System (BP For Direct Consulting)',
          duration: '2018. 12 - 현재',
          works   : {
            front: [
              'Client Framework 구조 설계 및 적용',
              'JS 라이브러리의 테스팅 및 적용',
              '비즈니스 서비스 기능 제안 및 적용'
            ],
            back: [
              'Database 구조 설계 및 적용',
              'Restful API 서비스 구조 설계 및 적용',
              'Data PreProcessing 작업'
            ]
          }
        },
        tco: {
          title   : 'TCO Project Management System (Exxon+Chevron For Direct Consulting)',
          duration: '2017. 01 - 2020. 03',
          works   : {
            front: [
              'Classic ASP -> Jquery -> Vue 2.x 마이그레이션',
              'JS 라이브러리의 테스팅 및 적용',
              '비즈니스 서비스 기능 제안 및 적용'
            ],
            back: [
              'Data PreProcessing 작업',
              'Database 구축'
            ]
          }
        }
      },
    }
  }
}
</script>
<style lang="scss" scoped>
#about {
  position: relative;
  overflow: auto;
  padding: 3rem;

  .title {
    position: fixed;
    z-index: 1;
    top: 8rem;
    max-width: 80rem;
    color: #ccc;
    font-family: 'Manrope', sans-serif;
    font-size: 18rem;
    font-weight: 600;
    line-height: 1em;
    opacity: 0.2;
    pointer-events: none;
  }

  .about-wrapper {
    display: grid;
    row-gap: 1.5rem;

    * {
      z-index: 2;
    }
  }

  h1 {
    font-size: 2.4rem;
  }

  h2 {
    font-size: 1.6rem;
  }

  .container-intro {
    display: grid;
    grid-auto-flow: column;

    .profile {
      display: grid;
      column-gap: 3rem;
      grid-auto-flow: column;
      grid-template-columns: auto 1fr;

      .content-profile {
        display: grid;
        font-size: 1.4rem;
        row-gap: 0.3rem;

        > div {
          display: grid;
          justify-content: flex-start;
          column-gap: 0.3rem;
          grid-auto-flow: column;

          &:not(:first-child) {
            i {
              align-self: center;
              font-size: 1rem;
            }

            span,
            a {
              align-self: center;
              color: #666;
              text-decoration: none;
            }
          }
        }
      }

      .photo {
        text-align: right;
      }
    }
  }

  .container {
    h2 {
      padding: 1rem 0;
      border-bottom: 1px solid #bbb;
    }

    .content {
      ul {
        display: grid;
        row-gap: 0.5rem;

        li {
          list-style: disc;
        }
      }
    }
  }

  .container-experience {
    display: grid;

    .content {
      display: grid;
      gap: 1rem;
      grid-template-columns: auto;
      grid-template-rows: auto;
    }
  }

  .container-skills {
    section {
      display: grid;
      padding: 1rem;
      color: #666;
      grid-auto-flow: column;
    }

    .content ul li {
      font-size: 1.2rem;
      line-height: 1.6em;
      list-style: none;
    }

    .content-language {
      li:not(:nth-child(1)) {
        padding-left: 0.5rem;
      }
    }
  }
}
</style>