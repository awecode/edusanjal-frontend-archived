<template>
    <div>
        <no-ssr>
            <GMap :lat="obj.latitude" :lng="obj.longitude"/>
        </no-ssr>
    </div>
</template>

<script>
  import Verified from '@/components/Verified.vue'
  import GMap from '@/components/Map.vue'
  import Bricks from 'bricks.js'
  import NoSsr from "../../.nuxt/components/no-ssr";

  if (process.browser && window) {
    window.BigPicture = require('bigpicture')
  }

  export default {
    remote: true,
    components: {
      NoSsr,
      Verified, GMap
    },
    collection: 'institutes',
    key: 'slug',
    validate({params}) {
      return /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/.test(params.id)
    },
    async fetch({store, params}) {

      if (!params[this.key] || params[this.key] === 'null') {
        return;
      }
      if (!store.state.collection[this.collection].objects[params[this.key]]) {
        await store.dispatch('collection/get_item', [this.collection, params[this.key]]);
      } else {
        this.remote = false;
      }
    },
    computed: {
      obj() {
        return this.$store.state.collection[this.$options.collection].objects[this.$route.params[this.$options.key]];
      },
      levels() {
        let dct = {};
        this.obj.programs.forEach(function (program) {
          dct[program.level] = dct[program.level] || [];
          dct[program.level].push(program)
        });
        return dct;
      }
    },
    data() {
      return {
        activeTab: 'programs'
      }
    },
    methods: {
      activateTab(tab) {
        let el = document.getElementById(tab);
        // find if hash is a tab
        if (el.classList.contains('tab-content')) {
          this.activeTab = tab;
        }
        smoothScroll(el);
        window.location.hash = tab;
      }
    },
    async mounted() {
      if (this.$options.remote) {
        await this.$store.dispatch('collection/update_item_from_ssr', [this.$options.collection, this.$route.params[this.$options.key]]);
      } else {
        await this.$store.dispatch('collection/get_item', [this.$options.collection, this.$route.params[this.$options.key]]);
      }

      if (this.$route.hash) {
        this.activateTab(this.$route.hash.replace('#', ''));
      }

      // Computation of brick size by screen size
      // padding(left+right) = 20px; gutter=10px; width_per_column = 300px
      // formula: 20 + width_per_column * no_of_columns + (no_of_columns - 1) *gutter
      // i.e. 20 + 300n + 10(n-1)
      // i.e. 310n + 10
      const sizes = [
        {columns: 1, gutter: 10}, // assumed to be mobile, because of the missing mq property
        {columns: 2, gutter: 10, mq: '630px'},
        {columns: 3, gutter: 10, mq: '940px'},
        {columns: 4, gutter: 5, mq: '1250px'},
        {columns: 5, gutter: 10, mq: '1560px'},
        {columns: 6, gutter: 10, mq: '1870px'},
        {columns: 7, gutter: 10, mq: '2180px'},
        {columns: 8, gutter: 10, mq: '2490px'},
      ];


//      // Lightbox
//      let imageLinks = document.querySelectorAll('#gallery .grid img');
//      for (let i = 0; i < imageLinks.length; i++) {
//        imageLinks[i].addEventListener('click', function (e) {
//          e.preventDefault();
//          BigPicture({
//            el: e.target,
//            gallery: '#gallery .grid'
//          })
//        })
//      }
//
//      // Lazyload images, instantiate Bricks after lazyload complete      
//      let counter = 0;
//      let lazyload = new LazyLoad({
//          callback_set: function (a) {
//            if (a.hasAttribute('data-src')) {
//              counter++;
//            }
//            if (counter === imageLinks.length) {
//              // TODO find a way without setTimeout              
//              setTimeout(function () {
//                Bricks({
//                  container: '.gallery .grid',
//                  packed: 'packed',
//                  sizes: sizes,
//                }).resize(true).pack();
//              }, 99);
//            }
//          }
//        }
//      );

    },
  }
</script>


<style lang="scss">
    @import '~assets/scss/variables';

    section.header {
        display: flex;
        min-height: 300px;
        flex-direction: column;
        justify-content: flex-end;
        color: #fff;
        background-position: center !important;

        .footer {
            background: rgba($primary, .6);
            padding: .5rem;
        }

        h1 {
            font-weight: bold;
            display: inline;
            text-transform: uppercase;
        }

        strong {
            padding-right: 2rem;
        }

    }

    .institute-tabs {
        text-transform: uppercase;
        border-bottom: 1px solid #ccc;
        line-height: 2rem;
        font-size: .9rem;
        margin-bottom: 0 !important;
    }

    .gallery {
        .bg-primary {
            padding: 10px;
        }
        .grid {
            margin: 0 auto;
        }
        img[caption] {
            cursor: pointer;
        }
    }

    @media (max-width: 769px) {
        section.header {
            background: transparent !important;
            flex-direction: inherit;
            min-height: inherit;
            .footer {
                background: transparent;
                color: $primary;
            }
            .container {
                width: auto;
                margin-right: 1rem;
            }

            .logo-container {
                display: flex;
                align-items: center;
            }
            /* Move boards to left */
            /*.boards{*/
            /*position: absolute;*/
            /*left: 1rem;*/
            /*line-height: 2rem;*/
            /*}*/
            /*margin-bottom: 1rem;*/
        }
    }

    @media (max-width: 1024px) {
        section.header {
            h1 {
                font-size: 2rem
            }
        }
    }

</style>